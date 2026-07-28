import type { AgentRole } from "../types/domain.js";

export interface AgentDefinition {
  role: AgentRole;
  name: string;
  description: string;
  capabilities: string[];
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
    role: "cad",
    name: "CAD Agent",
    description: "Produces parametric modeling instructions.",
    capabilities: ["cadquery generation", "openscad generation", "parameter mapping"],
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

