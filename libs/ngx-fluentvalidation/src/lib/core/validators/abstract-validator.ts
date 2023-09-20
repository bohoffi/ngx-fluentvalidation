import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { Rule } from '../rules/rule';
import { KeyOf, KeyOfType } from '../types';
import { Validatable } from './validatable';
import { Validator } from './validator';
import { StringValidatorBuilder } from './builders/string-validator-builder';
import { NumberValidatorBuilder } from './builders/number-validator-builder';
import { DateValidatorBuilder } from './builders/date-validator-builder';

export abstract class AbstractValidator<T> implements Validatable<T>, Validator<T> {
  protected rules: Rule<T>[] = [];
  protected propertyValidators: PropertyValidator[] = [];
  protected result: ValidationResult<T> | null = null;

  public get validationResult(): ValidationResult<T> | null {
    return this.result;
  }

  addRule(rule: Rule<T>, propertyName?: string): this {
    rule.withPropertyName(propertyName);
    this.rules = this.rules.concat(rule);
    return this;
  }

  // TODO builder chain is broken by optional properties
  // for<K extends KeyOf<T>>(propertyName: K): PropertyValidator<T[K]> {
  //   return this.createPropertyValidator<K, T[K]>(propertyName);
  // }
  // TODO fixes builder chain but validation execution breaks when accessing props of undefined
  for<K extends KeyOf<T>>(propertyName: K): PropertyValidator<NonNullable<T[K]>> {
    return this.createPropertyValidator<K, NonNullable<T[K]>>(propertyName);
  }

  forString<K extends KeyOfType<T, string>>(propertyName: K): StringValidatorBuilder {
    return new StringValidatorBuilder(this.createPropertyValidator(propertyName));
  }

  forNumber<K extends KeyOfType<T, number>>(propertyName: K): NumberValidatorBuilder {
    return new NumberValidatorBuilder(this.createPropertyValidator(propertyName));
  }

  forDate<K extends KeyOfType<T, Date>>(propertyName: K): DateValidatorBuilder {
    return new DateValidatorBuilder(this.createPropertyValidator(propertyName));
  }

  validate(value: T): boolean {
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
    this.propertyValidators = this.propertyValidators.concat(propertyValidator);
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
