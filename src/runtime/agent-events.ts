import type { AgentRole, AgentTask, TaskStatus } from "../types/domain.js";

export type AgentEventType = "task.queued" | "task.running" | "task.done" | "task.failed" | "heartbeat";

export interface AgentEvent {
  id: string;
  type: AgentEventType;
  emittedAt: string;
  taskId?: string;
  projectId?: string;
  role?: AgentRole;
  status?: TaskStatus;
  title?: string;
  output?: string;
  error?: string;
}

export type AgentEventListener = (event: AgentEvent) => void;

const MAX_HISTORY = 200;
const MAX_CLIENTS = 32;

function createEventId() {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function toEvent(type: AgentEventType, task: AgentTask, extra: Pick<AgentEvent, "output" | "error"> = {}): AgentEvent {
  return {
    id: createEventId(),
    type,
    emittedAt: new Date().toISOString(),
    taskId: task.id,
    projectId: task.projectId,
    role: task.role,
    status: task.status,
    title: task.title,
    ...extra,
  };
}

export class AgentEventHub {
  private readonly history: AgentEvent[] = [];
  private readonly listeners = new Set<AgentEventListener>();

  publish(event: AgentEvent): AgentEvent {
    this.history.push(event);
    if (this.history.length > MAX_HISTORY) this.history.splice(0, this.history.length - MAX_HISTORY);
    for (const listener of this.listeners) listener(event);
    return event;
  }

  publishTask(type: Exclude<AgentEventType, "heartbeat">, task: AgentTask, extra?: Pick<AgentEvent, "output" | "error">) {
    return this.publish(toEvent(type, task, extra));
  }

  heartbeat(): AgentEvent {
    return { id: createEventId(), type: "heartbeat", emittedAt: new Date().toISOString() };
  }

  subscribe(listener: AgentEventListener): () => void {
    if (this.listeners.size >= MAX_CLIENTS) throw new Error("agent event stream is at capacity");
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  recent(projectId?: string): AgentEvent[] {
    return this.history.filter((event) => !projectId || event.projectId === projectId).slice(-50);
  }
}

export const agentEventHub = new AgentEventHub();