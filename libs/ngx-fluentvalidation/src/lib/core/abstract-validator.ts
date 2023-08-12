import { ValidationContext } from './validation-context';
import { ValidationResult } from './validation-result';
import { Validator } from './validator';

export class AbstractValidator<T> implements Validator<T> {
  validate(instance: T): ValidationResult;
  validate(context: ValidationContext): ValidationResult;
  validate(instanceOrContext: T | ValidationContext): ValidationResult {
    if (!(instanceOrContext instanceof ValidationContext)) {
      this.validate(new ValidationContext<T>(instanceOrContext));
    }

    throw new Error('Method not implemented.');
  }

  validateAsync(instance: T, abortSignal: AbortSignal): Promise<ValidationResult>;
  validateAsync(context: ValidationContext, abortSignal: AbortSignal): Promise<ValidationResult>;
  validateAsync(instanceOrContext: T | ValidationContext, abortSignal: AbortSignal): Promise<ValidationResult> {
    if (!(instanceOrContext instanceof ValidationContext)) {
      this.validateAsync(new ValidationContext<T>(instanceOrContext), abortSignal);
    }
    throw new Error('Method not implemented.');
  }
}
