import { EqualsRule } from '../../../base/rules/common/equals-rule';
import { IsNotNullRule } from '../../../base/rules/common/is-not-null-rule';
import { IsNullRule } from '../../../base/rules/common/is-null-rule';
import { NotEqualsRule } from '../../../base/rules/common/not-equals-rule';
import { IsPositiveRule } from '../../../base/rules/number/is-positive-rule';
import { LessThanRule } from '../../../base/rules/number/less-than-rule';
import { ValidatorRule } from '../../../base/rules/object/validator-rule';
import { NotEmptyRule } from '../../../base/rules/string/not-empty-rule';
import { PropertyRule } from '../../rules/validation-rule';
import { ApplyConditionTo } from '../../types';
import { IPropertyValidator, IValidator } from '../interfaces';

abstract class AbstractValidatorBuilder<TModel, TProperty> {
  private lastRule: PropertyRule<TModel, TProperty> | null = null;

  constructor(private readonly validator: IPropertyValidator<TModel, TProperty>) {}

  protected getTypeRules() {
    return {
      ...this.getCommonRules(),
      ...this.getStringRules(),
      ...this.getNumberRules(),
      ...this.getObjectRules()
    };
  }

  public abstract getAllRules(): object;

  private getRulesWithExtensionsAndConditions() {
    return {
      ...this.getAllRules(),
      withMessage: this.withMessage,
      withName: this.withName,
      when: this.when,
      unless: this.unless
    };
  }

  private getCommonRules() {
    return {
      isNull: this.isNull,
      notNull: this.notNull,
      equal: this.equal,
      notEqual: this.notEqual
    };
  }

  private getStringRules() {
    return {
      notEmpty: this.notEmpty
    };
  }

  private getNumberRules() {
    return {
      isPositive: this.isPositive
    };
  }

  private getObjectRules() {
    return {
      setValidator: this.setValidator
    };
  }

  // extensions
  public withMessage = (message: string) => {
    this.lastRule?.withCustomMessage(message);
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  };

  public withName = (propertyName: string) => {
    this.lastRule?.withPropertyName(propertyName);
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  };

  // conditions
  public when = (condition: (model: TModel) => boolean, applyConditionTo: ApplyConditionTo = 'AllValidators') => {
    if (applyConditionTo === 'AllValidators') {
      this.validator.validationRules.forEach(rule => rule.withWhenCondition(condition));
    } else {
      this.lastRule?.withWhenCondition(condition);
    }
    return this.getAllRules();
  };
  public unless = (condition: (model: TModel) => boolean, applyConditionTo: ApplyConditionTo = 'AllValidators') => {
    if (applyConditionTo === 'AllValidators') {
      this.validator.validationRules.forEach(rule => rule.withUnlessCondition(condition));
    } else {
      this.lastRule?.withUnlessCondition(condition);
    }
    return this.getAllRules();
  };

  // common rules
  public isNull = () => {
    this.addRule(new IsNullRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public notNull = () => {
    this.addRule(new IsNotNullRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public equal = (referenceValue: TProperty) => {
    this.addRule(new EqualsRule<TModel, TProperty>(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public notEqual = (referenceValue: TProperty) => {
    this.addRule(new NotEqualsRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  // TODO define
  public must = (predicate: (model: TModel, value: TProperty) => boolean) => {
    return this.getRulesWithExtensionsAndConditions();
  };

  // string rules
  public notEmpty = () => {
    this.addRule(new NotEmptyRule());
    return this.getRulesWithExtensionsAndConditions();
  };

  // number rules
  public isPositive = () => {
    this.addRule(new IsPositiveRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public lessThan = (referenceValue: number) => {
    this.addRule(new LessThanRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };

  // object rules
  public setValidator = (validator: IValidator<TProperty>) => {
    this.addRule(new ValidatorRule(validator));
    return this.getRulesWithExtensionsAndConditions();
  };

  public addRule(rule: PropertyRule<TModel, TProperty>): void {
    this.lastRule = rule;
    this.validator.addRule(rule);
  }
}

export class ValidationBuilder<TModel, TProperty> extends AbstractValidatorBuilder<TModel, TProperty> {
  public override getAllRules() {
    return {
      ...this.getTypeRules()
    };
  }
}
