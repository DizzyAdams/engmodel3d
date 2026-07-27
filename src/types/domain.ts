export type ProjectKind =
  | "mechanical"
  | "architecture"
  | "furniture"
  | "product"
  | "fabrication";

export type AgentRole =
  | "intake"
  | "research"
  | "architecture"
  | "cad"
  | "frontend"
  | "validation"
  | "product"
  | "orchestrator";

export type TaskStatus = "queued" | "running" | "blocked" | "done" | "failed";
export type ModelFormat = "cadquery" | "openscad" | "ifc" | "glb" | "step";
export type ProjectStatus = "draft" | "active" | "blocked" | "archived";
export type ComplianceSeverity = "info" | "warning" | "error";
export type PrimitiveValue = string | number | boolean | null;

export interface ProjectSpec {
  id: string;
  name: string;
  kind: ProjectKind;
  goal: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface WorkspaceSpec {
  id: string;
  name: string;
  owner: string;
  projects: string[];
  complianceProfile: string;
  retentionDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDraft {
  name: string;
  kind: ProjectKind;
  goal: string;
  tags?: string[];
}

export interface AgentTaskInput {
  role: AgentRole;
  title: string;
  input: string;
  projectId?: string;
  priority?: number;
}

export interface AgentTask {
  id: string;
  role: AgentRole;
  title: string;
  status: TaskStatus;
  input: string;
  output?: string;
  error?: string;
  projectId?: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationIssue {
  code: string;
  message: string;
  severity: "info" | "warning" | "error";
  path?: string;
}

export interface ValidationReport {
  ok: boolean;
  issues: ValidationIssue[];
  checkedAt?: string;
}

export interface GeneratedModel {
  format: ModelFormat;
  source: string;
  parameters: Record<string, PrimitiveValue>;
  metadata?: Record<string, PrimitiveValue>;
}

export interface ComplianceRule {
  code: string;
  description: string;
  severity: ComplianceSeverity;
  target: ModelFormat | "project" | "brief";
  path?: string;
  validate(value: unknown): boolean;
}

export interface CompliancePolicy {
  id: string;
  name: string;
  description: string;
  rules: ComplianceRule[];
}

export interface ComplianceFinding {
  code: string;
  message: string;
  severity: ComplianceSeverity;
  target: ModelFormat | "project" | "brief";
  path?: string;
}

export interface ComplianceReport {
  policyId: string;
  policyName: string;
  checkedAt: string;
  ok: boolean;
  findings: ComplianceFinding[];
}

export interface ProjectVersion {
  id: string;
  label: string;
  summary: string;
  createdAt: string;
  author: string;
}
