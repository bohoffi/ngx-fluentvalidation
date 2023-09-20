import { ValidationFailure } from '../result/validation-failure';
import { Validatable } from '../validators/validatable';

export interface Rule<T> extends Validatable<T> {
  errorMessage: string;
  validationFailure: ValidationFailure | null;
  withPropertyName(propertyName?: string): this;
}
