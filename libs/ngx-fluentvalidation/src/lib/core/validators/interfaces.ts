import { PropertyRule } from '../rules/validation-rule';

export interface IValidator<TModel> {
  validate(value: TModel): boolean;
}

export interface IPropertyValidator<TModel, TProperty> {
  readonly propertyName: keyof TModel;
  get validationRules(): PropertyRule<TModel, TProperty>[];
  addRule(rule: PropertyRule<TModel, TProperty>): void;
  validateProperty(value: TProperty, model: TModel): boolean;
}
