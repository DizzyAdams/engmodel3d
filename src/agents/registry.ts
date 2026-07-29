import type { AgentRole } from "../types/domain.js";

export interface AgentDefinition {
  role: AgentRole;
  name: string;
  description: string;
  capabilities: string[];
  outputs?: string[];
}

export const agentRegistry: AgentDefinition[] = [
  {
    role: "intake",
    name: "Intake Agent",
    description: "Normaliza briefing, intent and constraints.",
    capabilities: ["parse brief", "extract parameters", "categorize project"],
  },
  {
    role: "research",
    name: "Research Agent",
    description: "Finds libraries, standards and geometry references.",
    capabilities: ["open source research", "license checks", "standards lookup"],
  },
  {
    role: "benchmark",
    name: "Benchmark Agent",
    description: "Maps the product against top references and extracts the right deltas.",
    capabilities: ["reference comparison", "feature gap mapping", "competitive pressure tracking"],
  },
  {
    role: "product",
    name: "Product Agent",
    description: "Defines wedge, pricing and user outcome.",
    capabilities: ["mvp scoping", "pricing", "customer workflow"],
  },
  {
    role: "experience",
    name: "Experience Agent",
    description: "Shapes the cockpit experience, hierarchy, and operator flow.",
    capabilities: ["interaction design", "command center UX", "workflow compression"],
  },
  {
    role: "architecture",
    name: "Architecture Agent",
    description: "Plans module boundaries and product flows.",
    capabilities: ["system design", "module decomposition", "workflow planning"],
  },
  {
    role: "site-planning",
    name: "Site Planning Agent",
    description: "Transforms site constraints, setbacks, access, orientation and parking into buildable massing options.",
    capabilities: ["lot analysis", "setback mapping", "parking layout", "solar orientation", "massing envelope"],
    outputs: ["site constraints", "massing options", "access plan"],
  },
  {
    role: "bim",
    name: "BIM Agent",
    description: "Converts construction concepts into IFC-aware building models and metadata packs.",
    capabilities: ["ifc property mapping", "room schedules", "area tables", "level structure", "coordination exports"],
    outputs: ["IFC package", "BIM metadata", "room schedule"],
  },
  {
    role: "interior-design",
    name: "Interior Design Agent",
    description: "Generates interior layouts, furnishing zones, material palettes and sellable room concepts.",
    capabilities: ["space planning", "finish palette", "furniture layout", "room staging", "buyer persona mapping"],
    outputs: ["interior concept", "finish schedule", "staging notes"],
  },
  {
    role: "rendering",
    name: "Rendering Agent",
    description: "Prepares buyer-facing renders, walkthrough shots, thumbnails and tour-ready GLB assets.",
    capabilities: ["camera paths", "thumbnail direction", "lighting notes", "GLB optimization", "tour storyboard"],
    outputs: ["render brief", "tour storyboard", "preview asset checklist"],
  },
  {
    role: "vision",
    name: "Vision Intake Agent",
    description: "Reads PNG/JPEG references, floor plans, facade photos, sketches and moodboards into structured construction constraints.",
    capabilities: ["image understanding", "floor plan extraction", "facade reference parsing", "style detection", "room label extraction"],
    outputs: ["visual brief", "detected constraints", "missing view checklist"],
  },
  {
    role: "video-reconstruction",
    name: "Video Reconstruction Agent",
    description: "Turns walkthrough, drone and construction videos into camera paths, scene clues and reconstruction jobs.",
    capabilities: ["frame sampling", "camera path inference", "room sequence mapping", "exterior massing clues", "tour reconstruction"],
    outputs: ["video scene map", "keyframe set", "reconstruction plan"],
  },
  {
    role: "survey-reconstruction",
    name: "Survey Reconstruction Agent",
    description: "Combines photos, video, plan sketches and lot data into a measured 3D/BIM reconstruction workflow.",
    capabilities: ["photogrammetry planning", "scale recovery", "point cloud handoff", "as-built delta mapping", "survey uncertainty"],
    outputs: ["reconstruction confidence", "measurement gaps", "as-built model plan"],
  },
  {
    role: "real-estate-marketplace",
    name: "Real Estate Marketplace Agent",
    description: "Packages generated projects for builders, brokers, agencies, sales teams and client handoff.",
    capabilities: ["listing copy", "buyer fit", "pricing posture", "lead routing", "broker handoff"],
    outputs: ["property listing", "sales pack", "lead qualification notes"],
  },
  {
    role: "zoning",
    name: "Zoning Agent",
    description: "Checks zoning posture, occupancy assumptions, setbacks, area limits and approval risks.",
    capabilities: ["zoning checklist", "occupancy class", "area ratio checks", "approval risk", "permit packet notes"],
    outputs: ["zoning risk report", "approval checklist", "permit assumptions"],
  },
  {
    role: "cad",
    name: "CAD Agent",
    description: "Produces parametric modeling instructions.",
    capabilities: ["cadquery generation", "openscad generation", "parameter mapping"],
    outputs: ["parametric source", "model metadata", "exportable artifact"],
  },
  {
    role: "cad-validation",
    name: "CAD Validation Agent",
    description: "Verifies generated CAD against kernel, topology and export contracts.",
    capabilities: ["kernel replay", "topology checks", "unit normalization", "format smoke tests"],
    outputs: ["cad validation report", "repair recommendations", "export blockers"],
  },
  {
    role: "marketplace",
    name: "Marketplace Agent",
    description: "Prepares models for global listing, licensing, localization and buyer discovery.",
    capabilities: ["listing taxonomy", "global marketplace packaging", "license posture", "localized metadata"],
    outputs: ["listing brief", "metadata pack", "distribution constraints"],
  },
  {
    role: "validation",
    name: "Validation Agent",
    description: "Checks constraints, formats and export readiness.",
    capabilities: ["schema validation", "geometry validation", "export readiness"],
  },
  {
    role: "simulation",
    name: "Simulation Agent",
    description: "Translates geometry state into engineering checks and scenario deltas.",
    capabilities: ["load cases", "stress estimation", "scenario comparison"],
  },
  {
    role: "quality",
    name: "Quality Agent",
    description: "Owns regression strategy, acceptance gates and release confidence for generated assets.",
    capabilities: ["qa matrix", "visual regression", "geometry regression", "acceptance criteria"],
    outputs: ["qa checklist", "test coverage gaps", "release risk summary"],
  },
  {
    role: "materials",
    name: "Materials Agent",
    description: "Optimizes material choices, tolerances, and process assumptions.",
    capabilities: ["material selection", "tolerance planning", "spec assumptions"],
  },
  {
    role: "manufacturing",
    name: "Manufacturing Agent",
    description: "Keeps the model aligned with fabrication and export constraints.",
    capabilities: ["dfm review", "process fit", "handoff packaging"],
  },
  {
    role: "cost",
    name: "Cost Agent",
    description: "Turns geometry and process changes into commercial deltas.",
    capabilities: ["cost modeling", "scope packaging", "margin framing"],
  },
  {
    role: "compliance",
    name: "Compliance Agent",
    description: "Protects release gates, lineage, and audit posture.",
    capabilities: ["policy checks", "release gating", "audit trail review"],
  },
  {
    role: "orchestrator",
    name: "Orchestrator",
    description: "Coordinates tasks and merges outputs.",
    capabilities: ["queue tasks", "merge results", "route approvals"],
  },
];

export function getAgentDefinition(role: AgentRole): AgentDefinition | undefined {
  return agentRegistry.find((agent) => agent.role === role);
}
