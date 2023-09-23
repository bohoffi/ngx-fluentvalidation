import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { Rule } from '../rules/rule';
import { KeyOf } from '../types';
import { Validatable } from './validatable';
import { Validator } from './validator';
import { TypeValidator } from './typed/typed-validators';
import { ValidationBuilder } from './builders/validator-builder';

export abstract class AbstractValidator<T> implements Validatable<T>, Validator<T> {
  protected rules: Rule<T>[] = [];
  protected propertyValidators: PropertyValidator[] = [];
  protected result: ValidationResult | null = null;
  protected validateWhen: ((value: T) => boolean) | null = null;
  protected validateUnless: ((value: T) => boolean) | null = null;

  public get validationResult(): ValidationResult | null {
    return this.result;
  }

  addRule(rule: Rule<T>, propertyName?: string): this {
    rule.withPropertyName(propertyName);
    this.rules = this.rules.concat(rule);
    return this;
  }

  when(predicate: (value: T) => boolean): this {
    this.validateWhen = predicate;
    return this;
  }
  unless(predicate: (value: T) => boolean): this {
    this.validateUnless = predicate;
    return this;
  }

  for<K extends KeyOf<T>>(propertyName: K): TypeValidator<T, T[K]> {
    const validatorBuilder = new ValidationBuilder<T, T[K]>(this.createPropertyValidator(propertyName));
    return validatorBuilder.getAllRules() as unknown as TypeValidator<T, T[K]> as any;
  }

  validate(value: T): boolean {
    // break when conditions not satisfied
    if ((this.validateWhen && this.validateWhen(value) === false) || (this.validateUnless && this.validateUnless(value) === true)) {
      return true;
    }
    const ruleResult = this.rules.map(r => r.validate(value)).every(r => r);
    const propValResult = this.propertyValidators
      .map(pv => pv.validate(value ? value[pv.propertyName as KeyOf<T>] : undefined))
      .every(r => r);
    const result = ruleResult && propValResult;
    this.result = result ? null : new ValidationResult(this.collectFailures());
    return result;
  }

  private createPropertyValidator<K extends KeyOf<T>, U>(propertyName: K): PropertyValidator<U> {
    const propertyValidator = PropertyValidator.forProperty<T, U>(propertyName);
    this.propertyValidators = this.propertyValidators.concat(propertyValidator as PropertyValidator<unknown>);
    return propertyValidator;
  }

  private collectFailures(): ValidationFailure[] {
    return this.rules
      .map(r => r.validationFailure)
      .concat(this.propertyValidators.map(pv => pv.validationFailure))
      .filter((f): f is ValidationFailure => f !== null);
  }
}

export class PropertyValidator<TProperty = unknown> extends AbstractValidator<TProperty> {
  public get validationFailure(): ValidationFailure | null {
    return this.validationResult?.errors?.length ? this.validationResult.errors.slice(0, 1)[0] : null;
  }

  static forProperty<T, TProperty>(propertyName: KeyOf<T>): PropertyValidator<TProperty> {
    return new PropertyValidator<TProperty>(propertyName);
  }

  protected constructor(public readonly propertyName: string) {
    super();
  }
}
