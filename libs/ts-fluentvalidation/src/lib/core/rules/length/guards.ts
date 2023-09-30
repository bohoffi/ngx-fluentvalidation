import { LengthProperty, NumberProperty, ObjectProperty, StringProperty } from '../rule-builders';

export function hasLength(value?: unknown): value is { length: number } {
  return typeof value === 'string' || Array.isArray(value);
}

export function isStringProperty(value?: unknown): value is StringProperty {
  return value === null || value === undefined || typeof value === 'string';
}

export function isNumberProperty(value?: unknown): value is NumberProperty {
  return value === null || value === undefined || typeof value === 'number' || typeof value === 'bigint';
}

export function isObjectProperty(value?: unknown): value is ObjectProperty {
  return value === null || value === undefined || typeof value === 'object';
}

export function isLengthProperty(value?: unknown): value is LengthProperty {
  return value === null || value === undefined || typeof value === 'string' || 'length' in (value as any);
}
