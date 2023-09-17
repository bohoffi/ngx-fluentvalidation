import { Validator } from '../validators/validator';

export interface Rule<T> extends Validator<T> {
  errorMessage: string;
  validationFailure: ValidationFailure<T> | null;
  withPropertyName(propertyName: string): this;
}
