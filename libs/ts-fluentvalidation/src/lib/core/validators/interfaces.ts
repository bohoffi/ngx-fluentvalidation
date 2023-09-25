import { ValidationResult } from '../result/validation-result';
import { PropertyRule } from '../rules/property-rule';
import { KeyOf } from '../types';

export interface IValidator<TModel> extends HasValidationResult {
  validate(value: TModel): boolean;
}

export interface HasValidationResult {
  get validationResult(): ValidationResult | null;
}

export interface IPropertyValidator<TModel, TProperty> extends HasValidationResult {
  readonly propertyName: KeyOf<TModel>;
  get validationRules(): PropertyRule<TModel, TProperty>[];
  addRule(rule: PropertyRule<TModel, TProperty>): void;
  validateProperty(value: TProperty, model: TModel): boolean;
}
