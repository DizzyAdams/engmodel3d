export function createId(prefix) {
    const suffix = Math.random().toString(36).slice(2, 10);
    return `${prefix}_${suffix}`;
}
export function createTimestamp() {
    return new Date().toISOString();
}
