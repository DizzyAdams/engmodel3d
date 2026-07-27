import type { ProjectDraft, ProjectSpec } from "../types/domain.js";
import { createId, createTimestamp } from "./id.js";

export class ProjectStore {
  private readonly projects = new Map<string, ProjectSpec>();

  create(input: ProjectDraft): ProjectSpec {
    const now = createTimestamp();
    const project: ProjectSpec = {
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

  list(): ProjectSpec[] {
    return [...this.projects.values()];
  }

  get(id: string): ProjectSpec | undefined {
    return this.projects.get(id);
  }

  update(id: string, patch: Partial<Omit<ProjectSpec, "id" | "createdAt">>): ProjectSpec | undefined {
    const current = this.projects.get(id);
    if (!current) return undefined;

    const updated: ProjectSpec = {
      ...current,
      ...patch,
      updatedAt: createTimestamp(),
    };

    this.projects.set(id, updated);
    return updated;
  }
}
