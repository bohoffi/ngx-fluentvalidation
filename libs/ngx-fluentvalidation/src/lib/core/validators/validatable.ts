export interface Validatable<T = unknown> {
  validate(value: T): boolean;
}
