import { ValidationContext } from './validation-context';
import { ValidationResult } from './validation-result';

export interface Validator<T> {
  validate(instanceOrContext: T | ValidationContext): ValidationResult;
  validateAsync(instanceOrContext: T | ValidationContext, abortSignal: AbortSignal): Promise<ValidationResult>;
}
