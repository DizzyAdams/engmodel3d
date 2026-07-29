# Model3DEng — Consolidated Audit

Date: 2026-07-29
Scope: 3D viewer/export/catalog wiring, specialized agents/marketplace/intake, UX-UI completeness

## Summary

- TypeScript check passes: `npm run check` is green, but coverage is incomplete because `tsconfig.json` **excludes** `app/**`, so Next.js page/routes are not type-checked.
- Live bugs confirmed from source evidence, not assumptions.

---

## 1) 3D / Viewer / Export / Catalog

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | WebGL viewer wired in project detail | PASS | `src/ui/engineering-model-viewer.tsx` mounts Three.js, OrbitControls, GLTFExporter, STLExporter. Used as `ProjectWorkbench` in `app/projects/[projectId]/page.tsx:408`. |
| 2 | STL download wired | PASS | `downloadStl` in `engineering-model-viewer.tsx` uses `STLExporter` and blob download. |
| 3 | GLB/GLTF download wired | PASS | `downloadGlb` uses `GLTFExporter`. |
| 4 | USDZ/OBJ export from viewer | FAIL | Not present in `engineering-model-viewer.tsx`. Export package mentions these formats only in listing metadata. |
| 5 | STEP export | FAIL | `src/cad/export-package.ts` marks `.step` `pending-kernel` with placeholder text. No real STEP emitter. |
| 6 | Catalog listing data exists | PASS | `src/server/model-catalog.ts` exposes 6 listing IDs and data used by `PremiumCatalog` and `CatalogList`. |
| 7 | Catalog detail page `/catalog/<id>` in static export | FAIL | `src/runtime/export-static.ts` generates `/catalog/index.html` only; it never calls `renderCatalogDetail`. |
| 8 | Catalog detail page in Next.js app router | FAIL | Only `app/catalog/page.tsx` exists. No `app/catalog/[id]/page.tsx`. |
| 9 | `PremiumCatalog` package links work | FAIL | Buttons link to `/projects/${item.id}` with catalog IDs like `casa-contemporanea-listing`, but project IDs in `mock-data.ts` are `casa-contemporanea`, `apartamento-decorado`, etc. |
| 10 | JSX parseability of project detail page | FAIL | `app/projects/[projectId]/page.tsx` contains invalid JSX: `class` instead of `className` and an unterminated `<div class` around the scenario board. This is not caught because `app/**` is excluded from TS checking. |
| 11 | `ExportPlan`/artifact wiring compiles | PASS | `npm run check` is green for `src/`. |
| 12 | Catalog empty state | PARTIAL | Empty state exists in `components/CatalogList.tsx`, but `app/catalog/page.tsx` does not pass the required `filter` prop, so the page is already structurally inconsistent at runtime. |

---

## 2) Agents / Intake / Marketplace / Routes

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Agent registry populated | PASS | `src/agents/registry.ts` defines ~20 roles with capabilities and optional outputs. |
| 2 | Orchestration plan exists | PASS | `src/agents/orchestrator.ts` builds a modeling plan and queue, not just stubs. |
| 3 | UI panels receive agent data | PASS | `AgentSwarmPanel`, `AgentActivityPanel`, and `ReferenceBenchmarkPanel` are composed into pages. |
| 4 | Intake panel components-rich | PASS | `src/ui/brief-intake-panel.tsx` provides fields, media assets, analysis, preview, local fallback download. |
| 5 | Intake backend wired | PARTIAL | `src/server/intake-engine.ts` and `src/server/briefing.ts` implement analysis/preview/proposal. `src/runtime/local-server.ts` serves `/api/intake/briefs`, `/api/intake/analyze`, `/api/intake/proposal`. |
| 6 | Next.js API route for intake | FAIL | No `app/api/intake/briefs/route.ts`. The Next app router route does not exist. |
| 7 | Saved briefs Next.js route/page | FAIL | `app/briefs/page.tsx` is missing, even though the UI/local server render `/briefs`. |
| 8 | Marketplace as a functional flow | PARTIAL | There is a marketplace agent, listing metadata, and `PremiumCatalog`. But no checkout/package purchase flow beyond `tally.so` links. |
| 9 | Saved-briefs persistence in local server | PASS | `local-server.ts` persists to `.runtime/brief-submissions.json` and displays via `site.briefs`. |
| 10 | Broke project detail uses broken project IDs via catalog | FAIL | When users click an Open equivalent from rendered data, lookups use IDs that do not match `getProjectById`. |

---

## 3) UX-UI Completeness

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Dark/surreal theme coverage | PASS | `app/globals.css` defines premium dark tokens, nebula/orb/scanline layers, consistent panel glassmorphism. |
| 2 | Navigation consistency | PASS | `AppShell` provides topbar chips and copy is consistent across pages. |
| 3 | Catalog/project routes consistency | FAIL | `/projects/<id>` uses ID format A; catalog links use ID format B. Also `/catalog/<id>` paths are missing in Next app. |
| 4 | Responsive CSS | PARTIAL | There are media queries in static renderer and preview grids. But `app/` pages rely heavily on classes that live in global CSS without verified mobile breakpoints for all panels. |
| 5 | Empty/error states | PARTIAL | Home and listing-level empties exist. Project detail has a 404 block. Intake has inline fallback. But catalog page has missing empty-state wiring because the page itself is broken by missing prop. |
| 6 | Mobile usability gaps | PARTIAL | Topbar nav chips can wrap. No explicit mobile hamburger/condensed menu was seen. Project detail is dense and may overflow. |
| 7 | Broken JSX/HTML in rendered pages | FAIL | `app/projects/[projectId]/page.tsx` emits invalid JSX. |
| 8 | Accessibility foundations | PASS | Skip link exists; focus-visible outline is enforced globally. |

---

## Recommended Next Actions

1. Unbreak `app/projects/[projectId]/page.tsx`: fix the invalid `class`/unterminated JSX, then run `npm run build` against `app/` paths.
2. Create `app/catalog/[id]/page.tsx` and align catalog listing IDs with project IDs where cross-linking is needed.
3. Wire `/api/intake/*` in Next app router or redirect to local SSR handler.
4. Add `/briefs` page component and wire it into navigation.
5. Decide whether `app/**` should be included in TS validation; right now `npm run check` gives false confidence.
