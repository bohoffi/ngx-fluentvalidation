import { ValidationResult } from '../result/validation-result';
import { ArrayRuleBuilder, RuleBuilder } from '../rules/rule-builder';
import { TypeRuleBuilder } from '../rules/rule-builders';
import { ArrayKeyOf, KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { createValidatorForArrayProperty, createValidatorForProperty } from './factory';
import { IValidator } from './interfaces';

export class ModelValidator<TModel> extends AbstractValidator implements IValidator<TModel> {
  protected readonly propertyValidators: IValidator<TModel>[] = [];

  for<PropertyName extends KeyOf<TModel>, TProperty extends TModel[PropertyName]>(
    propertyName: PropertyName
  ): TypeRuleBuilder<TModel, TProperty> {
    const propertyValidator = createValidatorForProperty<TModel, PropertyName>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const ruleBuilder = new RuleBuilder<TModel, TProperty>(propertyValidator);
    return ruleBuilder.getAllRules() as unknown as TypeRuleBuilder<TModel, TProperty>;
  }

  forEach<PropertyName extends ArrayKeyOf<TModel>, TProperty extends TModel[PropertyName] & Array<unknown>>(
    propertyName: PropertyName
  ): TypeRuleBuilder<TModel, TProperty[0]> {
    const propertyValidator = createValidatorForArrayProperty<TModel, PropertyName, TProperty>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const ruleBuilder = new ArrayRuleBuilder<TModel, TProperty>(propertyValidator);
    return ruleBuilder.getAllRules() as unknown as TypeRuleBuilder<TModel, TProperty[0]>;
  }

  validate(model: TModel): boolean {
    const validationFailed = this.propertyValidators.map(validator => validator.validate(model)).some(result => result === false);
    this.result = validationFailed
      ? new ValidationResult(
          this.propertyValidators
            .map(validator => validator.validationResult)
            .filter((result): result is ValidationResult => result instanceof ValidationResult)
            .flatMap(result => result.errors)
        )
      : null;
    return validationFailed === false;
  }
}
