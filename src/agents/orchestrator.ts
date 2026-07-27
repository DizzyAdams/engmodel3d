import type { ProjectDraft, ProjectSpec, GeneratedModel, PrimitiveValue, ValidationReport, AgentRole, ComplianceReport } from "../types/domain.js";
import type { OperationError, ResultEnvelope } from "../types/contracts.js";
import { ProjectStore } from "../core/project-store.js";
import { TaskQueue } from "../core/queue.js";
import { ValidationEngine } from "../core/validation-engine.js";
import { ComplianceEngine } from "../core/compliance-engine.js";
import { VersionStore } from "../core/version-store.js";
import { runCadPipeline } from "../cad/pipeline.js";
import { buildExportPlan } from "../cad/export-plan.js";
import { getAgentDefinition } from "./registry.js";

export interface ModelingRequest {
  project: ProjectDraft;
  brief: string;
  constraints: Record<string, PrimitiveValue>;
}

export interface ModelingPlan {
  project: ProjectSpec;
  summary: string;
  taskIds: string[];
  model: GeneratedModel;
  validation: ValidationReport;
  compliance: ComplianceReport;
  versionId: string;
}

export type OrchestrationResult = ResultEnvelope<ModelingPlan>;

export interface AgentStep {
  role: AgentRole;
  title: string;
}

export class Orchestrator {
  constructor(
    private readonly projects = new ProjectStore(),
    private readonly queue = new TaskQueue(),
    private readonly validator = new ValidationEngine(),
    private readonly compliance = new ComplianceEngine(),
    private readonly versions = new VersionStore(),
  ) {}

  createPlan(request: ModelingRequest): OrchestrationResult {
    const project = this.projects.create(request.project);
    const cadProfile =
      project.kind === "mechanical"
        ? "bracket"
        : project.kind === "architecture"
          ? "enclosure"
          : project.kind === "furniture"
            ? "plate"
            : "plate";

    const cadResult = runCadPipeline({
      project,
      brief: request.brief,
      profile: cadProfile,
      constraints: request.constraints,
    });

    const steps: AgentStep[] = [
      { role: "research", title: "Mapeamento de referencias" },
      { role: "architecture", title: "Definir arquitetura do produto" },
      { role: "cad", title: "Gerar geometria paramétrica" },
      { role: "validation", title: "Validar geometria e exportacao" },
    ];

    const tasks = steps.map((step) =>
      this.queue.enqueue({
        role: step.role,
        title: step.title,
        input: request.brief,
        projectId: project.id,
      }),
    );

    const validation = this.validator.run(
      {
        name: "project-brief",
        subjectType: "brief",
        rules: [
          {
            code: "project-name-required",
            description: "Project name must be provided.",
            validate: (subject) =>
              subject.project.name.trim().length > 0
                ? []
                : [
                    {
                      code: "project-name-missing",
                      message: "Project name is required.",
                      severity: "error",
                      path: "project.name",
                    },
                  ],
          },
          {
            code: "brief-min-length",
            description: "Brief must have enough detail to generate a useful proposal.",
            validate: (subject) =>
              subject.brief.trim().length >= 12
                ? []
                : [
                    {
                      code: "brief-too-short",
                      message: "Brief must contain at least 12 characters.",
                      severity: "error",
                      path: "brief",
                    },
                  ],
          },
        ],
      },
      request,
    );

    const compliance = this.compliance.evaluate(
      {
        id: "enterprise-cad-policy-v1",
        name: "Enterprise CAD Delivery Policy",
        description: "Baseline checks for production-grade model generation and export readiness.",
        rules: [
          {
            code: "brief-length",
            description: "Brief must be actionable for production review.",
            severity: "error",
            target: "brief",
            path: "brief",
            validate: (value) => typeof value === "string" && value.trim().length >= 24,
          },
          {
            code: "cadquery-output",
            description: "Model must be emitted as CadQuery for downstream reproducibility.",
            severity: "error",
            target: "cadquery",
            path: "model.format",
            validate: (value) => Boolean(value),
          },
          {
            code: "export-metadata",
            description: "Model metadata should include project lineage.",
            severity: "warning",
            target: "cadquery",
            path: "model.metadata.projectId",
            validate: (value) =>
              typeof value === "object" &&
              value !== null &&
              "metadata" in value &&
              typeof (value as { metadata?: Record<string, unknown> }).metadata?.projectId === "string",
          },
        ],
      },
      {
        project,
        brief: request.brief,
        model: {
          format: cadResult.artifact.format,
          parameters: cadResult.artifact.parameters,
          metadata: cadResult.artifact.metadata,
        },
      },
    );

    const version = this.versions.add(project.id, {
      label: "v0.1",
      summary: "Initial governed release generated from brief and CAD pipeline.",
      author: "Orchestrator",
    });

    const exportPlan = buildExportPlan(cadResult.artifact);

    return {
      ok: validation.ok && cadResult.validation.ok && compliance.ok,
      data: {
        project,
        summary: `Plano inicial para ${project.name} com foco em ${project.kind}.`,
        taskIds: tasks.map((task) => task.id),
        model: {
          format: cadResult.artifact.format,
          source: cadResult.artifact.source,
          parameters: cadResult.artifact.parameters,
          metadata: cadResult.artifact.metadata,
        },
        validation: {
          ok: validation.ok && cadResult.validation.ok,
          issues: [...validation.issues, ...cadResult.validation.issues],
          checkedAt: cadResult.validation.checkedAt,
        },
        compliance,
        versionId: version.id,
      },
      meta: {
        projectId: project.id,
        agentRoles: tasks.map((task) => task.role),
        agents: tasks.map((task) => getAgentDefinition(task.role)?.name ?? task.role),
        exportTargets: cadResult.exportTargets,
        compliancePolicy: compliance.policyName,
        versionLabel: version.label,
        exportPlan,
      },
    };
  }

  failPlan(taskId: string, error: OperationError): void {
    this.queue.fail(taskId, error.message);
  }

  getQueue(): TaskQueue {
    return this.queue;
  }

  getProjects(): ProjectStore {
    return this.projects;
  }
}
