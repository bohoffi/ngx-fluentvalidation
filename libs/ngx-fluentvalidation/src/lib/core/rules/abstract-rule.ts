import { Rule } from './rule';
import { ValidationFailure } from '../result/validation-failure';

export abstract class AbstractRule<T> implements Rule<T> {
  validationFailure: ValidationFailure<T> | null = null;

  constructor(public readonly errorMessage: string, private readonly condition: (value: T) => boolean, private propertyName?: string) {}

  withPropertyName(propertyName: string): this {
    this.propertyName = propertyName;
    return this;
  }

  validate(value: T): boolean {
    const result = this.condition(value);
    this.validationFailure = result
      ? null
      : {
          attemptedValue: value,
          errorMessage: this.errorMessage,
          propertyName: this.propertyName
        };
    return result;
  }
}
