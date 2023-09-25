import { ValidationFailure } from './validation-failure';

export class ValidationResult {
  private failures: ValidationFailure[] = [];

  get isValid(): boolean {
    return this.failures.length === 0;
  }

  get errors(): ValidationFailure[] {
    return this.failures.slice();
  }

  constructor(failures: ValidationFailure[]) {
    this.failures = this.failures.concat(failures);
  }

  toString(separator = '\n'): string {
    return this.failures
      .slice()
      .map(f => f.errorMessage)
      .join(separator);
  }

  toMap(): Map<string, string[]> {
    return this.failures.reduce((acc, curr) => {
      if (typeof curr.propertyName === 'string') {
        acc.set(curr.propertyName, (acc.get(curr.propertyName) || []).concat(curr.errorMessage));
      } else {
        acc.set('UNKNOWN', (acc.get('UNKNOWN') || []).concat(curr.errorMessage));
      }
      return acc;
    }, new Map<string, string[]>());
  }
}
