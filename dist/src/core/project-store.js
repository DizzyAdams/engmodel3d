import { createId, createTimestamp } from "./id.js";
export class ProjectStore {
    projects = new Map();
    create(input) {
        const now = createTimestamp();
        const project = {
            id: createId("proj"),
            name: input.name,
            kind: input.kind,
            goal: input.goal,
            status: "draft",
            tags: input.tags ?? [],
            createdAt: now,
            updatedAt: now,
        };
        this.projects.set(project.id, project);
        return project;
    }
    list() {
        return [...this.projects.values()];
    }
    get(id) {
        return this.projects.get(id);
    }
    update(id, patch) {
        const current = this.projects.get(id);
        if (!current)
            return undefined;
        const updated = {
            ...current,
            ...patch,
            updatedAt: createTimestamp(),
        };
        this.projects.set(id, updated);
        return updated;
    }
}
