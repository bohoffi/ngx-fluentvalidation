import { ValidationFailure } from '../result/validation-failure';
import { ValidationResult } from '../result/validation-result';
import { PropertyRule } from '../rules/property-rule';
import { ArrayKeyOf, CascadeMode, KeyOf } from '../types';
import { AbstractValidator } from './abstract-validator';
import { IArrayPropertyValidator, IPropertyValidator } from './interfaces';

/**
 * Validator for a specific property responsible for holding the defined rules and executing them against a property value.
 */
export class PropertyValidator<TModel, TProperty> extends AbstractValidator implements IPropertyValidator<TModel, TProperty> {
  private readonly rules: PropertyRule<TModel, TProperty>[] = [];
  private cascadeMode: CascadeMode = 'Continue';

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

  public cascade(cascadeMode: CascadeMode): void {
    this.cascadeMode = cascadeMode;
  }

  validate(model: TModel): boolean {
    const value = model[this.propertyName] as TProperty;
    let validationFailed = false;
    for (const rule of this.validationRules) {
      const ruleResult = rule.validate(value, model);
      if (ruleResult === false) {
        validationFailed = true;
        if (this.cascadeMode === 'Stop') {
          break;
        }
      }
    }

    this.result = ValidationResult.withFailures(
      this.validationRules.map(rule => rule.validationFailure).filter((failure): failure is ValidationFailure => !!failure)
    );
    return validationFailed === false;
  }
}

/**
 * Validator for a specific array property responsible for holding the defined rules and executing them against all array items.
 */
export class ArrayPropertyValidator<TModel, TProperty extends Array<unknown>>
  extends AbstractValidator
  implements IArrayPropertyValidator<TModel, TProperty>
{
  private readonly rules: PropertyRule<TModel, TProperty[0]>[] = [];
  private cascadeMode: CascadeMode = 'Continue';

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

  public cascade(cascadeMode: CascadeMode): void {
    this.cascadeMode = cascadeMode;
  }

  validate(model: TModel): boolean {
    const value = model[this.propertyName] as TProperty;
    // TODO refactor: array validation should not overwrite failures
    let validationFailed = false;
    for (const rule of this.validationRules) {
      const ruleResult = value.map(item => rule.validate(item, model)).every(result => result === true);
      if (ruleResult === false) {
        validationFailed = true;
        if (this.cascadeMode === 'Stop') {
          break;
        }
      }
    }

    this.result = ValidationResult.withFailures(
      this.validationRules.map(rule => rule.validationFailure).filter((failure): failure is ValidationFailure => !!failure)
    );
    return validationFailed === false;
  }
}
