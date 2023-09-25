export function hasLength(value?: unknown): value is { length: number } {
  return typeof value === 'string' || Array.isArray(value);
}
