import { EqualsRule } from '../../../base/rules/common/equals-rule';
import { IsNotNullRule } from '../../../base/rules/common/is-not-null-rule';
import { IsNullRule } from '../../../base/rules/common/is-null-rule';
import { MustRule } from '../../../base/rules/common/must-rule';
import { NotEqualsRule } from '../../../base/rules/common/not-equals-rule';
import { HasLengthRule } from '../../../base/rules/length/has-length-rule';
import { HasMaxLengthRule } from '../../../base/rules/length/has-max-length-rule';
import { HasMinLengthRule } from '../../../base/rules/length/has-min-length-rule';
import { ExclusiveBetweenRule } from '../../../base/rules/number/exclusive-between-rule';
import { GreaterThanOrEqualToRule } from '../../../base/rules/number/greater-than-or-equal-to-rule';
import { GreaterThanRule } from '../../../base/rules/number/greater-than-rule';
import { InclusiveBetweenRule } from '../../../base/rules/number/inclusive-between-rule';
import { IsNegativeRule } from '../../../base/rules/number/is-negative-rule';
import { IsPositiveRule } from '../../../base/rules/number/is-positive-rule';
import { LessThanOrEqualToRule } from '../../../base/rules/number/less-than-or-equal-to-rule';
import { LessThanRule } from '../../../base/rules/number/less-than-rule';
import { ValidatorRule } from '../../../base/rules/object/validator-rule';
import { CreditCardRule } from '../../../base/rules/string/credit-card-rule';
import { IsEmptyRule } from '../../../base/rules/string/is-empty-rule';
import { MatchesRule } from '../../../base/rules/string/matches-rules';
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
      ...this.getObjectRules(),
      ...this.getLengthRules()
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
      notEqual: this.notEqual,
      must: this.must
    };
  }

  private getStringRules() {
    return {
      creditCard: this.creditCard,
      empty: this.empty,
      notEmpty: this.notEmpty,
      matches: this.matches
    };
  }

  private getNumberRules() {
    return {
      lessThan: this.lessThan,
      lessThanOrEqualTo: this.lessThanOrEqualTo,
      greaterThan: this.greaterThan,
      greaterThanOrEqualTo: this.greaterThanOrEqualTo,
      isPositive: this.isPositive,
      isNegative: this.isNegative,
      exclusiveBetween: this.exclusiveBetween,
      inclusiveBetween: this.inclusiveBetween
    };
  }

  private getObjectRules() {
    return {
      setValidator: this.setValidator
    };
  }

  private getLengthRules() {
    return {
      length: this.length,
      maxLength: this.maxLength,
      minLength: this.minLength
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
  public must = (predicate: (value: TProperty | null | undefined, model: TModel) => boolean) => {
    this.addRule(new MustRule(predicate));
    return this.getRulesWithExtensionsAndConditions();
  };

  // string rules
  public creditCard = () => {
    this.addRule(new CreditCardRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public empty = () => {
    this.addRule(new IsEmptyRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public notEmpty = () => {
    this.addRule(new NotEmptyRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public matches = (regExp: RegExp) => {
    this.addRule(new MatchesRule(regExp));
    return this.getRulesWithExtensionsAndConditions();
  };

  // number rules
  public lessThan = (referenceValue: number) => {
    this.addRule(new LessThanRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  lessThanOrEqualTo = (referenceValue: number) => {
    this.addRule(new LessThanOrEqualToRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public greaterThan = (referenceValue: number) => {
    this.addRule(new GreaterThanRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  greaterThanOrEqualTo = (referenceValue: number) => {
    this.addRule(new GreaterThanOrEqualToRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public isPositive = () => {
    this.addRule(new IsPositiveRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public isNegative = () => {
    this.addRule(new IsNegativeRule());
    return this.getRulesWithExtensionsAndConditions();
  };
  public exclusiveBetween = (options: { min: number; max: number }) => {
    this.addRule(new ExclusiveBetweenRule(options));
    return this.getRulesWithExtensionsAndConditions();
  };
  public inclusiveBetween = (options: { min: number; max: number }) => {
    this.addRule(new InclusiveBetweenRule(options));
    return this.getRulesWithExtensionsAndConditions();
  };

  // object rules
  public setValidator = (validator: IValidator<TProperty>) => {
    this.addRule(new ValidatorRule(validator));
    return this.getRulesWithExtensionsAndConditions();
  };

  // length rules
  public length = (options: { minLength: number; maxLength: number }) => {
    this.addRule(new HasLengthRule(options));
    return this.getRulesWithExtensionsAndConditions();
  };
  public maxLength = (maxLength: number) => {
    this.addRule(new HasMaxLengthRule(maxLength));
    return this.getRulesWithExtensionsAndConditions();
  };
  public minLength = (minLength: number) => {
    this.addRule(new HasMinLengthRule(minLength));
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
