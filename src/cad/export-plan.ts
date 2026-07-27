import type { ExportTarget } from "./artifact.js";
import type { ModelFormat } from "../types/domain.js";
import type { ModelArtifact } from "./artifact.js";

export interface ExportPlanEntry {
  target: ExportTarget;
  enabled: boolean;
  reason: string;
}

export interface ExportPlan {
  artifactId: string;
  entries: ExportPlanEntry[];
}

const targets: Record<ModelFormat, ExportTarget> = {
  cadquery: { format: "cadquery", filename: "model.py", mimeType: "text/x-python" },
  openscad: { format: "openscad", filename: "model.scad", mimeType: "text/plain" },
  ifc: { format: "ifc", filename: "model.ifc", mimeType: "application/octet-stream" },
  glb: { format: "glb", filename: "model.glb", mimeType: "model/gltf-binary" },
  step: { format: "step", filename: "model.step", mimeType: "application/step" },
};

export function getExportTarget(format: ModelFormat): ExportTarget {
  return targets[format];
}

export function listExportTargets(): ExportTarget[] {
  return Object.values(targets);
}

export function buildExportPlan(artifact: ModelArtifact): ExportPlan {
  const entries = listExportTargets().map((target) => {
    const enabled = target.format === artifact.format || target.format !== "cadquery";
    const reason =
      target.format === artifact.format
        ? "Primary delivery format emitted by the current pipeline."
        : "Supported downstream format available in the delivery catalog.";

    return { target, enabled, reason };
  });

  return {
    artifactId: artifact.id,
    entries,
  };
}
