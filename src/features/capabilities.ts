export const capabilities = [
  "prompt-to-parametric-model",
  "reference-benchmarking",
  "project-versioning",
  "multi-agent-swarm-control",
  "agent-task-orchestration",
  "scenario-simulation",
  "materials-and-cost-tracking",
  "geometry-validation",
  "immersive-workbench-ui",
  "export-pipeline-ready",
] as const;

export type Capability = (typeof capabilities)[number];
