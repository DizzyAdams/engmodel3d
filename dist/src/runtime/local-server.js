import http from "node:http";
import { URL } from "node:url";
import { getDashboardData, getProjectById } from "../server/mock-data.js";
import { SprintPlanner } from "../core/sprint-plan.js";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
function htmlPage(title, body) {
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
    h1,h2,h3,p{margin:0}
    h1{font-size:42px;line-height:1}
    h2{font-size:26px}
    h3{font-size:18px}
    .nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    .nav a{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
    @media(max-width:900px){.cols-2,.cols-3,.cols-4{grid-template-columns:1fr}.row{flex-direction:column}}
  </style>
</head>
<body><main>${body}</main></body></html>`;
}
function renderDashboard() {
    const data = getDashboardData();
    const planner = new SprintPlanner();
    const sprints = planner.createBacklog();
    return htmlPage("Model3DEng", `
    <div class="panel">
      <div class="row">
        <div>
          <div class="pill">AI-assisted engineering platform</div>
          <h1 style="margin-top:12px">Model3DEng</h1>
          <p class="muted" style="margin-top:10px;max-width:70ch">Engineering cockpit for parametric generation, compliance, export readiness, and governed versioning.</p>
        </div>
        <div class="nav">
          <a href="/">Dashboard</a>
          <a href="/projects/cantilever-bracket">Project</a>
          <a href="/sprints">10 Sprints</a>
        </div>
      </div>
    </div>
    <div class="grid cols-4">
      ${data.stats.map((s) => `<div class="panel card"><div class="tiny">${s.label}</div><h2 style="margin-top:8px">${s.value}</h2></div>`).join("")}
    </div>
    <div class="panel"><h2>Governance</h2><div class="grid cols-3" style="margin-top:12px">${data.governance.map((g) => `<div class="card"><div class="tiny">${g.label}</div><h3 style="margin-top:8px">${g.value}</h3><p class="muted" style="margin-top:8px">${g.detail}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Export Catalog</h2><div class="grid cols-4" style="margin-top:12px">${data.exports.map((e) => `<div class="card"><div class="tiny">${e.format}</div><h3 style="margin-top:8px">${e.filename}</h3><p class="muted" style="margin-top:8px">${e.mimeType}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>10 Sprints</h2><div class="grid cols-2" style="margin-top:12px">${sprints.map((s) => `<div class="card"><div class="tiny">Sprint ${s.index} · ${s.owner}</div><h3 style="margin-top:8px">${s.title}</h3><p class="muted" style="margin-top:8px">${s.goal}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Projects</h2><div class="grid cols-2" style="margin-top:12px">${data.projects.map((p) => `<a class="card" href="/projects/${p.id}"><div class="tiny">${p.category}</div><h3 style="margin-top:8px">${p.name}</h3><p class="muted" style="margin-top:8px">${p.summary}</p></a>`).join("")}</div></div>
    `);
}
function renderProject(projectId) {
    const project = getProjectById(projectId);
    if (!project) {
        return htmlPage("Project not found", `<div class="panel"><h1>Project not found</h1><p class="muted" style="margin-top:10px">No project data exists for ${projectId}.</p></div>`);
    }
    return htmlPage(project.name, `
    <div class="panel"><div class="row"><div><div class="pill">${project.category}</div><h1 style="margin-top:12px">${project.name}</h1><p class="muted" style="margin-top:10px">${project.summary}</p></div><div class="nav"><a href="/">Dashboard</a><a href="/projects/${project.id}">Project</a><a href="/sprints">10 Sprints</a></div></div></div>
    <div class="grid cols-4"><div class="panel card"><div class="tiny">Status</div><h3 style="margin-top:8px">${project.status}</h3></div><div class="panel card"><div class="tiny">Export target</div><h3 style="margin-top:8px">${project.exportTarget}</h3></div><div class="panel card"><div class="tiny">Compliance</div><h3 style="margin-top:8px">${project.compliance.status}</h3></div><div class="panel card"><div class="tiny">Version</div><h3 style="margin-top:8px">${project.lastRevision}</h3></div></div>
    <div class="panel"><h2>Export readiness</h2><div class="grid cols-4" style="margin-top:12px">${project.exportReadiness.map((e) => `<div class="card"><div class="tiny">${e.format}</div><h3 style="margin-top:8px">${e.status}</h3><p class="muted" style="margin-top:8px">${e.note}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Compliance findings</h2><div class="grid cols-2" style="margin-top:12px">${project.compliance.findings.map((f) => `<div class="card"><div class="tiny">${f.target} · ${f.severity}</div><h3 style="margin-top:8px">${f.code}</h3><p class="muted" style="margin-top:8px">${f.message}</p></div>`).join("")}</div></div>
    <div class="panel"><h2>Governed versions</h2><div class="grid cols-2" style="margin-top:12px">${project.versions.map((v) => `<div class="card"><div class="tiny">${v.author} · ${v.createdAt}</div><h3 style="margin-top:8px">${v.label}</h3><p class="muted" style="margin-top:8px">${v.summary}</p></div>`).join("")}</div></div>
    `);
}
function renderSprints() {
    const planner = new SprintPlanner();
    const sprints = planner.createBacklog();
    return htmlPage("10 Sprints", `<div class="panel"><h1>10 Sprints</h1><p class="muted" style="margin-top:10px">Execution plan for platform hardening, governance, export orchestration, and local runtime readiness.</p></div><div class="grid cols-2">${sprints.map((s) => `<div class="panel"><div class="tiny">Sprint ${s.index} · ${s.owner}</div><h2 style="margin-top:8px">${s.title}</h2><p class="muted" style="margin-top:8px">${s.goal}</p><div style="margin-top:12px">${s.objectives.map((o) => `<div class="card" style="margin-top:8px"><strong>${o.title}</strong><p class="tiny" style="margin-top:6px">${o.outcome}</p></div>`).join("")}</div></div>`).join("")}</div>`);
}
const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    const html = url.pathname === "/" ? renderDashboard() : url.pathname === "/sprints" ? renderSprints() : url.pathname.startsWith("/projects/") ? renderProject(url.pathname.split("/").pop() ?? "") : htmlPage("Not found", `<div class="panel"><h1>Not found</h1><p class="muted" style="margin-top:10px">${url.pathname}</p></div>`);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
});
server.listen(port, () => {
    console.log(`Model3DEng local server running at http://localhost:${port}`);
});
