import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getDashboardData, getProjectById } from "../server/mock-data.js";
import { catalogListings } from "../server/model-catalog.js";
import { SprintPlanner } from "../core/sprint-plan.js";
import * as site from "./site-renderer.js";

const outDir = resolve("public");

function page(title: string, body: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} · Model3DEng</title>
  <style>
    body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#07111d;color:#edf3ff}
    a{color:#7cf3ff;text-decoration:none}
    main{max-width:1200px;margin:0 auto;padding:28px 18px 56px}
    .panel{background:rgba(12,19,34,.82);border:1px solid rgba(159,182,255,.16);border-radius:18px;padding:18px;margin:14px 0;box-shadow:0 24px 70px rgba(0,0,0,.32)}
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
  return `<div class="nav"><a href="/">Dashboard</a><a href="/catalog">Model catalog</a><a href="/projects/casa-contemporanea">Project</a><a href="/mission-control">Mission</a><a href="/solutions">Solutions</a><a href="/workflow">Workflow</a><a href="/packages">Packages</a><a href="/roadmap">Roadmap</a><a href="/briefs">Saved briefs</a><a href="/sprints">10 Sprints</a></div>`;
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
  await rm(resolve(outDir, "catalog"), { recursive: true, force: true });

  const routes: Record<string, string> = {
    "/": site.dashboard(data),
    "/projects/casa-contemporanea": site.project(getProjectById("casa-contemporanea")!),
    "/projects/torre-residencial": site.project(getProjectById("torre-residencial")!),
    "/projects/torre-comercial": site.project(getProjectById("torre-comercial")!),
    "/projects/loja-esquina": site.project(getProjectById("loja-esquina")!),
    "/projects/apartamento-decorado": site.project(getProjectById("apartamento-decorado")!),
    "/catalog": site.catalogFromListings(catalogListings),
    "/briefs": site.briefs([]),
    "/sprints": site.sprints(data, sprints),
    "/mission-control": site.mission(data),
    "/solutions": site.solutions(data),
    "/workflow": site.workflow(data),
    "/packages": site.packages(data),
    "/roadmap": site.roadmap(data),
  };
  for (const [route, content] of Object.entries(routes)) await writeRoute(route, content);

  for (const item of catalogListings) {
    await writeRoute(`/catalog/${item.slug}`, site.catalogDetail(item));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
