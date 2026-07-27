export function createId(prefix: string): string {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${suffix}`;
}

export function createTimestamp(): string {
  return new Date().toISOString();
}
