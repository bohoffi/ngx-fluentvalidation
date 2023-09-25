import { ValidationResult } from '../result/validation-result';
import { HasValidationResult } from './interfaces';

export abstract class AbstractValidator implements HasValidationResult {
  protected result: ValidationResult | null = null;

  public get validationResult(): ValidationResult | null {
    return this.result;
  }
}
