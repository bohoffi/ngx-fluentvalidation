import { ValidationResult } from '../result/validation-result';
import { PropertyRule } from '../rules/property-rule';
import { ArrayKeyOf, InferArrayItem, KeyOf } from '../types';

export interface IValidator<TModel> extends HasValidationResult {
  validate(model: TModel): boolean;
}

export interface HasValidationResult {
  get validationResult(): ValidationResult | null;
}

export interface IPropertyValidator<TModel, TProperty> extends IValidator<TModel>, HasValidationResult {
  readonly propertyName: KeyOf<TModel>;
  get validationRules(): PropertyRule<TModel, TProperty>[];
  addRule(rule: PropertyRule<TModel, TProperty>): void;
  // TODO: remove?
  // validateProperty(value: TProperty, model: TModel): boolean;
}

export interface IArrayPropertyValidator<TModel, TProperty extends Array<unknown>> extends IValidator<TModel>, HasValidationResult {
  readonly propertyName: ArrayKeyOf<TModel>;
  get validationRules(): PropertyRule<TModel, InferArrayItem<TProperty>>[];
  addRule(rule: PropertyRule<TModel, InferArrayItem<TProperty>>): void;
  // TODO: remove?
  // validateProperty(value: TProperty, model: TModel): boolean;
}
