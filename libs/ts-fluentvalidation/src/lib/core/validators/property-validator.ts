import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { PropertyRule } from '../rules/property-rule';
import { KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { IPropertyValidator } from './interfaces';

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

  validateProperty(value: TProperty, model: TModel): boolean {
    const validationFailed = this.validationRules.map(rule => rule.validate(value, model)).some(result => result === false);
    this.result = validationFailed
      ? new ValidationResult(
          this.validationRules.map(rule => rule.validationFailure).filter((failure): failure is ValidationFailure => !!failure)
        )
      : null;
    return validationFailed === false;
  }
}
