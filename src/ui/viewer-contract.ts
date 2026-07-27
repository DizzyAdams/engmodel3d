import type { ModelArtifact } from "../cad/artifact.js";
import type { ExportPlan } from "../cad/export-plan.js";

export interface ViewerSceneState {
  artifactId: string;
  format: ModelArtifact["format"];
  meshState: "idle" | "loading" | "ready" | "error";
  selectedLayer: string;
  cameraMode: "orbit" | "orthographic" | "inspection";
  exportPlan: ExportPlan;
}

export function createViewerSceneState(artifact: ModelArtifact, exportPlan: ExportPlan): ViewerSceneState {
  return {
    artifactId: artifact.id,
    format: artifact.format,
    meshState: "ready",
    selectedLayer: "primary-solid",
    cameraMode: "orbit",
    exportPlan,
  };
}
