import { createId, createTimestamp } from "./id.js";
import type { WorkspaceSpec } from "../types/domain.js";

export interface WorkspaceDraft {
  name: string;
  owner: string;
  complianceProfile?: string;
  retentionDays?: number;
}

export class WorkspaceStore {
  private readonly workspaces = new Map<string, WorkspaceSpec>();

  create(input: WorkspaceDraft): WorkspaceSpec {
    const now = createTimestamp();
    const workspace: WorkspaceSpec = {
      id: createId("wsp"),
      name: input.name,
      owner: input.owner,
      projects: [],
      complianceProfile: input.complianceProfile ?? "enterprise-cad-v1",
      retentionDays: input.retentionDays ?? 90,
      createdAt: now,
      updatedAt: now,
    };

    this.workspaces.set(workspace.id, workspace);
    return workspace;
  }

  list(): WorkspaceSpec[] {
    return [...this.workspaces.values()];
  }

  get(id: string): WorkspaceSpec | undefined {
    return this.workspaces.get(id);
  }

  attachProject(workspaceId: string, projectId: string): WorkspaceSpec | undefined {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return undefined;

    if (!workspace.projects.includes(projectId)) {
      workspace.projects = [...workspace.projects, projectId];
      workspace.updatedAt = createTimestamp();
    }

    return workspace;
  }
}
