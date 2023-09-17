import { ValidationFailure } from './validation-failure';

export class ValidationResult<T> {
  private failures: ValidationFailure<T>[] = [];

  get isValid(): boolean {
    return this.failures.length === 0;
  }

  get errors(): ValidationFailure<T>[] {
    return this.failures.slice();
  }

  constructor(failures: ValidationFailure<T>[]) {
    this.failures = this.failures.concat(failures);
  }
}
