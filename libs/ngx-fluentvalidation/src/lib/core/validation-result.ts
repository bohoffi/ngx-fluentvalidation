import { ValidationFailure } from './validation-failure';

export class ValidationResult {
  private readonly _errors: ValidationFailure[] = [];

  public get isValid(): boolean {
    return this._errors.length === 0;
  }

  public get errors(): ValidationFailure[] {
    return structuredClone(this._errors);
  }

  public readonly ruleSetsExecuted: string[] = [];

  constructor(errors: ValidationFailure[] = []) {
    this._errors = structuredClone(errors);
  }

  /**
   * Generates a string representation of the error messages separated by a given separator - or newline if omitted.
   * @param separator optional separator
   */
  public toString(separator?: string): string {
    return this._errors.join(separator ?? '\n');
  }

  /**
   * Converts the ValidationResults errors collection into a simple map representation.
   * Equivilant to `ToDictionary` from the C# API.
   * @returns a map keyed by the property name where each value is an array of error messages associated with that property
   */
  public toMap(): Map<string, string[]> {
    return this.errors.reduce((map: Map<string, string[]>, currentError: ValidationFailure) => {
      return map.set(
        currentError.propertyName,
        structuredClone((map.get(currentError.propertyName) ?? []).concat(currentError.errorMessage))
      );
    }, new Map<string, string[]>());
  }
}
