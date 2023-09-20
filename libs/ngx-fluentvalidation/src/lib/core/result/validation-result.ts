import { ValidationFailure } from './validation-failure';

export class ValidationResult<T> {
  // private failures: ValidationFailure<T>[] = [];
  private failures: ValidationFailure[] = [];

  get isValid(): boolean {
    return this.failures.length === 0;
  }

  // get errors(): ValidationFailure<T>[] {
  get errors(): ValidationFailure[] {
    return this.failures.slice();
  }

  // constructor(failures: ValidationFailure<T>[]) {
  constructor(failures: ValidationFailure[]) {
    this.failures = this.failures.concat(failures);
  }
}
