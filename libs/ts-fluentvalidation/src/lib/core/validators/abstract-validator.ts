import { ValidationResult } from '../result/validation-result';
import { HasValidationResult } from './interfaces';

export abstract class AbstractValidator implements HasValidationResult {
  protected result: ValidationResult = ValidationResult.Initial();

  public get validationResult(): ValidationResult {
    return this.result;
  }
}
