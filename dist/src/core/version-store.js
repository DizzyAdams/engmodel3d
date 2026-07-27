import { createId, createTimestamp } from "./id.js";
export class VersionStore {
    versions = new Map();
    add(projectId, input) {
        const version = {
            id: createId("ver"),
            createdAt: createTimestamp(),
            ...input,
        };
        const current = this.versions.get(projectId) ?? [];
        current.unshift(version);
        this.versions.set(projectId, current);
        return version;
    }
    list(projectId) {
        return [...(this.versions.get(projectId) ?? [])];
    }
}
