export type ActivityItem = {
  title: string;
  detail: string;
  timestamp: string;
};

export type ProjectRecord = {
  id: string;
  name: string;
  category: string;
  summary: string;
  status: string;
  owner: string;
  exportTarget: string;
  lastRevision: string;
  dimensions: string;
  confidence: string;
  validationState: string;
  generatedBy: string;
  nextAction: string;
  tags: string[];
  engineering: {
    mass: string;
    volume: string;
    stress: string;
    fos: string;
    deflection: string;
    tolerance: string;
    costEstimate: string;
    printTime: string;
  };
  kpis: Array<{ label: string; value: string; delta: string }>;
  calculations: Array<{ label: string; formula: string; result: string }>;
  risks: Array<{ label: string; severity: string; detail: string }>;
  features: Array<{ name: string; status: string; detail: string }>;
  validationChecks: Array<{ name: string; result: string; status: string }>;
  exportReadiness: Array<{
    format: string;
    status: string;
    note: string;
    priority: string;
  }>;
  revisions: Array<{
    version: string;
    change: string;
    impact: string;
    state: string;
  }>;
  comparison: {
    baseline: string;
    current: string;
    deltas: Array<{ label: string; before: string; after: string; change: string }>;
  };
  compliance: {
    policy: string;
    status: string;
    checkedAt: string;
    findings: Array<{ code: string; severity: string; target: string; message: string }>;
  };
  versions: Array<{
    id: string;
    label: string;
    summary: string;
    author: string;
    createdAt: string;
  }>;
  activity: ActivityItem[];
};

const projects: ProjectRecord[] = [
  {
    id: "cantilever-bracket",
    name: "Cantilever Bracket v0.3",
    category: "Mechanical part",
    summary: "A parametric bracket for quick design iteration and manufacturing checks.",
    status: "Validation running",
    owner: "Studio team",
    exportTarget: "STEP + STL",
    lastRevision: "Revision 12",
    dimensions: "220 x 80 x 40 mm",
    confidence: "92%",
    validationState: "2 checks pending",
    generatedBy: "CAD agent v1.8",
    nextAction: "Tune rib spacing",
    tags: ["mechanical", "parametric", "manufacturing"],
    engineering: {
      mass: "1.84 kg",
      volume: "218.6 cm³",
      stress: "186 MPa",
      fos: "2.3",
      deflection: "0.62 mm",
      tolerance: "±0.15 mm",
      costEstimate: "$14.80",
      printTime: "3h 42m",
    },
    kpis: [
      { label: "Safety margin", value: "2.3x", delta: "+0.4 vs prior rev" },
      { label: "Material use", value: "-11.2%", delta: "lighter than baseline" },
      { label: "Constraint pass rate", value: "91%", delta: "3 checks failing" },
    ],
    calculations: [
      { label: "Bending ratio", formula: "M / S = 412 / 2.21", result: "186 MPa" },
      { label: "Deflection estimate", formula: "(F·L^3) / (3·E·I)", result: "0.62 mm" },
      { label: "Cost model", formula: "(material + machine + QA)", result: "$14.80" },
    ],
    risks: [
      { label: "Edge cracking", severity: "medium", detail: "Fillet radius near the minimum threshold." },
      { label: "Print warp", severity: "low", detail: "Geometry is stable but long spans should be monitored." },
    ],
    features: [
      { name: "Shelling", status: "ready", detail: "Wall-thickness aware shell generation." },
      { name: "Rib network", status: "tuned", detail: "Optimized for bending resistance." },
      { name: "Hole pattern", status: "locked", detail: "Fastener spacing and edge clearance validated." },
      { name: "Draft angle", status: "review", detail: "Manufacturing release needs one final pass." },
    ],
    validationChecks: [
      { name: "Self-intersection", result: "clean", status: "pass" },
      { name: "Minimum thickness", result: "1.6 mm", status: "warning" },
      { name: "Clearance", result: "0.25 mm buffer", status: "pass" },
      { name: "Export schema", result: "STEP, STL", status: "pass" },
    ],
    exportReadiness: [
      { format: "STEP", status: "pass", note: "Solid geometry and assembly hierarchy are ready for exchange.", priority: "highest" },
      { format: "STL", status: "pass", note: "Watertight mesh path is stable for additive manufacturing review.", priority: "high" },
      { format: "IFC", status: "warn", note: "Property mapping is ready, but metadata harmonization needs one pass.", priority: "medium" },
      { format: "GLB", status: "pass", note: "Visualization export is ready for client-facing review.", priority: "high" },
    ],
    revisions: [
      {
        version: "v0.3",
        change: "Lighter rib network and adjusted hole spacing.",
        impact: "Reduced mass while preserving stiffness.",
        state: "current",
      },
      {
        version: "v0.2",
        change: "Introduced shelling and initial bracket profile.",
        impact: "Established manufacturing envelope.",
        state: "baseline",
      },
      {
        version: "v0.1",
        change: "Seed geometry from brief and first agent pass.",
        impact: "Proof of concept for validation flow.",
        state: "archived",
      },
    ],
    comparison: {
      baseline: "v0.2",
      current: "v0.3",
      deltas: [
        { label: "Mass", before: "2.07 kg", after: "1.84 kg", change: "-11.1%" },
        { label: "Deflection", before: "0.79 mm", after: "0.62 mm", change: "-21.5%" },
        { label: "FOS", before: "1.9", after: "2.3", change: "+21.1%" },
        { label: "Cost", before: "$16.20", after: "$14.80", change: "-8.6%" },
      ],
    },
    compliance: {
      policy: "Enterprise CAD Delivery Policy",
      status: "Pass with warnings",
      checkedAt: "2026-07-27T11:10:00Z",
      findings: [
        {
          code: "brief-length",
          severity: "warning",
          target: "brief",
          message: "Brief is actionable but could include procurement and tolerance context.",
        },
      ],
    },
    versions: [
      {
        id: "ver-1001",
        label: "v0.1",
        summary: "Seed geometry and initial constraint map.",
        author: "Orchestrator",
        createdAt: "2026-07-27T09:40:00Z",
      },
      {
        id: "ver-1002",
        label: "v0.2",
        summary: "Added shelling, ribs, and clearance verification.",
        author: "CAD Agent",
        createdAt: "2026-07-27T10:20:00Z",
      },
      {
        id: "ver-1003",
        label: "v0.3",
        summary: "Lightweight revision with export readiness review.",
        author: "Validation Agent",
        createdAt: "2026-07-27T11:10:00Z",
      },
    ],
    activity: [
      {
        title: "Geometry pass",
        detail: "Wall thickness and fillet radius are being checked against constraints.",
        timestamp: "2m ago",
      },
      {
        title: "Agent review",
        detail: "CAD agent proposed a lighter rib pattern for the next iteration.",
        timestamp: "8m ago",
      },
      {
        title: "Preview refresh",
        detail: "Model preview updated after parameter changes to hole spacing.",
        timestamp: "15m ago",
      },
    ],
  },
  {
    id: "cabinet-module",
    name: "Cabinet Module A",
    category: "Architecture/BIM",
    summary: "A reusable cabinetry asset prepared for later IFC export and layout checks.",
    status: "Awaiting review",
    owner: "Design ops",
    exportTarget: "IFC + GLB",
    lastRevision: "Revision 05",
    dimensions: "900 x 600 x 720 mm",
    confidence: "88%",
    validationState: "1 issue flagged",
    generatedBy: "BIM agent v2.1",
    nextAction: "Resolve material mismatch",
    tags: ["bim", "reusable", "interiors"],
    engineering: {
      mass: "82.4 kg",
      volume: "0.41 m³",
      stress: "N/A",
      fos: "N/A",
      deflection: "1.8 mm",
      tolerance: "±2 mm",
      costEstimate: "$286",
      printTime: "N/A",
    },
    kpis: [
      { label: "Library reuse", value: "74%", delta: "+9% across projects" },
      { label: "IFC readiness", value: "88%", delta: "schema mostly aligned" },
      { label: "Issue density", value: "1.2 / model", delta: "down from 1.8" },
    ],
    calculations: [
      { label: "Module footprint", formula: "w × d = 0.9 × 0.6", result: "0.54 m²" },
      { label: "Clearance check", formula: "720 - 18 - 18", result: "684 mm usable height" },
      { label: "Reuse ratio", formula: "reused parts / total parts", result: "74%" },
    ],
    risks: [
      { label: "Material mismatch", severity: "high", detail: "Side panel finish diverges from face frame." },
      { label: "BIM metadata", severity: "medium", detail: "Two IFC properties require harmonization." },
    ],
    features: [
      { name: "Panel array", status: "ready", detail: "Configurable spacing across cabinet bays." },
      { name: "Hardware set", status: "ready", detail: "Door hinges, fasteners, and handle family mappings." },
      { name: "IFC schema", status: "in sync", detail: "Core properties mapped to reusable BIM fields." },
      { name: "Assembly joints", status: "review", detail: "Joint tolerances need a final QA pass." },
    ],
    validationChecks: [
      { name: "Schema completeness", result: "96%", status: "pass" },
      { name: "Material conflict", result: "1 flag", status: "warning" },
      { name: "Clearance conflicts", result: "none", status: "pass" },
      { name: "Export readiness", result: "IFC + GLB", status: "pass" },
    ],
    exportReadiness: [
      { format: "IFC", status: "warn", note: "Schema is aligned, but two property sets still require cleanup.", priority: "highest" },
      { format: "GLB", status: "pass", note: "Scene export is ready for layout and presentation.", priority: "high" },
      { format: "STEP", status: "pass", note: "Exchange geometry remains stable for downstream engineering.", priority: "high" },
      { format: "STL", status: "warn", note: "Mesh export should be checked against the final tolerances.", priority: "medium" },
    ],
    revisions: [
      {
        version: "v0.5",
        change: "Aligned cabinet metadata with reusable library rules.",
        impact: "Improved interoperability across assemblies.",
        state: "current",
      },
      {
        version: "v0.4",
        change: "Normalized panel families and hardware mapping.",
        impact: "Reduced coordination issues during detailing.",
        state: "baseline",
      },
      {
        version: "v0.3",
        change: "Initial module assembly and IFC property set.",
        impact: "Created the first exportable BIM structure.",
        state: "archived",
      },
    ],
    comparison: {
      baseline: "v0.4",
      current: "v0.5",
      deltas: [
        { label: "Library reuse", before: "68%", after: "74%", change: "+8.8%" },
        { label: "Issue density", before: "1.8", after: "1.2", change: "-33.3%" },
        { label: "IFC readiness", before: "82%", after: "88%", change: "+7.3%" },
        { label: "Cost", before: "$312", after: "$286", change: "-8.3%" },
      ],
    },
    compliance: {
      policy: "Enterprise CAD Delivery Policy",
      status: "Review required",
      checkedAt: "2026-07-27T11:18:00Z",
      findings: [
        {
          code: "export-metadata",
          severity: "warning",
          target: "cadquery",
          message: "Metadata lineage must be normalized before IFC handoff.",
        },
        {
          code: "brief-length",
          severity: "error",
          target: "brief",
          message: "Brief needs procurement and finish schedule details.",
        },
      ],
    },
    versions: [
      {
        id: "ver-2001",
        label: "v0.3",
        summary: "Initial module assembly and IFC property set.",
        author: "BIM Agent",
        createdAt: "2026-07-27T09:55:00Z",
      },
      {
        id: "ver-2002",
        label: "v0.4",
        summary: "Normalized panel families and hardware mapping.",
        author: "Design Ops",
        createdAt: "2026-07-27T10:35:00Z",
      },
      {
        id: "ver-2003",
        label: "v0.5",
        summary: "Aligned metadata and introduced quality gates.",
        author: "Compliance Agent",
        createdAt: "2026-07-27T11:18:00Z",
      },
    ],
    activity: [
      {
        title: "Schema validation",
        detail: "Project metadata is aligned with the shared product schema.",
        timestamp: "4m ago",
      },
      {
        title: "Visual QA",
        detail: "Agent flagged a material mismatch between the side panel and the face frame.",
        timestamp: "21m ago",
      },
    ],
  },
];

export function getDashboardData() {
  return {
    stats: [
      { label: "Projects in flight", value: "12" },
      { label: "Validated exports", value: "28" },
      { label: "Open agent tasks", value: "7" },
      { label: "Rule checks", value: "146" },
      { label: "Governed releases", value: "19" },
    ],
    kpis: [
      { label: "Active models", value: "12", delta: "+3 this week" },
      { label: "Validation pass rate", value: "93%", delta: "+4.1%" },
      { label: "Estimated engineering hours saved", value: "148h", delta: "across 9 projects" },
      { label: "Export readiness", value: "81%", delta: "STEP/IFC/GLB pipeline" },
    ],
    calculations: [
      { label: "Portfolio utilization", formula: "active projects / capacity", result: "12 / 18 = 66.7%" },
      { label: "Average confidence", formula: "sum(confidence) / project count", result: "90.0%" },
      { label: "Risk weighted backlog", formula: "high×3 + medium×2 + low×1", result: "11 points" },
    ],
    engineeringSnapshot: [
      { label: "Total mass under analysis", value: "84.24 kg" },
      { label: "Open validation issues", value: "3" },
      { label: "Highest stress region", value: "Bracket rib root" },
      { label: "Most requested export", value: "STEP" },
    ],
    governance: [
      {
        label: "Compliance policy",
        value: "Enterprise CAD Delivery Policy",
        detail: "Brief, lineage, and model format are checked before release.",
      },
      {
        label: "Version retention",
        value: "90 days",
        detail: "Every governed release is stamped and retained for audit.",
      },
      {
        label: "Review gates",
        value: "Draft -> Validation -> Release",
        detail: "Each project requires human signoff before export handoff.",
      },
    ],
    exports: [
      { format: "STEP", filename: "model.step", mimeType: "application/step" },
      { format: "STL", filename: "model.stl", mimeType: "model/stl" },
      { format: "IFC", filename: "model.ifc", mimeType: "application/octet-stream" },
      { format: "GLB", filename: "model.glb", mimeType: "model/gltf-binary" },
      { format: "CadQuery", filename: "model.py", mimeType: "text/x-python" },
    ],
    sprints: [
      { index: 1, title: "Workspace foundation", goal: "Replace static mock data with governed workspace data.", owner: "Platform" },
      { index: 2, title: "Compliance engine", goal: "Turn compliance into policy-driven checks per project kind.", owner: "Governance" },
      { index: 3, title: "Export orchestration", goal: "Create a normalized export plan from the generated artifact.", owner: "CAD" },
      { index: 4, title: "Viewer contract", goal: "Formalize the 3D scene state and loading lifecycle.", owner: "Frontend" },
      { index: 5, title: "Audit and versioning", goal: "Persist release versions and change rationale for every workspace.", owner: "Platform" },
      { index: 6, title: "Geometry validation", goal: "Strengthen rules for dimensions, tolerances, and export readiness.", owner: "CAD" },
      { index: 7, title: "Workflow automation", goal: "Make task routing explicit with stages, blockers, and handoffs.", owner: "Orchestrator" },
      { index: 8, title: "Operational observability", goal: "Expose health signals for the enterprise system.", owner: "Platform" },
      { index: 9, title: "Enterprise UX", goal: "Refine the command-center interface for serious engineering use.", owner: "Design" },
      { index: 10, title: "Production hardening", goal: "Prepare the codebase for a real deployment path.", owner: "Platform" },
    ],
    capabilities: [
      { name: "Prompt to parametric model", status: "active", detail: "Text brief becomes structured geometry parameters." },
      { name: "Validation engine", status: "active", detail: "Rules, thresholds, and export checks before release." },
      { name: "Version history", status: "active", detail: "Track revisions, approvals, and delta from baseline." },
      { name: "3D preview", status: "ready", detail: "Preview stage prepared for a future WebGL viewer." },
      { name: "Engineer review", status: "ready", detail: "Human checkpoints before export or procurement." },
      { name: "Compliance policy", status: "active", detail: "Formal checks for brief quality, lineage, and export readiness." },
      { name: "Portfolio analytics", status: "building", detail: "Cost, risk, and throughput across projects." },
    ],
    roadmap: [
      { phase: "0-60 min", title: "Command center", detail: "Polish dashboard, KPIs, project detail, and navigation." },
      { phase: "60-120 min", title: "Engineering cockpit", detail: "Add validation trees, feature matrices, risk views, and scenario compare." },
      { phase: "120-180 min", title: "MVP launch path", detail: "Finalize roadmap, onboarding, export states, and release checklist." },
    ],
    comparisonTheme: [
      { label: "Version diff", value: "Current vs baseline", detail: "Track changes in geometry, cost, and safety." },
      { label: "Review state", value: "3-stage signoff", detail: "Draft, validation, and release checkpoints." },
      { label: "Decision trace", value: "Human + agent", detail: "Every revision has a reason and an owner." },
    ],
    projects,
  };
}

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}
