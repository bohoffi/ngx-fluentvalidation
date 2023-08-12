export interface ValidationFailure {
  propertyName: string;
  errorMessage: string;
  attemptedValue?: unknown;
}
