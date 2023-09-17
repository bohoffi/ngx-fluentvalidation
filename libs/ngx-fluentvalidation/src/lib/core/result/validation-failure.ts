export interface ValidationFailure<T = unknown> {
  propertyName?: string;
  errorMessage: string;
  /**
   * The property value that caused the failure.
   */
  attemptedValue: T;
}
