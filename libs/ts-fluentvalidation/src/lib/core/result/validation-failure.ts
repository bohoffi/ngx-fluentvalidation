/**
 * Validation failure creating a context containing the property name, its value and the error message.
 */
export interface ValidationFailure {
  /**
   * Name of the property which caused the validation failure.
   */
  propertyName?: string;
  /**
   * Error message containing the reason why the validation failed.
   */
  errorMessage: string;
  /**
   * The property value that caused the failure.
   */
  attemptedValue: unknown | null | undefined;
}
