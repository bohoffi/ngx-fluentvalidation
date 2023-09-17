import { ValidatorFn } from '@angular/forms';
import { ValidationRule } from '../rules/validation-rule';

export interface NgxValidationRule<T> extends ValidationRule<T> {
  asValidatorFn(): ValidatorFn;
}
