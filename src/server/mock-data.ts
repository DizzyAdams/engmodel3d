export type ActivityItem = {
  title: string;
  detail: string;
  timestamp: string;
};

export type AgentCard = {
  name: string;
  role: string;
  status: string;
  focus: string;
  progress: string;
  eta: string;
  output: string;
  intensity: string;
};

export type ReferenceBenchmark = {
  name: string;
  category: string;
  adopted: string;
  score: string;
  note: string;
};

export type ExecutionTrack = {
  lane: string;
  title: string;
  owner: string;
  status: string;
  detail: string;
};

export type BuyerSector = {
  name: string;
  buyer: string;
  pain: string;
  win: string;
  formats: string;
};

export type WorkflowStage = {
  stage: string;
  title: string;
  owner: string;
  outcome: string;
  signal: string;
};

export type CommercialPackage = {
  name: string;
  price: string;
  timeline: string;
  fit: string;
  deliverables: string[];
  outcome: string;
};

export type TrustSignal = {
  label: string;
  value: string;
  detail: string;
};

export type CaseStudyCard = {
  name: string;
  impact: string;
  summary: string;
  buyer: string;
};

export type ScenarioCard = {
  name: string;
  delta: string;
  outcome: string;
  status: string;
  detail: string;
};

export type LiveSignal = {
  label: string;
  value: string;
  trend: string;
  detail: string;
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
  liveSignals: LiveSignal[];
  agentSwarm: AgentCard[];
  referenceBenchmarks: ReferenceBenchmark[];
  missionQueue: ExecutionTrack[];
  scenarioBoard: ScenarioCard[];
  versions: Array<{
    id: string;
    label: string;
    summary: string;
    author: string;
    createdAt: string;
  }>;
  activity: ActivityItem[];
};

const dashboardAgentRoster: AgentCard[] = [
  { name: "Orchestrator", role: "Mission control", status: "running", focus: "sequencing the full delivery graph", progress: "96%", eta: "live", output: "14-agent swarm online", intensity: "critical" },
  { name: "Benchmark", role: "Reference diff", status: "running", focus: "Linear, Onshape, Fusion, Stripe patterns", progress: "91%", eta: "4 min", output: "gap matrix", intensity: "high" },
  { name: "Requirements", role: "Brief synthesis", status: "running", focus: "turning intake into structured constraints", progress: "88%", eta: "3 min", output: "spec graph", intensity: "high" },
  { name: "Parametric", role: "Geometry controls", status: "running", focus: "editable dimensions and safe ranges", progress: "82%", eta: "5 min", output: "control envelope", intensity: "high" },
  { name: "Structural", role: "Stress reasoning", status: "running", focus: "safety margin and failure points", progress: "77%", eta: "6 min", output: "load narrative", intensity: "high" },
  { name: "DFM", role: "Manufacturing", status: "running", focus: "clearance, shelling, thickness, tooling", progress: "85%", eta: "4 min", output: "fab checklist", intensity: "high" },
  { name: "Materials", role: "Material strategy", status: "watch", focus: "density, rigidity, procurement swaps", progress: "69%", eta: "8 min", output: "material shortlist", intensity: "medium" },
  { name: "Simulation", role: "Scenario sweeps", status: "running", focus: "variant comparison and what-if loops", progress: "74%", eta: "7 min", output: "scenario board", intensity: "high" },
  { name: "Cost", role: "Commercial guardrail", status: "running", focus: "quote posture and unit economics", progress: "79%", eta: "6 min", output: "cost delta sheet", intensity: "high" },
  { name: "Compliance", role: "Governance", status: "watch", focus: "lineage, approvals, release gates", progress: "92%", eta: "2 min", output: "policy trace", intensity: "medium" },
  { name: "Export", role: "Artifact packaging", status: "running", focus: "STEP, STL, IFC, GLB delivery readiness", progress: "83%", eta: "4 min", output: "export pack", intensity: "high" },
  { name: "QA", role: "Signal verifier", status: "queued", focus: "truth-checking blockers before release", progress: "54%", eta: "next wave", output: "release gate", intensity: "medium" },
  { name: "UX", role: "Command center polish", status: "running", focus: "surreal motion and buyer comprehension", progress: "81%", eta: "5 min", output: "premium cockpit", intensity: "high" },
  { name: "Delivery", role: "Pilot closer", status: "queued", focus: "handoff narrative and next action", progress: "61%", eta: "after QA", output: "pilot close plan", intensity: "medium" },
];

const dashboardReferenceBenchmarks: ReferenceBenchmark[] = [
  { name: "Linear", category: "product ops", adopted: "tight command rhythm + issue clarity", score: "9.6/10", note: "Use its density and decisiveness for agent status." },
  { name: "Onshape", category: "cloud CAD", adopted: "browser-native collaboration posture", score: "9.2/10", note: "Use collaboration framing, not legacy CAD clutter." },
  { name: "Fusion 360", category: "engineering", adopted: "analysis + manufacturing credibility", score: "8.9/10", note: "Borrow engineering seriousness, skip the desktop heaviness." },
  { name: "nTop", category: "simulation", adopted: "parameter-first exploration", score: "9.1/10", note: "Push scenario sweeps and visible rules." },
  { name: "Stripe", category: "dashboards", adopted: "legible operational trust", score: "9.4/10", note: "Use calm hierarchy for commercial confidence." },
  { name: "Vercel", category: "deployment", adopted: "live system health storytelling", score: "8.8/10", note: "Translate deploy-health patterns into export-health patterns." },
];

const dashboardExecutionTracks: ExecutionTrack[] = [
  { lane: "Track 01", title: "Reference ingestion", owner: "Benchmark + UX", status: "running", detail: "Absorb best patterns, compress them into one premium cockpit." },
  { lane: "Track 02", title: "14-agent realtime swarm", owner: "Orchestrator + QA", status: "running", detail: "Expose each specialist, state, queue, output, and release consequence." },
  { lane: "Track 03", title: "Pilot monetization", owner: "Cost + Delivery", status: "watch", detail: "Keep every surface selling a paid, governed engineering pilot." },
];

const buyerSectors: BuyerSector[] = [
  {
    name: "Structural and facade engineering",
    buyer: "Principal engineer / technical director",
    pain: "Too many revision loops between concept geometry, load reasoning, and fabrication handoff.",
    win: "Compress the brief, validation, and export trail into one reviewable command center.",
    formats: "STEP · GLB · review pack",
  },
  {
    name: "BIM and modular construction",
    buyer: "BIM manager / digital delivery lead",
    pain: "IFC handoff and metadata quality break when modules move between teams.",
    win: "Treat geometry, metadata, and release gates as one governed workflow before coordination meetings.",
    formats: "IFC · GLB · issue matrix",
  },
  {
    name: "Industrial equipment and fixtures",
    buyer: "Manufacturing engineer / plant engineering lead",
    pain: "Custom parts and fixtures stall because approvals, tolerances, and cost framing are scattered.",
    win: "Turn part generation into a buyer-ready pilot with tolerance, export, and cost proof visible from day one.",
    formats: "STEP · STL · manufacturing notes",
  },
  {
    name: "MEP coordination and prefabrication",
    buyer: "MEP coordinator / prefabrication manager",
    pain: "Clashes, spool coordination, and field-install constraints appear too late and force rework.",
    win: "Bring routing, metadata, approvals, and install-readiness into one governed review flow before field release.",
    formats: "IFC · GLB · coordination pack",
  },
  {
    name: "Civil and infrastructure packages",
    buyer: "Civil engineer / infrastructure delivery manager",
    pain: "Connection details, staged revisions, and procurement notes are often split across too many tools and review threads.",
    win: "Package geometry, revision deltas, and release gates into one audit-friendly workspace for contractors and consultants.",
    formats: "STEP · IFC · issue matrix",
  },
  {
    name: "Energy, utilities, and plant skids",
    buyer: "Project engineer / EPC package lead",
    pain: "Skid layouts and packaged assemblies drift between engineering, procurement, and fabrication teams.",
    win: "Use one command center for interfaces, export posture, cost framing, and delivery signoff before fabrication starts.",
    formats: "STEP · GLB · release pack",
  },
];

const deliveryWorkflow: WorkflowStage[] = [
  {
    stage: "01",
    title: "Commercial intake and qualification",
    owner: "Solutions + intake agent",
    outcome: "A scoped brief with project type, delivery target, timeline, and budget posture.",
    signal: "Qualified brief ready for discovery",
  },
  {
    stage: "02",
    title: "Constraint synthesis and reference pressure",
    owner: "Research + benchmark swarm",
    outcome: "Translate the buyer request into constraints, reference deltas, and a narrowed execution plan.",
    signal: "Reference-backed execution map",
  },
  {
    stage: "03",
    title: "Parametric generation and engineering validation",
    owner: "CAD + simulation + validation",
    outcome: "Produce a reviewable model with geometry, load reasoning, and visible pass/warn/fail gates.",
    signal: "Governed model ready for review",
  },
  {
    stage: "04",
    title: "Decision review and export handoff",
    owner: "Human reviewer + delivery lane",
    outcome: "Approve the revision, package the export bundle, and preserve the decision trace for the client.",
    signal: "Release package staged for handoff",
  },
];

const commercialPackages: CommercialPackage[] = [
  {
    name: "Pilot Sprint",
    price: "$12k-$18k",
    timeline: "2-3 weeks",
    fit: "Best for one critical part, fixture, or module that needs buyer confidence fast.",
    deliverables: ["Scoped brief", "Validated model", "Export package", "Review recording", "Decision memo"],
    outcome: "Proves the workflow on a real engineering artifact without forcing a large rollout.",
  },
  {
    name: "Engineering Pod",
    price: "$28k-$45k",
    timeline: "4-6 weeks",
    fit: "Best for teams that need a repeatable stream of governed geometry and approvals.",
    deliverables: ["Multi-project cockpit", "Workflow templates", "Portfolio metrics", "Export governance", "Review rituals"],
    outcome: "Turns the platform into a production-shaped operating surface for a real team.",
  },
  {
    name: "Enterprise Rollout",
    price: "$60k+",
    timeline: "Quarter program",
    fit: "Best for organizations standardizing digital delivery across construction and engineering stakeholders.",
    deliverables: ["Role-based workflows", "Compliance profiles", "Governed release model", "Executive reporting", "Portfolio playbook"],
    outcome: "Moves the product from pilot success to an auditable operating system for delivery teams.",
  },
];

const trustSignals: TrustSignal[] = [
  { label: "Human review gates", value: "100%", detail: "Every export still requires a visible signoff before release." },
  { label: "Export readiness coverage", value: "5 formats", detail: "STEP, STL, IFC, GLB, and source-level parametric output are staged." },
  { label: "Audit posture", value: "Revisioned", detail: "Each decision keeps an owner, timestamp, and rationale for the buyer." },
  { label: "Pilot readiness", value: "Commercial", detail: "The product already explains scope, packages, and delivery workflow in buyer language." },
  { label: "Discipline coverage", value: "Multi-sector", detail: "The same governed workflow now addresses mechanical, BIM, MEP, civil, and plant-delivery programs." },
  { label: "Release logic", value: "Draft -> Validation -> Release", detail: "The path to handoff is explicit enough for contractors, consultants, and client-side reviewers." },
];

const caseStudies: CaseStudyCard[] = [
  {
    name: "Cantilever bracket pilot",
    impact: "-11% mass with higher safety margin",
    summary: "Shows how the system narrows geometry, validation, and export into one decision thread.",
    buyer: "Manufacturing engineer",
  },
  {
    name: "Cabinet BIM module",
    impact: "IFC handoff cleaned before coordination review",
    summary: "Demonstrates metadata-aware delivery for modular construction and BIM stakeholders.",
    buyer: "BIM manager",
  },
  {
    name: "Fixture scope package",
    impact: "Faster approval path with visible tolerance logic",
    summary: "Frames the workflow as a commercial pilot rather than a speculative prototype.",
    buyer: "Plant engineering lead",
  },
  {
    name: "MEP riser coordination pack",
    impact: "Coordination issues surfaced before field release",
    summary: "Shows how governed routing, metadata, and review gates reduce coordination churn for prefabrication teams.",
    buyer: "MEP coordinator",
  },
  {
    name: "Bridge connection detail review",
    impact: "Revision cycles compressed into one decision thread",
    summary: "Demonstrates how infrastructure packages can preserve traceability across geometry, comments, and approval state.",
    buyer: "Civil engineering manager",
  },
  {
    name: "Pump skid delivery cockpit",
    impact: "Fabrication handoff clarified before procurement lock",
    summary: "Connects interfaces, export posture, and delivery gates for EPC-style packaged assemblies.",
    buyer: "Project engineer",
  },
];

const cantileverReferenceBenchmarks: ReferenceBenchmark[] = [
  { name: "Onshape", category: "collaboration", adopted: "shared browser review posture", score: "92%", note: "Good target for comments, approvals, and version handoff." },
  { name: "Fusion 360", category: "engineering", adopted: "credible stress/manufacturing framing", score: "89%", note: "Need deeper toolpath and tolerance storytelling." },
  { name: "nTop", category: "parametric exploration", adopted: "scenario-first iteration", score: "86%", note: "Room to add richer branch compare and automated sweeps." },
  { name: "Linear", category: "operating cadence", adopted: "crisp execution + blockers visibility", score: "94%", note: "Use this as the model for swarm state clarity." },
  { name: "Stripe", category: "buyer trust", adopted: "high-signal enterprise hierarchy", score: "90%", note: "Keep commercial confidence without losing engineering depth." },
  { name: "Vercel", category: "system status", adopted: "deployment-grade observability", score: "84%", note: "Translate health checks into export readiness and release signals." },
];

const cabinetReferenceBenchmarks: ReferenceBenchmark[] = [
  { name: "Onshape", category: "coordination", adopted: "multi-stakeholder browser collaboration", score: "90%", note: "Ideal reference for BIM review loops." },
  { name: "Autodesk Construction Cloud", category: "BIM workflow", adopted: "metadata-heavy delivery posture", score: "85%", note: "Need stronger property-set storytelling." },
  { name: "Linear", category: "ops cadence", adopted: "clear issue-state transitions", score: "91%", note: "Useful for review and procurement blockers." },
  { name: "Stripe", category: "trust surface", adopted: "decision-grade hierarchy", score: "88%", note: "Makes enterprise buyers comfortable fast." },
  { name: "nTop", category: "rule systems", adopted: "visible logic over black-box output", score: "82%", note: "Need more surfaced rule relationships." },
  { name: "Vercel", category: "status signals", adopted: "live health readability", score: "80%", note: "Can push better publish/export health metaphors." },
];

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
    liveSignals: [
      { label: "Agent sync", value: "14/14 online", trend: "+2", detail: "All specialist lanes are alive; two are waiting on QA handoff." },
      { label: "Reference parity", value: "89%", trend: "+7%", detail: "Command-center patterns now map closely to premium references." },
      { label: "Export confidence", value: "83%", trend: "+4%", detail: "STEP and GLB are almost release-grade; IFC still needs metadata polish." },
      { label: "Decision speed", value: "11 min", trend: "-3 min", detail: "Time from brief change to reviewed next action is dropping." },
    ],
    agentSwarm: [
      { name: "Orchestrator", role: "mission control", status: "running", focus: "sequencing geometry, QA, export, and commercial proof", progress: "96%", eta: "live", output: "swarm cadence stable", intensity: "critical" },
      { name: "Benchmark", role: "reference diff", status: "running", focus: "Linear, Onshape, Fusion and Stripe patterns", progress: "91%", eta: "4 min", output: "reference matrix", intensity: "high" },
      { name: "Requirements", role: "brief synthesis", status: "running", focus: "turn brief edits into new constraints", progress: "88%", eta: "3 min", output: "constraint pack", intensity: "high" },
      { name: "Parametric", role: "geometry driver", status: "running", focus: "safe ranges for base length, depth, hole spacing", progress: "85%", eta: "5 min", output: "control graph", intensity: "high" },
      { name: "Structural", role: "load reasoning", status: "running", focus: "stress, FOS, and weak regions", progress: "79%", eta: "6 min", output: "stress story", intensity: "high" },
      { name: "DFM", role: "manufacturing", status: "running", focus: "wall thickness, fillet, and tooling logic", progress: "84%", eta: "4 min", output: "fab checklist", intensity: "high" },
      { name: "Materials", role: "material strategy", status: "watch", focus: "aluminum vs steel tradeoff", progress: "70%", eta: "8 min", output: "swap table", intensity: "medium" },
      { name: "Simulation", role: "scenario sweeps", status: "running", focus: "what-if variants for lighter ribs", progress: "75%", eta: "7 min", output: "scenario board", intensity: "high" },
      { name: "Cost", role: "unit economics", status: "running", focus: "mass/cost tension by revision", progress: "80%", eta: "6 min", output: "cost delta", intensity: "high" },
      { name: "Compliance", role: "governance", status: "watch", focus: "lineage and release rules", progress: "92%", eta: "2 min", output: "policy trace", intensity: "medium" },
      { name: "Export", role: "artifact pack", status: "running", focus: "STEP + STL + GLB release posture", progress: "83%", eta: "4 min", output: "delivery package", intensity: "high" },
      { name: "QA", role: "truth verifier", status: "queued", focus: "closing warnings before release", progress: "58%", eta: "next wave", output: "release gate", intensity: "medium" },
      { name: "UX", role: "cockpit polish", status: "running", focus: "make the buyer understand the system instantly", progress: "82%", eta: "5 min", output: "surreal command center", intensity: "high" },
      { name: "Delivery", role: "pilot closer", status: "queued", focus: "handoff narrative and next action", progress: "64%", eta: "after QA", output: "close plan", intensity: "medium" },
    ],
    referenceBenchmarks: cantileverReferenceBenchmarks,
    missionQueue: [
      { lane: "Lane 01", title: "Reference compression", owner: "Benchmark + UX", status: "running", detail: "Extract only the sharpest patterns from premium references and translate them into this cockpit." },
      { lane: "Lane 02", title: "Engineering proof", owner: "Structural + DFM", status: "running", detail: "Keep every visual improvement tied to stress, manufacturability, or export clarity." },
      { lane: "Lane 03", title: "Release gate", owner: "Compliance + QA", status: "watch", detail: "Tolerance warning stays open until the next verification pass turns green." },
      { lane: "Lane 04", title: "Commercial close", owner: "Cost + Delivery", status: "queued", detail: "Wrap the final revision in a buyer-ready pilot recommendation." },
    ],
    scenarioBoard: [
      { name: "Lightweight rib sweep", delta: "-8% mass", outcome: "best current candidate", status: "green", detail: "Maintains stiffness while opening a cleaner price story." },
      { name: "Hole spacing expansion", delta: "+12 mm pitch", outcome: "monitor stress", status: "amber", detail: "More mounting flexibility but pushes the rib root closer to warning territory." },
      { name: "Aluminum variant", delta: "-31% mass", outcome: "procurement review", status: "blue", detail: "Excellent for handling weight; still needs sourcing and cost validation." },
    ],
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
    liveSignals: [
      { label: "Agent sync", value: "12/14 online", trend: "-1", detail: "Two lanes are paused until metadata and finish schedule issues close." },
      { label: "Metadata readiness", value: "81%", trend: "+5%", detail: "Property-set harmonization is moving, but still not release clean." },
      { label: "Buyer confidence", value: "87%", trend: "+3%", detail: "Presentation posture is strong; procurement detail is the gap." },
      { label: "Review latency", value: "19 min", trend: "-4 min", detail: "Cross-functional review is faster once issues are lane-scoped." },
    ],
    agentSwarm: [
      { name: "Orchestrator", role: "mission control", status: "running", focus: "sequence BIM review, metadata cleanup, and delivery", progress: "93%", eta: "live", output: "swarm map", intensity: "critical" },
      { name: "Benchmark", role: "reference diff", status: "running", focus: "Onshape, ACC, Linear, Stripe patterns", progress: "88%", eta: "5 min", output: "benchmark matrix", intensity: "high" },
      { name: "Requirements", role: "brief synthesis", status: "blocked", focus: "finish schedule and procurement details", progress: "62%", eta: "needs input", output: "missing brief fields", intensity: "high" },
      { name: "Parametric", role: "module rules", status: "running", focus: "panel spacing and reusable dimensions", progress: "84%", eta: "6 min", output: "module graph", intensity: "high" },
      { name: "Structural", role: "fit reasoning", status: "watch", focus: "clearance and fit consistency", progress: "73%", eta: "7 min", output: "fit report", intensity: "medium" },
      { name: "DFM", role: "manufacturing", status: "watch", focus: "joinery, tolerances, assembly order", progress: "76%", eta: "8 min", output: "assembly notes", intensity: "medium" },
      { name: "Materials", role: "finish strategy", status: "blocked", focus: "side panel vs face frame mismatch", progress: "58%", eta: "needs QA", output: "finish diff", intensity: "high" },
      { name: "Simulation", role: "scenario sweeps", status: "running", focus: "layout, finish, and module alternatives", progress: "71%", eta: "9 min", output: "variant board", intensity: "high" },
      { name: "Cost", role: "commercial guardrail", status: "running", focus: "reuse ratio versus custom fabrication cost", progress: "79%", eta: "6 min", output: "cost lens", intensity: "high" },
      { name: "Compliance", role: "governance", status: "running", focus: "metadata lineage and issue ownership", progress: "90%", eta: "3 min", output: "policy trace", intensity: "high" },
      { name: "Export", role: "artifact pack", status: "watch", focus: "IFC + GLB readiness", progress: "78%", eta: "7 min", output: "delivery package", intensity: "medium" },
      { name: "QA", role: "truth verifier", status: "queued", focus: "final issue closure and publish gate", progress: "52%", eta: "next wave", output: "review gate", intensity: "medium" },
      { name: "UX", role: "cockpit polish", status: "running", focus: "make BIM complexity legible to a buyer", progress: "80%", eta: "5 min", output: "enterprise clarity", intensity: "high" },
      { name: "Delivery", role: "pilot closer", status: "queued", focus: "handoff summary and next approval", progress: "60%", eta: "after QA", output: "close plan", intensity: "medium" },
    ],
    referenceBenchmarks: cabinetReferenceBenchmarks,
    missionQueue: [
      { lane: "Lane 01", title: "Metadata cleanup", owner: "Compliance + Requirements", status: "blocked", detail: "Need missing finish schedule and procurement inputs to close the last red flag." },
      { lane: "Lane 02", title: "Reusable module polish", owner: "Parametric + UX", status: "running", detail: "Keep the cabinetry system reusable while making the cockpit easier to read." },
      { lane: "Lane 03", title: "IFC publish gate", owner: "Export + QA", status: "watch", detail: "Hold release until property sets and finish mappings are consistent." },
      { lane: "Lane 04", title: "Commercial framing", owner: "Cost + Delivery", status: "queued", detail: "Translate reuse and issue reduction into a paid pilot story." },
    ],
    scenarioBoard: [
      { name: "Finish alignment pass", delta: "0 geometry change", outcome: "fastest unblock", status: "green", detail: "Closes the visual QA issue without disrupting the reusable module structure." },
      { name: "Premium finish option", delta: "+$24 per module", outcome: "buyer upsell", status: "blue", detail: "Raises cost slightly but sharpens the commercial pitch for premium interiors." },
      { name: "IFC metadata hardening", delta: "+1 review cycle", outcome: "enterprise-safe publish", status: "amber", detail: "Worth it if the buyer needs downstream coordination confidence." },
    ],
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
      { name: "3D preview", status: "active", detail: "Procedural WebGL viewer with orbit controls and STL/GLB/JSON downloads." },
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
    swarmMetrics: [
      { label: "Specialists online", value: "14" },
      { label: "Parallel lanes", value: "4" },
      { label: "Reference families", value: "6" },
      { label: "Realtime decisions", value: "23 / day" },
    ],
    agentRoster: dashboardAgentRoster,
    benchmarkReferences: dashboardReferenceBenchmarks,
    executionTracks: dashboardExecutionTracks,
    sectors: buyerSectors,
    workflow: deliveryWorkflow,
    packages: commercialPackages,
    trustSignals,
    caseStudies,
    projects,
  };
}

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}
