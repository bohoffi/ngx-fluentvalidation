export interface ValidationFailure {
  propertyName?: string;
  errorMessage: string;
  /**
   * The property value that caused the failure.
   */
  attemptedValue: unknown | null | undefined;
}
