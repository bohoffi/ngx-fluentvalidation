import { ValidationResult } from '../result/validation-result';
import { RuleBuilder } from '../rules/rule-builder';
import { TypeRuleBuilder } from '../rules/rule-builders';
import { KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { createValidatorForProperty } from './factory';
import { IPropertyValidator, IValidator } from './interfaces';

export class ModelValidator<TModel> extends AbstractValidator implements IValidator<TModel> {
  protected readonly propertyValidators: IPropertyValidator<TModel, TModel[KeyOf<TModel>]>[] = [];

  for<PropertyName extends KeyOf<TModel>, TProperty extends TModel[PropertyName]>(
    propertyName: PropertyName
  ): TypeRuleBuilder<TModel, TProperty> {
    const propertyValidator = createValidatorForProperty<TModel, PropertyName>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const ruleBuilder = new RuleBuilder<TModel, TProperty>(propertyValidator);
    return ruleBuilder.getAllRules() as unknown as TypeRuleBuilder<TModel, TProperty>;
  }

  validate(value: TModel): boolean {
    const validationFailed = this.propertyValidators
      .map(validator => validator.validateProperty(value[validator.propertyName], value))
      .some(result => result === false);
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
