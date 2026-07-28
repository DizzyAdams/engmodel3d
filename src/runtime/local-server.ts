import { mkdir, readFile, writeFile } from "node:fs/promises";
import http from "node:http";
import { dirname, resolve } from "node:path";
import { URL } from "node:url";
import {
  createBriefSubmission,
  createDefaultBriefForm,
  type BriefFormState,
  type BriefSubmission,
} from "../server/briefing.js";
import { getDashboardData, getProjectById } from "../server/mock-data.js";
import { SprintPlanner } from "../core/sprint-plan.js";
import { Orchestrator } from "../agents/orchestrator.js";
import { agentEventHub } from "./agent-events.js";
import * as site from "./site-renderer.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const runtimeDir = resolve(".runtime");
const briefsFile = resolve(runtimeDir, "brief-submissions.json");
const streamClients = new Set<http.ServerResponse>();
const orchestrator = new Orchestrator();

function writeSse(res: http.ServerResponse, event: unknown) {
  res.write(`data: ${JSON.stringify(event).replace(/</g, "\\u003c")}\n\n`);
}

function openAgentStream(req: http.IncomingMessage, res: http.ServerResponse, projectId?: string) {
  if (streamClients.size >= 32) {
    return writeJson(res, 429, { ok: false, error: "Agent event stream is at capacity." });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.write("retry: 2000\n\n");
  streamClients.add(res);
  for (const event of agentEventHub.recent(projectId)) writeSse(res, event);

  const unsubscribe = agentEventHub.subscribe((event) => {
    if (!projectId || event.projectId === projectId || event.type === "heartbeat") writeSse(res, event);
  });
  const heartbeat = setInterval(() => writeSse(res, agentEventHub.heartbeat()), 15000);
  const close = () => {
    clearInterval(heartbeat);
    unsubscribe();
    streamClients.delete(res);
  };
  req.on("close", close);
  res.on("error", close);
}

function htmlPage(title: string, body: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#07111d;color:#edf3ff}
    a{color:#7cf3ff;text-decoration:none}
    main{max-width:1200px;margin:0 auto;padding:28px 18px 56px}
    .panel{background:rgba(12,19,34,.82);border:1px solid rgba(159,182,255,.16);border-radius:18px;padding:18px;margin:14px 0;box-shadow:0 24px 70px rgba(0,0,0,.32)}
    .grid{display:grid;gap:12px}
    .cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    .cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
    .cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
    .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(124,243,255,.08);border:1px solid rgba(124,243,255,.16);font-size:12px}
    .muted{color:#9eafce}
    .row{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
    .card{padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
    .tiny{font-size:12px;color:#9eafce}
    h1,h2,h3,p,pre{margin:0}
    h1{font-size:42px;line-height:1}
    h2{font-size:26px}
    h3{font-size:18px}
    .nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    .nav a{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
    pre{white-space:pre-wrap;line-height:1.5;color:#d9e6ff}
    @media(max-width:900px){.cols-2,.cols-3,.cols-4{grid-template-columns:1fr}.row{flex-direction:column}}
  </style>
</head>
<body><main>${body}</main></body></html>`;
}

function nav() {
  return `<div class="nav"><a href="/">Dashboard</a><a href="/projects/cantilever-bracket">Project</a><a href="/sprints">10 Sprints</a><a href="/briefs">Saved briefs</a><a href="/api/health">API health</a></div>`;
}

async function ensureBriefStore() {
  await mkdir(runtimeDir, { recursive: true });
}

async function loadBriefs(): Promise<BriefSubmission[]> {
  await ensureBriefStore();
  try {
    const raw = await readFile(briefsFile, "utf8");
    const parsed = JSON.parse(raw) as BriefSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function persistBrief(submission: BriefSubmission) {
  const current = await loadBriefs();
  const next = [submission, ...current].slice(0, 100);
  await writeFile(briefsFile, JSON.stringify(next, null, 2), "utf8");
  return submission;
}

async function readJsonBody(req: http.IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const text = Buffer.concat(chunks).toString("utf8").trim();
  return text ? JSON.parse(text) : {};
}

function writeJson(res: http.ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function renderDashboard() {
  const data = getDashboardData();
  const planner = new SprintPlanner();
  const sprints = planner.createBacklog();

  return htmlPage(
    "Model3DEng",
    `
    <div class="panel">
      <div class="row">
        <div>
          <div class="pill">AI-assisted engineering platform</div>
          <h1 style="margin-top:12px">Model3DEng</h1>
          <p class="muted" style="margin-top:10px;max-width:70ch">Engineering cockpit for parametric generation, compliance, export readiness, governed versioning, and surreal 3D brief capture across construction, BIM, MEP, civil, and manufacturing workflows.</p>
        </div>
        ${nav()}
      </div>
    </div>
    <div class="grid cols-4">
      ${data.stats.map((s) => `<div class="panel card"><div class="tiny">${s.label}</div><h2 style="margin-top:8px">${s.value}</h2></div>`).join("")}
    </div>
    <div class="panel"><h2>Governance</h2><div class="grid cols-3" style="margin-top:12px">${data.governance.map((g) => `<div class="card"><div class="tiny">${g.label}</div><h3 style="margin-top:8px">${g.value}</h3><p class="muted" style="margin-top:8px">${g.detail}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Target sectors</h2><div class="grid cols-3" style="margin-top:12px">${data.sectors.map((s) => `<div class="card"><div class="tiny">${s.buyer}</div><h3 style="margin-top:8px">${s.name}</h3><p class="muted" style="margin-top:8px">${s.win}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Export Catalog</h2><div class="grid cols-4" style="margin-top:12px">${data.exports.map((e) => `<div class="card"><div class="tiny">${e.format}</div><h3 style="margin-top:8px">${e.filename}</h3><p class="muted" style="margin-top:8px">${e.mimeType}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>10 Sprints</h2><div class="grid cols-2" style="margin-top:12px">${sprints.map((s) => `<div class="card"><div class="tiny">Sprint ${s.index} · ${s.owner}</div><h3 style="margin-top:8px">${s.title}</h3><p class="muted" style="margin-top:8px">${s.goal}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Projects</h2><div class="grid cols-2" style="margin-top:12px">${data.projects.map((p) => `<a class="card" href="/projects/${p.id}"><div class="tiny">${p.category}</div><h3 style="margin-top:8px">${p.name}</h3><p class="muted" style="margin-top:8px">${p.summary}</p></a>`).join("")}</div></div>
    `,
  );
}

function renderProject(projectId: string) {
  const project = getProjectById(projectId);
  if (!project) {
    return htmlPage("Project not found", `<div class="panel"><h1>Project not found</h1><p class="muted" style="margin-top:10px">No project data exists for ${projectId}.</p>${nav()}</div>`);
  }

  return htmlPage(
    project.name,
    `
    <div class="panel"><div class="row"><div><div class="pill">${project.category}</div><h1 style="margin-top:12px">${project.name}</h1><p class="muted" style="margin-top:10px">${project.summary}</p></div>${nav()}</div></div>
    <div class="grid cols-4"><div class="panel card"><div class="tiny">Status</div><h3 style="margin-top:8px">${project.status}</h3></div><div class="panel card"><div class="tiny">Export target</div><h3 style="margin-top:8px">${project.exportTarget}</h3></div><div class="panel card"><div class="tiny">Compliance</div><h3 style="margin-top:8px">${project.compliance.status}</h3></div><div class="panel card"><div class="tiny">Version</div><h3 style="margin-top:8px">${project.lastRevision}</h3></div></div>
    <div class="panel"><h2>Export readiness</h2><div class="grid cols-4" style="margin-top:12px">${project.exportReadiness.map((e) => `<div class="card"><div class="tiny">${e.format}</div><h3 style="margin-top:8px">${e.status}</h3><p class="muted" style="margin-top:8px">${e.note}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Compliance findings</h2><div class="grid cols-2" style="margin-top:12px">${project.compliance.findings.map((f) => `<div class="card"><div class="tiny">${f.target} · ${f.severity}</div><h3 style="margin-top:8px">${f.code}</h3><p class="muted" style="margin-top:8px">${f.message}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Governed versions</h2><div class="grid cols-2" style="margin-top:12px">${project.versions.map((v) => `<div class="card"><div class="tiny">${v.author} · ${v.createdAt}</div><h3 style="margin-top:8px">${v.label}</h3><p class="muted" style="margin-top:8px">${v.summary}</p></div>`).join("")}</div></div>
    `,
  );
}

function renderSprints() {
  const planner = new SprintPlanner();
  const sprints = planner.createBacklog();
  return htmlPage("10 Sprints", `<div class="panel"><div class="row"><div><h1>10 Sprints</h1><p class="muted" style="margin-top:10px">Execution plan for platform hardening, governance, export orchestration, and local runtime readiness.</p></div>${nav()}</div></div><div class="grid cols-2">${sprints.map((s) => `<div class="panel"><div class="tiny">Sprint ${s.index} · ${s.owner}</div><h2 style="margin-top:8px">${s.title}</h2><p class="muted" style="margin-top:8px">${s.goal}</p><div style="margin-top:12px">${s.objectives.map((o) => `<div class="card" style="margin-top:8px"><strong>${o.title}</strong><p class="tiny" style="margin-top:6px">${o.outcome}</p></div>`).join("")}</div></div>`).join("")}</div>`);
}

async function renderBriefs() {
  const briefs = await loadBriefs();
  return htmlPage(
    "Saved briefs",
    `<div class="panel"><div class="row"><div><div class="pill">Functional local backend</div><h1 style="margin-top:12px">Saved brief submissions</h1><p class="muted" style="margin-top:10px">Local backend persistence for engineering scopes, package recommendations, and surreal 3D direction prompts.</p></div>${nav()}</div></div>${briefs.length === 0 ? `<div class="panel"><h2>No saved briefs yet</h2><p class="muted" style="margin-top:10px">POST to /api/intake/briefs or use the intake UI to create the first one.</p></div>` : `<div class="grid cols-2">${briefs.map((brief) => `<div class="panel"><div class="tiny">${brief.id} · ${brief.createdAt}</div><h2 style="margin-top:8px">${brief.form.projectName}</h2><p class="muted" style="margin-top:8px">${brief.analysis.recommendedSector} · ${brief.analysis.recommendedPackage}</p><div class="grid cols-2" style="margin-top:12px"><div class="card"><div class="tiny">Readiness</div><h3 style="margin-top:8px">${brief.analysis.readiness}%</h3></div><div class="card"><div class="tiny">Effort</div><h3 style="margin-top:8px">${brief.analysis.effortHours}h</h3></div></div><div class="card" style="margin-top:12px"><div class="tiny">Next step</div><p class="muted" style="margin-top:8px">${brief.analysis.nextStep}</p></div><div class="card" style="margin-top:12px"><div class="tiny">Surreal direction</div><p class="muted" style="margin-top:8px">${brief.analysis.surrealDirection}</p></div><div class="card" style="margin-top:12px"><pre>${brief.preview}</pre></div></div>`).join("")}</div>`}`,
  );
}

async function handleApi(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  const dashboard = getDashboardData();
  const exportTargets = dashboard.exports;

  if (req.method === "GET" && url.pathname === "/api/agents/events") {
    return openAgentStream(req, res, url.searchParams.get("projectId") ?? undefined);
  }

  if (req.method === "GET" && url.pathname === "/api/agents/events/recent") {
    return writeJson(res, 200, { ok: true, events: agentEventHub.recent(url.searchParams.get("projectId") ?? undefined) });
  }

  if (req.method === "GET" && url.pathname === "/api/agents/tasks") {
    return writeJson(res, 200, { ok: true, tasks: orchestrator.getQueue().list() });
  }

  if (req.method === "POST" && url.pathname === "/api/agents/run") {
    const body = await readJsonBody(req);
    const project = body?.project;
    const brief = body?.brief;
    const constraints = body?.constraints;
    if (!project || typeof project.name !== "string" || typeof project.kind !== "string" || typeof project.goal !== "string" || typeof brief !== "string" || !constraints || typeof constraints !== "object") {
      return writeJson(res, 400, { ok: false, error: "Expected project, brief, and constraints for a modeling run." });
    }
    const result = orchestrator.createPlan({ project, brief, constraints });
    return writeJson(res, result.ok ? 201 : 422, result);
  }

  if (req.method === "POST" && url.pathname === "/api/agents/tasks/claim") {
    const task = orchestrator.getQueue().claimNext();
    return writeJson(res, task ? 200 : 204, task ? { ok: true, task } : undefined);
  }

  const taskActionMatch = url.pathname.match(/^\/api\/agents\/tasks\/([^/]+)\/(complete|fail)$/);
  if (req.method === "POST" && taskActionMatch) {
    const [, taskId, action] = taskActionMatch;
    const body = await readJsonBody(req);
    const task = action === "complete"
      ? orchestrator.getQueue().complete(taskId, typeof body?.output === "string" ? body.output : "Completed by operator.")
      : orchestrator.getQueue().fail(taskId, typeof body?.error === "string" ? body.error : "Failed by operator.");
    return writeJson(res, task ? 200 : 404, task ? { ok: true, task } : { ok: false, error: "Task not found." });
  }

  if (req.method === "GET" && url.pathname === "/api/agents/readiness") {
    const tasks = orchestrator.getQueue().list();
    const counts = tasks.reduce<Record<string, number>>((acc, task) => {
      acc[task.status] = (acc[task.status] ?? 0) + 1;
      return acc;
    }, {});
    const failed = counts.failed ?? 0;
    const pending = (counts.queued ?? 0) + (counts.running ?? 0);
    const state = failed > 0 ? "blocked" : pending > 0 ? "in_progress" : tasks.length > 0 ? "ready_for_review" : "awaiting_run";
    return writeJson(res, 200, {
      ok: true,
      state,
      releaseAllowed: state === "ready_for_review",
      counts: { queued: counts.queued ?? 0, running: counts.running ?? 0, done: counts.done ?? 0, failed },
      reason: failed > 0 ? "Resolve failed agent tasks before review." : pending > 0 ? "Wait for all agent tasks to finish." : tasks.length > 0 ? "All agent tasks are complete; human review is required." : "Start a governed 14-agent run.",
    });
  }

  if (req.method === "GET" && url.pathname === "/api/health") {
    return writeJson(res, 200, { ok: true, service: "model3deng-local-backend", time: new Date().toISOString() });
  }

  if (req.method === "GET" && url.pathname === "/api/intake/default") {
    return writeJson(res, 200, { ok: true, form: createDefaultBriefForm(exportTargets), exportTargets });
  }

  if (req.method === "GET" && url.pathname === "/api/intake/export-presets") {
    return writeJson(res, 200, { ok: true, exportTargets, presets: exportTargets.map((target) => ({ format: target.format, filename: target.filename })) });
  }

  if (req.method === "GET" && url.pathname === "/api/intake/briefs") {
    const briefs = await loadBriefs();
    return writeJson(res, 200, { ok: true, count: briefs.length, briefs });
  }

  if (req.method === "POST" && (url.pathname === "/api/intake/analyze" || url.pathname === "/api/intake/briefs" || url.pathname === "/api/intake/proposal")) {
    const body = await readJsonBody(req);
    const form = body?.form as BriefFormState | undefined;

    if (!form || typeof form.projectName !== "string") {
      return writeJson(res, 400, { ok: false, error: "Missing or invalid form payload." });
    }

    const submission = createBriefSubmission(form, exportTargets);

    if (url.pathname === "/api/intake/analyze") {
      return writeJson(res, 200, { ok: true, analysis: submission.analysis, preview: submission.preview });
    }

    if (url.pathname === "/api/intake/proposal") {
      return writeJson(res, 200, { ok: true, proposal: submission.proposal });
    }

    await persistBrief(submission);
    return writeJson(res, 201, { ok: true, submission });
  }

  return writeJson(res, 404, { ok: false, error: `Unknown API route: ${url.pathname}` });
}

async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (url.pathname.startsWith("/api/")) {
    return handleApi(req, res, url);
  }

  const data = getDashboardData();
  const isProjectRoute = url.pathname.startsWith("/projects/");
  const projectId = isProjectRoute ? url.pathname.split("/").filter(Boolean).pop() ?? "" : "";
  const project = projectId ? getProjectById(projectId) : undefined;
  const html =
    url.pathname === "/" ? site.dashboard(data) :
    url.pathname === "/sprints" ? site.sprints(data, new SprintPlanner().createBacklog()) :
    url.pathname === "/briefs" ? site.briefs(await loadBriefs()) :
    url.pathname === "/mission-control" ? site.mission(data) :
    url.pathname === "/solutions" ? site.solutions(data) :
    url.pathname === "/workflow" ? site.workflow(data) :
    url.pathname === "/packages" ? site.packages(data) :
    url.pathname === "/roadmap" ? site.roadmap(data) :
    isProjectRoute
      ? (project ? site.project(project) : site.notFound(url.pathname))
      : site.notFound(url.pathname);

  const known = url.pathname === "/" || ["/sprints","/briefs","/mission-control","/solutions","/workflow","/packages","/roadmap"].includes(url.pathname) || Boolean(project);
  res.writeHead(known ? 200 : 404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

const server = http.createServer((req, res) => {
  void handleRequest(req, res).catch((error) => {
    console.error(error);
    if (!res.headersSent) {
      writeJson(res, 500, { ok: false, error: error instanceof Error ? error.message : "Internal server error" });
    } else {
      res.end();
    }
  });
});

server.listen(port, () => {
  console.log(`Model3DEng local server running at http://localhost:${port}`);
});
