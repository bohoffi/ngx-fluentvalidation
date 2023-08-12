export class ValidationContext<T = unknown> {
  constructor(readonly instanceToValidate: T) {}
}
