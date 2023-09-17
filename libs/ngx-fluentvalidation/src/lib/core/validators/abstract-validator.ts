import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { Rule } from '../rules/rule';
import { KeyOf } from '../types';
import { Validator } from './validator';

export abstract class AbstractValidator<T> implements Validator<T> {
  protected rules: Rule<T>[] = [];
  protected propertyValidators: PropertyValidator[] = [];
  protected result: ValidationResult<T> | null = null;

  public get validationResult(): ValidationResult<T> | null {
    return this.result;
  }

  addRule(rule: Rule<T>): this {
    this.rules = this.rules.concat(rule);
    return this;
  }

  for<K extends KeyOf<T>>(propertyName: K): PropertyValidator<T[K]> {
    const propertyValidator = PropertyValidator.forProperty<T, T[K]>(propertyName);
    this.propertyValidators = this.propertyValidators.concat(propertyValidator);
    return propertyValidator;
  }

  validate(value: T): boolean {
    const ruleResult = this.rules.map(r => r.validate(value)).every(r => r);
    const propValResult = this.propertyValidators.map(pv => pv.validate(value[pv.propertyName as KeyOf<T>])).every(r => r);
    const result = ruleResult && propValResult;
    this.result = result
      ? null
      : // TODO include property validator failures
        new ValidationResult(this.rules.map(r => r.validationFailure).filter((f): f is ValidationFailure<T> => f !== null));
    return result;
  }
}

export class PropertyValidator<TProperty = unknown> extends AbstractValidator<TProperty> {
  public get validationFailure(): ValidationFailure<TProperty> | null {
    return this.validationResult?.errors?.length ? this.validationResult.errors.slice(0, 1)[0] : null;
  }

  static forProperty<T, TProperty>(propertyName: KeyOf<T>): PropertyValidator<TProperty> {
    return new PropertyValidator<TProperty>(propertyName);
  }

  protected constructor(public readonly propertyName: string) {
    super();
  }
}
