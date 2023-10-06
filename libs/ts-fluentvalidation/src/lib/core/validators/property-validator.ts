import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { PropertyRule } from '../rules/property-rule';
import { ArrayKeyOf, KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { IArrayPropertyValidator, IPropertyValidator } from './interfaces';

export class PropertyValidator<TModel, TProperty> extends AbstractValidator implements IPropertyValidator<TModel, TProperty> {
  private readonly rules: PropertyRule<TModel, TProperty>[] = [];

  get validationRules(): PropertyRule<TModel, TProperty>[] {
    return this.rules;
  }

  constructor(public readonly propertyName: KeyOf<TModel>) {
    super();
  }

  addRule(rule: PropertyRule<TModel, TProperty>): void {
    rule.withPropertyName(this.propertyName);
    this.rules.push(rule);
  }

  validate(model: TModel): boolean {
    const value = model[this.propertyName] as TProperty;
    const validationFailed = this.validationRules.map(rule => rule.validate(value, model)).some(result => result === false);
    this.result = validationFailed
      ? new ValidationResult(
          this.validationRules.map(rule => rule.validationFailure).filter((failure): failure is ValidationFailure => !!failure)
        )
      : null;
    return validationFailed === false;
  }
}

export class ArrayPropertyValidator<TModel, TProperty extends Array<unknown>>
  extends AbstractValidator
  implements IArrayPropertyValidator<TModel, TProperty>
{
  private readonly rules: PropertyRule<TModel, TProperty[0]>[] = [];

  get validationRules(): PropertyRule<TModel, TProperty[0]>[] {
    return this.rules;
  }

  constructor(public readonly propertyName: ArrayKeyOf<TModel>) {
    super();
  }

  addRule(rule: PropertyRule<TModel, TProperty[0]>): void {
    rule.withPropertyName(this.propertyName);
    this.rules.push(rule);
  }

  validate(model: TModel): boolean {
    const value = model[this.propertyName] as TProperty;
    // TODO refactor: array validation should not overwrite failures
    const validationFailed = value
      .map(item => this.validationRules.map(rule => rule.validate(item, model)))
      .flat()
      .some(result => result === false);
    this.result = validationFailed
      ? new ValidationResult(
          this.validationRules.map(rule => rule.validationFailure).filter((failure): failure is ValidationFailure => !!failure)
        )
      : null;
    return validationFailed === false;
  }
}
