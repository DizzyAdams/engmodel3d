import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getDashboardData, getProjectById } from "../server/mock-data.js";
import { SprintPlanner } from "../core/sprint-plan.js";

const outDir = resolve("public");

function page(title: string, body: string): string {
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
    .panel{background:rgba(12,19,34,.82);border:1px solid rgba(159,182,255,.16);border-radius:18px;padding:18px;margin:14px 0}
    .grid{display:grid;gap:12px}
    .cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
    .cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
    .cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
    .card{padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
    .muted{color:#9eafce}
    .row{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
    .nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    .nav a{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
    h1,h2,h3,p{margin:0}
    @media(max-width:900px){.cols-2,.cols-3,.cols-4{grid-template-columns:1fr}.row{flex-direction:column}}
  </style>
</head>
<body><main>${body}</main></body></html>`;
}

function nav() {
  return `<div class="nav"><a href="/">Dashboard</a><a href="/projects/cantilever-bracket/">Project</a><a href="/sprints/">10 Sprints</a></div>`;
}

async function writeRoute(route: string, content: string) {
  const filePath = route === "/" ? resolve(outDir, "index.html") : resolve(outDir, route.slice(1), "index.html");
  await mkdir(resolve(filePath, ".."), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

async function main() {
  const data = getDashboardData();
  const planner = new SprintPlanner();
  const sprints = planner.createBacklog();

  await writeRoute(
    "/",
    page(
      "Model3DEng",
      `<div class="panel"><div class="row"><div><h1>Model3DEng</h1><p class="muted" style="margin-top:10px">AI-assisted engineering cockpit for parametric generation, compliance, export readiness, and governed versioning.</p></div>${nav()}</div></div><div class="grid cols-4">${data.stats.map((s) => `<div class="panel card"><p class="muted">${s.label}</p><h2 style="margin-top:8px">${s.value}</h2></div>`).join("")}</div><div class="panel"><h2>Governance</h2><div class="grid cols-3" style="margin-top:12px">${data.governance.map((g) => `<div class="card"><p class="muted">${g.label}</p><h3 style="margin-top:8px">${g.value}</h3><p class="muted" style="margin-top:8px">${g.detail}</p></div>`).join("")}</div></div><div class="panel"><h2>Export Catalog</h2><div class="grid cols-4" style="margin-top:12px">${data.exports.map((e) => `<div class="card"><p class="muted">${e.format}</p><h3 style="margin-top:8px">${e.filename}</h3><p class="muted" style="margin-top:8px">${e.mimeType}</p></div>`).join("")}</div></div><div class="panel"><h2>10 Sprints</h2><div class="grid cols-2" style="margin-top:12px">${sprints.map((s) => `<div class="card"><p class="muted">Sprint ${s.index} · ${s.owner}</p><h3 style="margin-top:8px">${s.title}</h3><p class="muted" style="margin-top:8px">${s.goal}</p></div>`).join("")}</div></div><div class="panel"><h2>Projects</h2><div class="grid cols-2" style="margin-top:12px">${data.projects.map((p) => `<a class="card" href="/projects/${p.id}/"><p class="muted">${p.category}</p><h3 style="margin-top:8px">${p.name}</h3><p class="muted" style="margin-top:8px">${p.summary}</p></a>`).join("")}</div></div>`,
    ),
  );

  await writeRoute(
    "/projects/cantilever-bracket",
    (() => {
      const project = getProjectById("cantilever-bracket")!;
      return page(
        project.name,
        `<div class="panel"><div class="row"><div><h1>${project.name}</h1><p class="muted" style="margin-top:10px">${project.summary}</p></div>${nav()}</div></div><div class="grid cols-4">${[
          ["Status", project.status],
          ["Export target", project.exportTarget],
          ["Compliance", project.compliance.status],
          ["Version", project.lastRevision],
        ]
          .map(([label, value]) => `<div class="panel card"><p class="muted">${label}</p><h3 style="margin-top:8px">${value}</h3></div>`)
          .join("")}</div><div class="panel"><h2>Compliance findings</h2><div class="grid cols-2" style="margin-top:12px">${project.compliance.findings.map((f) => `<div class="card"><p class="muted">${f.target} · ${f.severity}</p><h3 style="margin-top:8px">${f.code}</h3><p class="muted" style="margin-top:8px">${f.message}</p></div>`).join("")}</div></div><div class="panel"><h2>Governed versions</h2><div class="grid cols-2" style="margin-top:12px">${project.versions.map((v) => `<div class="card"><p class="muted">${v.author} · ${v.createdAt}</p><h3 style="margin-top:8px">${v.label}</h3><p class="muted" style="margin-top:8px">${v.summary}</p></div>`).join("")}</div></div>`,
      );
    })(),
  );

  await writeRoute(
    "/sprints",
    page(
      "10 Sprints",
      `<div class="panel"><div class="row"><div><h1>10 Sprints</h1><p class="muted" style="margin-top:10px">Execution plan for platform hardening, governance, export orchestration, and deployment readiness.</p></div>${nav()}</div></div><div class="grid cols-2">${sprints.map((s) => `<div class="panel"><p class="muted">Sprint ${s.index} · ${s.owner}</p><h2 style="margin-top:8px">${s.title}</h2><p class="muted" style="margin-top:8px">${s.goal}</p><div style="margin-top:12px">${s.objectives.map((o) => `<div class="card" style="margin-top:8px"><strong>${o.title}</strong><p class="muted" style="margin-top:6px">${o.outcome}</p></div>`).join("")}</div></div>`).join("")}</div>`,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
