export const agentRegistry = [
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
        role: "frontend",
        name: "Frontend Agent",
        description: "Designs user-facing 3D workflow surfaces.",
        capabilities: ["viewer shell", "dashboard layout", "interaction design"],
    },
    {
        role: "product",
        name: "Product Agent",
        description: "Defines wedge, pricing and user outcome.",
        capabilities: ["mvp scoping", "pricing", "customer workflow"],
    },
    {
        role: "orchestrator",
        name: "Orchestrator",
        description: "Coordinates tasks and merges outputs.",
        capabilities: ["queue tasks", "merge results", "route approvals"],
    },
];
export function getAgentDefinition(role) {
    return agentRegistry.find((agent) => agent.role === role);
}
