import { createId, createTimestamp } from "./id.js";

export type SprintStatus = "planned" | "in_progress" | "blocked" | "done";

export interface SprintObjective {
  title: string;
  outcome: string;
  owner: string;
}

export interface SprintPlan {
  id: string;
  index: number;
  title: string;
  status: SprintStatus;
  owner: string;
  goal: string;
  objectives: SprintObjective[];
  createdAt: string;
  updatedAt: string;
}

export class SprintPlanner {
  private readonly sprints: SprintPlan[] = [];

  createBacklog(): SprintPlan[] {
    if (this.sprints.length > 0) return [...this.sprints];

    const now = createTimestamp();
    const definitions: Array<Omit<SprintPlan, "id" | "createdAt" | "updatedAt">> = [
      {
        index: 1,
        title: "Workspace foundation",
        status: "planned",
        owner: "Platform",
        goal: "Replace static mock data with governed workspace data.",
        objectives: [
          { title: "Workspace store", outcome: "Persist workspace metadata and project membership.", owner: "Backend" },
          { title: "Project linking", outcome: "Attach projects to workspaces and surface lineage.", owner: "Orchestrator" },
        ],
      },
      {
        index: 2,
        title: "Compliance engine",
        status: "planned",
        owner: "Governance",
        goal: "Turn compliance into policy-driven checks per project kind.",
        objectives: [
          { title: "Policy registry", outcome: "Load rules for mechanical, BIM, and product projects.", owner: "Backend" },
          { title: "Evidence output", outcome: "Expose findings and rationale in the UI.", owner: "Frontend" },
        ],
      },
      {
        index: 3,
        title: "Export orchestration",
        status: "planned",
        owner: "CAD",
        goal: "Create a normalized export plan from the generated artifact.",
        objectives: [
          { title: "Target catalog", outcome: "List supported export formats with file contracts.", owner: "CAD" },
          { title: "Plan derivation", outcome: "Compute enabled formats from the artifact context.", owner: "Orchestrator" },
        ],
      },
      {
        index: 4,
        title: "Viewer contract",
        status: "planned",
        owner: "Frontend",
        goal: "Formalize the 3D scene state and loading lifecycle.",
        objectives: [
          { title: "Scene state", outcome: "Define artifact, camera, and layer selection contract.", owner: "Frontend" },
          { title: "Fallback path", outcome: "Keep deterministic preview states when WebGL is unavailable.", owner: "Frontend" },
        ],
      },
      {
        index: 5,
        title: "Audit and versioning",
        status: "planned",
        owner: "Platform",
        goal: "Persist release versions and change rationale for every workspace.",
        objectives: [
          { title: "Version store", outcome: "Append versioned releases per project.", owner: "Backend" },
          { title: "Audit trail", outcome: "Capture compliance and export decisions with timestamps.", owner: "Governance" },
        ],
      },
      {
        index: 6,
        title: "Geometry validation",
        status: "planned",
        owner: "CAD",
        goal: "Strengthen rules for dimensions, tolerances, and export readiness.",
        objectives: [
          { title: "Rule packs", outcome: "Apply project-kind-specific geometry constraints.", owner: "CAD" },
          { title: "Failure taxonomy", outcome: "Classify issues by severity and remediation action.", owner: "QA" },
        ],
      },
      {
        index: 7,
        title: "Workflow automation",
        status: "planned",
        owner: "Orchestrator",
        goal: "Make task routing explicit with stages, blockers, and handoffs.",
        objectives: [
          { title: "Task lifecycle", outcome: "Track queued, running, blocked, done, and failed states.", owner: "Backend" },
          { title: "Human approvals", outcome: "Insert checkpoints before release and export.", owner: "Platform" },
        ],
      },
      {
        index: 8,
        title: "Operational observability",
        status: "planned",
        owner: "Platform",
        goal: "Expose health signals for the enterprise system.",
        objectives: [
          { title: "Telemetry surface", outcome: "Show compliance, export, and task health.", owner: "Frontend" },
          { title: "Operational KPIs", outcome: "Track throughput, errors, and governance coverage.", owner: "Platform" },
        ],
      },
      {
        index: 9,
        title: "Enterprise UX",
        status: "planned",
        owner: "Design",
        goal: "Refine the command-center interface for serious engineering use.",
        objectives: [
          { title: "Workflow density", outcome: "Compress key actions into clearer panels.", owner: "Frontend" },
          { title: "Decision trace", outcome: "Show why a model passed or failed review.", owner: "Design" },
        ],
      },
      {
        index: 10,
        title: "Production hardening",
        status: "planned",
        owner: "Platform",
        goal: "Prepare the codebase for a real deployment path.",
        objectives: [
          { title: "Config hygiene", outcome: "Separate runtime configuration from source code.", owner: "Backend" },
          { title: "Deployment readiness", outcome: "Document and automate build, validation, and release.", owner: "Platform" },
        ],
      },
    ];

    this.sprints.push(
      ...definitions.map((definition) => ({
        id: createId("spr"),
        ...definition,
        createdAt: now,
        updatedAt: now,
      })),
    );

    return [...this.sprints];
  }

  list(): SprintPlan[] {
    return [...this.sprints];
  }
}
