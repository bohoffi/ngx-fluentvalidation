import { ValidationResult } from '../result/validation-result';
import { ArrayRuleBuilder, RuleBuilder } from '../rules/rule-builder';
import { TypeRuleBuilder, ValidatorBehaviourBuilder } from '../rules/rule-builders';
import { ArrayKeyOf, CascadeMode, KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { createValidatorForArrayProperty, createValidatorForProperty } from './factory';
import { HasCascadeBehaviour, IValidator } from './interfaces';

export class ModelValidator<TModel> extends AbstractValidator implements IValidator<TModel> {
  protected readonly propertyValidators: (IValidator<TModel> & HasCascadeBehaviour)[] = [];

  /**
   * Specifies the cascade mode for all property validation chains. Setting this will overwrite all property chain specific modes.
   *
   * If set to `Stop` then the execution of the validation will stop once the first rule fails.
   *
   * If set to `Continue` then all rules will execute regardless of failures.
   *
   * If set to `null` - the default - the mode set on the individual property chains will get evaluated.
   */
  public ruleLevelCascadeMode: CascadeMode | null = null;
  /**
   * Specifies the cascade mode for a validator itself.
   *
   * If set to `Stop` the execution of the property chains will stop if any property chain fails. This results in a "fail fast" behaviour and result in a maximum of 1 error.
   *
   * If set to `Continue` - the default - then all property chains will execute regardless of failures.
   */
  public classLevelCascadeMode: CascadeMode = 'Continue';

  /**
   * Defines a property chain (or validation pipeline) for a specific property.
   * @param propertyName Name of the chains property
   * @returns a rule builder to chain multiple validation rules
   */
  for<PropertyName extends KeyOf<TModel>, TProperty extends TModel[PropertyName]>(
    propertyName: PropertyName
  ): TypeRuleBuilder<TModel, TProperty> & ValidatorBehaviourBuilder<TModel, TProperty> {
    const propertyValidator = createValidatorForProperty<TModel, PropertyName>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const ruleBuilder = new RuleBuilder<TModel, TProperty>(propertyValidator);
    return ruleBuilder.getAllRules() as unknown as TypeRuleBuilder<TModel, TProperty> & ValidatorBehaviourBuilder<TModel, TProperty>;
  }

  /**
   * Defines a property chain (or validation pipeline) for a specific array property. All rules will be executed against every item contained in the array.
   * @param propertyName Name of the chains property
   * @returns a rule builder to chain multiple validation rules
   */
  forEach<PropertyName extends ArrayKeyOf<TModel>, TProperty extends TModel[PropertyName] & Array<unknown>>(
    propertyName: PropertyName
  ): TypeRuleBuilder<TModel, TProperty[0]> {
    const propertyValidator = createValidatorForArrayProperty<TModel, PropertyName, TProperty>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const ruleBuilder = new ArrayRuleBuilder<TModel, TProperty>(propertyValidator);
    return ruleBuilder.getAllRules() as unknown as TypeRuleBuilder<TModel, TProperty[0]> & ValidatorBehaviourBuilder<TModel, TProperty[0]>;
  }

  /**
   * Validates a model against the configured property chains. Failures will get stored in the `validationResult` property.
   * @param model Model to validate
   * @returns `true` if the model is valid; otherwise `false`
   */
  validate(model: TModel): boolean {
    let validationFailed = false;
    for (const validator of this.propertyValidators) {
      if (this.ruleLevelCascadeMode !== null) {
        validator.cascade(this.ruleLevelCascadeMode);
      }
      const validatorResult = validator.validate(model);
      if (validatorResult === false) {
        validationFailed = true;
        if (this.classLevelCascadeMode === 'Stop') {
          break;
        }
      }
    }

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
