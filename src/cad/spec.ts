import type { ProjectSpec, PrimitiveValue } from "../types/domain.js";
import { createId } from "../core/id.js";
import type { ModelArtifact } from "./artifact.js";

export interface ParametricFeature {
  name: string;
  description: string;
  values: Record<string, PrimitiveValue>;
}

export interface ModelSpec {
  project: ProjectSpec;
  brief: string;
  features: ParametricFeature[];
  constraints: Record<string, PrimitiveValue>;
}

export function buildModelArtifact(spec: ModelSpec): ModelArtifact {
  const featureLines = spec.features.map((feature) => {
    const values = Object.entries(feature.values)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
      .join(", ");
    return `# ${feature.name}: ${feature.description}${values ? ` | ${values}` : ""}`;
  });

  return {
    id: createId("mdl"),
    name: `${spec.project.name} artifact`,
    format: "cadquery",
    source: [
      "# Auto-generated parametric artifact",
      `# Project: ${spec.project.name}`,
      `# Goal: ${spec.project.goal}`,
      `# Brief: ${spec.brief}`,
      ...featureLines,
    ].join("\n"),
    parameters: spec.constraints,
    metadata: {
      projectId: spec.project.id,
      kind: spec.project.kind,
      featureCount: spec.features.length,
    },
  };
}

