import { createId, createTimestamp } from "./id.js";
export class WorkspaceStore {
    workspaces = new Map();
    create(input) {
        const now = createTimestamp();
        const workspace = {
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
    list() {
        return [...this.workspaces.values()];
    }
    get(id) {
        return this.workspaces.get(id);
    }
    attachProject(workspaceId, projectId) {
        const workspace = this.workspaces.get(workspaceId);
        if (!workspace)
            return undefined;
        if (!workspace.projects.includes(projectId)) {
            workspace.projects = [...workspace.projects, projectId];
            workspace.updatedAt = createTimestamp();
        }
        return workspace;
    }
}
