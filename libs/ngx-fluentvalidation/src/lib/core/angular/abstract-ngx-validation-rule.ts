import { ValidatorFn, AbstractControl } from '@angular/forms';
import { NgxValidationRule } from './ngx-validation-rule';
import { AbstractValidationRule } from '../rules/validation-rule';

export abstract class AbstractNgxValidationRule<T> extends AbstractValidationRule<T> implements NgxValidationRule<T> {
  asValidatorFn(): ValidatorFn {
    return (control: AbstractControl) => (this.validateInternal(control.value) ? null : { specError: this.errorMessage });
  }
}
