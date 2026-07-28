import { createId, createTimestamp } from "./id.js";
import type { AgentTask, AgentTaskInput, TaskStatus } from "../types/domain.js";
import { agentEventHub } from "../runtime/agent-events.js";

export class TaskQueue {
  private readonly tasks = new Map<string, AgentTask>();
  private readonly order: string[] = [];

  enqueue(item: AgentTaskInput): AgentTask {
    const now = createTimestamp();
    const task: AgentTask = {
      id: createId("task"),
      role: item.role,
      title: item.title,
      input: item.input,
      status: "queued",
      projectId: item.projectId,
      priority: item.priority ?? 0,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(task.id, task);
    this.order.push(task.id);
    agentEventHub.publishTask("task.queued", task);
    return task;
  }

  update(taskId: string, status: TaskStatus, output?: string): AgentTask | undefined {
    const task = this.tasks.get(taskId);
    if (!task) return undefined;

    task.status = status;
    task.updatedAt = createTimestamp();
    if (output !== undefined) task.output = output;
    agentEventHub.publishTask(status === "done" ? "task.done" : status === "failed" ? "task.failed" : status === "running" ? "task.running" : "task.queued", task, { output });
    return task;
  }

  claimNext(): AgentTask | undefined {
    const nextId = this.order.find((taskId) => this.tasks.get(taskId)?.status === "queued");
    if (!nextId) return undefined;

    const task = this.tasks.get(nextId);
    if (!task) return undefined;

    task.status = "running";
    task.updatedAt = createTimestamp();
    agentEventHub.publishTask("task.running", task);
    return task;
  }

  complete(taskId: string, output: string): AgentTask | undefined {
    const task = this.update(taskId, "done", output);
    return task;
  }

  fail(taskId: string, error: string): AgentTask | undefined {
    const task = this.tasks.get(taskId);
    if (!task) return undefined;

    task.status = "failed";
    task.error = error;
    task.updatedAt = createTimestamp();
    agentEventHub.publishTask("task.failed", task, { error });
    return task;
  }

  list(): AgentTask[] {
    return this.order.map((taskId) => this.tasks.get(taskId)).filter((task): task is AgentTask => task !== undefined);
  }

  get(taskId: string): AgentTask | undefined {
    return this.tasks.get(taskId);
  }
}
