import { ValidationResult } from '../result/validation-result';
import { KeyOf } from '../types';
import { TypeValidator } from './typed/typed-validators';
import { ValidationBuilder } from './builders/validator-builder';
import { PropertyRule } from '../rules/validation-rule';
import { IPropertyValidator, IValidator } from './interfaces';
import { ValidationFailure } from '../result/validation-failure';

export abstract class AbstractValidator<TModel> implements IValidator<TModel> {
  protected propertyValidators: PropertyValidator<TModel, TModel[KeyOf<TModel>]>[] = [];
  protected result: ValidationResult | null = null;

  public get validationResult(): ValidationResult | null {
    return this.result;
  }

  for<PropertyName extends KeyOf<TModel>, TProperty extends TModel[PropertyName]>(
    propertyName: PropertyName
  ): TypeValidator<TModel, TProperty> {
    const propertyValidator = new PropertyValidator<TModel, TModel[KeyOf<TModel>]>(propertyName);
    this.propertyValidators.push(propertyValidator);
    const validatorBuilder = new ValidationBuilder<TModel, TProperty>(propertyValidator);
    return validatorBuilder.getAllRules() as unknown as TypeValidator<TModel, TProperty>;
  }

  validate(value: TModel): boolean {
    const validationFailed = this.propertyValidators
      .map(validator => validator.validateProperty(value[validator.propertyName], value))
      .some(result => result === false);
    this.result = validationFailed
      ? new ValidationResult(
          this.propertyValidators
            .map(validator => validator.result)
            .filter((result): result is ValidationResult => result instanceof ValidationResult)
            .flatMap(result => result.errors)
        )
      : null;
    return validationFailed === false;
  }
}

export class PropertyValidator<TModel, TProperty> extends AbstractValidator<TProperty> implements IPropertyValidator<TModel, TProperty> {
  private _rules: PropertyRule<TModel, TProperty>[] = [];

  public get validationRules(): PropertyRule<TModel, TProperty>[] {
    return this._rules.slice();
  }

  constructor(public readonly propertyName: KeyOf<TModel>) {
    super();
  }

  public addRule(rule: PropertyRule<TModel, TProperty>): void {
    rule.withPropertyName(this.propertyName);
    this._rules = this._rules.concat(rule);
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
