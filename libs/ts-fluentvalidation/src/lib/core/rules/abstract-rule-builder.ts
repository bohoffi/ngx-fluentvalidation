import { ApplyConditionTo, CascadeMode } from '../types';
import { IPropertyValidator, IValidator } from '../validators/interfaces';
import { EqualsRule } from './common/equals-rule';
import { IsNotNullRule } from './common/is-not-null-rule';
import { IsNullRule } from './common/is-null-rule';
import { MustRule } from './common/must-rule';
import { NotEqualsRule } from './common/not-equals-rule';
import { HasLengthRule } from './length/has-length-rule';
import { HasMaxLengthRule } from './length/has-max-length-rule';
import { HasMinLengthRule } from './length/has-min-length-rule';
import { ExclusiveBetweenRule } from './number/exclusive-between-rule';
import { GreaterThanOrEqualToRule } from './number/greater-than-or-equal-to-rule';
import { GreaterThanRule } from './number/greater-than-rule';
import { InclusiveBetweenRule } from './number/inclusive-between-rule';
import { IsNegativeRule } from './number/is-negative-rule';
import { IsPositiveRule } from './number/is-positive-rule';
import { LessThanOrEqualToRule } from './number/less-than-or-equal-to-rule';
import { LessThanRule } from './number/less-than-rule';
import { ValidatorRule } from './object/validator-rule';
import { PropertyRule } from './property-rule';
import { CreditCardRule } from './string/credit-card-rule';
import { IsEmptyRule } from './length/is-empty-rule';
import { MatchesRule } from './string/matches-rules';
import { NotEmptyRule } from './length/not-empty-rule';
import {
  CommonRuleBuilder,
  ConditionalRuleBuilder,
  ExtendedRuleBuilder,
  LengthProperty,
  LengthRuleBuilder,
  NumberProperty,
  NumberRuleBuilder,
  ObjectProperty,
  ObjectRuleBuilder,
  StringProperty,
  StringRuleBuilder,
  ValidatorBehaviourBuilder
} from './rule-builders';

type RuleBuilderContract<TRuleBuilder> = {
  [K in keyof TRuleBuilder]: unknown;
};

export abstract class AbstractRuleBuilder<TModel, TProperty> {
  private lastRule: PropertyRule<TModel, TProperty> | null = null;

  constructor(private readonly validator: IPropertyValidator<TModel, TProperty>) {}

  protected getTypeRules(): ReturnType<AbstractRuleBuilder<TModel, TProperty>['getValidatorBehaviours']> &
    ReturnType<AbstractRuleBuilder<TModel, TProperty>['getCommonRules']> &
    ReturnType<AbstractRuleBuilder<TModel, TProperty>['getStringRules']> &
    ReturnType<AbstractRuleBuilder<TModel, TProperty>['getNumberRules']> &
    ReturnType<AbstractRuleBuilder<TModel, TProperty>['getObjectRules']> &
    ReturnType<AbstractRuleBuilder<TModel, TProperty>['getLengthRules']> {
    return {
      ...this.getValidatorBehaviours(),
      ...this.getCommonRules(),
      ...this.getStringRules(),
      ...this.getNumberRules(),
      ...this.getObjectRules(),
      ...this.getLengthRules()
    };
  }

  public abstract getAllRules(): object;

  private getValidatorBehaviours(): RuleBuilderContract<Pick<ValidatorBehaviourBuilder<TModel, TProperty>, 'cascade'>> {
    return {
      cascade: this.cascade
    };
  }

  private getRulesWithExtensionsAndConditions(): RuleBuilderContract<
    Pick<ExtendedRuleBuilder<TModel, TProperty>, 'withMessage' | 'withName' | 'when' | 'unless'>
  > &
    unknown {
    return {
      ...this.getAllRules(),
      ...this.getExtensions(),
      ...this.getConditions()
    };
  }

  private getConditions(): RuleBuilderContract<Pick<ConditionalRuleBuilder<TModel, TProperty>, 'when' | 'unless'>> {
    return {
      when: this.when,
      unless: this.unless
    };
  }

  private getExtensions(): RuleBuilderContract<Pick<ExtendedRuleBuilder<TModel, TProperty>, 'withMessage' | 'withName'>> {
    return {
      withMessage: this.withMessage,
      withName: this.withName
    };
  }

  private getCommonRules(): RuleBuilderContract<CommonRuleBuilder<TModel, TProperty>> {
    return {
      isNull: this.isNull,
      notNull: this.notNull,
      equal: this.equal,
      notEqual: this.notEqual,
      must: this.must,
      withCustomRule: this.withCustomRule
    };
  }

  private getStringRules(): RuleBuilderContract<StringRuleBuilder<TModel, StringProperty>> {
    return {
      creditCard: this.creditCard,
      matches: this.matches
    };
  }

  private getNumberRules(): RuleBuilderContract<NumberRuleBuilder<TModel, NumberProperty>> {
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

  private getObjectRules(): RuleBuilderContract<ObjectRuleBuilder<TModel, ObjectProperty>> {
    return {
      setValidator: this.setValidator
    };
  }

  private getLengthRules(): RuleBuilderContract<LengthRuleBuilder<TModel, LengthProperty>> {
    return {
      length: this.length,
      maxLength: this.maxLength,
      minLength: this.minLength,
      empty: this.empty,
      notEmpty: this.notEmpty
    };
  }

  // validator behaviour
  public cascade = (cascadeMode: CascadeMode) => {
    this.validator.cascade(cascadeMode);
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  };

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
  public equal = (referenceValue: TProperty | ((model: TModel) => TProperty | null | undefined)) => {
    this.addRule(new EqualsRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public notEqual = (referenceValue: TProperty | ((model: TModel) => TProperty | null | undefined)) => {
    this.addRule(new NotEqualsRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public must = (predicate: (value: TProperty | null | undefined, model: TModel) => boolean) => {
    this.addRule(new MustRule(predicate));
    return this.getRulesWithExtensionsAndConditions();
  };
  public withCustomRule = (customRule: PropertyRule<TModel, TProperty>) => {
    this.addRule(customRule);
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
  public lessThan = (referenceValue: number | ((model: TModel) => TProperty | null | undefined)) => {
    this.addRule(new LessThanRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public lessThanOrEqualTo = (referenceValue: number | ((model: TModel) => TProperty | null | undefined)) => {
    this.addRule(new LessThanOrEqualToRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public greaterThan = (referenceValue: number | ((model: TModel) => TProperty | null | undefined)) => {
    this.addRule(new GreaterThanRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public greaterThanOrEqualTo = (referenceValue: number | ((model: TModel) => TProperty | null | undefined)) => {
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
