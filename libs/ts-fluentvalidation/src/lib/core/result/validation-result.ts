import { ValidationFailure } from './validation-failure';

/**
 * Result of either a property or model validation.
 */
export class ValidationResult {
  private failures: ValidationFailure[] = [];

  /**
   * Flag indicating if there are any failures.
   */
  get isValid(): boolean {
    return this.failures.length === 0;
  }

  /**
   * Array of validation failures.
   */
  get errors(): ValidationFailure[] {
    return this.failures.slice();
  }

  /**
   * Creates a valid result object.
   */
  static Initial(): ValidationResult {
    return new ValidationResult();
  }

  /**
   * Creates a result object by passing a failure array.
   */
  static withFailures(failures: ValidationFailure[]): ValidationResult {
    return new ValidationResult(failures);
  }

  private constructor(failures: ValidationFailure[] = []) {
    this.failures = this.failures.concat(failures);
  }

  /**
   * Returns a string representation of the error messages separated by a given separator.
   * @param separator separator to use for joining
   * @returns joined string of error messages
   */
  toString(separator = '\n'): string {
    return this.failures
      .slice()
      .map(f => f.errorMessage)
      .join(separator);
  }

  /**
   * Creates a map whichs keys are the validation failures property names - if set; otherwise `UNKNOWN` - where each value is an array of property related error messages.
   * @returns error messages structured by property name
   */
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
