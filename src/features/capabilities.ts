export const capabilities = [
  "prompt-to-parametric-model",
  "project-versioning",
  "agent-task-orchestration",
  "geometry-validation",
  "web-viewer-integration-ready",
  "export-pipeline-ready",
] as const;

export type Capability = (typeof capabilities)[number];
