import { createId, createTimestamp } from "./id.js";
export class TaskQueue {
    tasks = new Map();
    order = [];
    enqueue(item) {
        const now = createTimestamp();
        const task = {
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
        return task;
    }
    update(taskId, status, output) {
        const task = this.tasks.get(taskId);
        if (!task)
            return undefined;
        task.status = status;
        task.updatedAt = createTimestamp();
        if (output !== undefined)
            task.output = output;
        return task;
    }
    claimNext() {
        const nextId = this.order.find((taskId) => this.tasks.get(taskId)?.status === "queued");
        if (!nextId)
            return undefined;
        const task = this.tasks.get(nextId);
        if (!task)
            return undefined;
        task.status = "running";
        task.updatedAt = createTimestamp();
        return task;
    }
    complete(taskId, output) {
        const task = this.update(taskId, "done", output);
        return task;
    }
    fail(taskId, error) {
        const task = this.tasks.get(taskId);
        if (!task)
            return undefined;
        task.status = "failed";
        task.error = error;
        task.updatedAt = createTimestamp();
        return task;
    }
    list() {
        return this.order.map((taskId) => this.tasks.get(taskId)).filter((task) => task !== undefined);
    }
    get(taskId) {
        return this.tasks.get(taskId);
    }
}
