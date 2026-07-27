import { createId, createTimestamp } from "./id.js";
import type { ProjectVersion } from "../types/domain.js";

export class VersionStore {
  private readonly versions = new Map<string, ProjectVersion[]>();

  add(projectId: string, input: Omit<ProjectVersion, "id" | "createdAt">): ProjectVersion {
    const version: ProjectVersion = {
      id: createId("ver"),
      createdAt: createTimestamp(),
      ...input,
    };

    const current = this.versions.get(projectId) ?? [];
    current.unshift(version);
    this.versions.set(projectId, current);
    return version;
  }

  list(projectId: string): ProjectVersion[] {
    return [...(this.versions.get(projectId) ?? [])];
  }
}
