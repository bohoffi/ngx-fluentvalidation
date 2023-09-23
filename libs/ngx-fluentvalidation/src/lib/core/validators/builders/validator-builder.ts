import { EqualsRule } from '../../../base/rules/common/equals-rule';
import { IsNotNullRule } from '../../../base/rules/common/is-not-null-rule';
import { IsNullRule } from '../../../base/rules/common/is-null-rule';
import { NotEqualsRule } from '../../../base/rules/common/not-equals-rule';
import { IsPositiveRule } from '../../../base/rules/number/is-positive-rule';
import { NotEmptyRule } from '../../../base/rules/string/not-empty-rule';
import { Rule } from '../../rules/rule';
import { Validator } from '../validator';

function hasPropertyName(value?: unknown): value is { propertyName: string } {
  return !!value && typeof value === 'object' && 'propertyName' in value;
}
abstract class AbstractValidatorBuilder<TModel, TProperty> {
  private lastRule: Rule<TProperty> | null = null;

  constructor(private readonly validator: Validator<TProperty>) {}

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
    if (this.lastRule) {
      this.lastRule.errorMessage = message;
    }
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  };

  public withName = (propertyName: string) => {
    if (this.lastRule) {
      this.lastRule.withPropertyName(propertyName);
    }
    return {
      ...this.getAllRules(),
      when: this.when,
      unless: this.unless
    };
  };

  // conditions
  public when = (condition: (model: TModel) => boolean) => {
    // TODO update interface
    // this.validator.when(condition);
    return this.getAllRules();
  };
  public unless = (condition: (model: TModel) => boolean) => {
    // TODO update interface
    // this.validator.unless(condition);
    return this.getAllRules();
  };

  // common rules
  public isNull = () => {
    this.addRule(new IsNullRule<TProperty>());
    return this.getRulesWithExtensionsAndConditions();
  };
  public notNull = () => {
    this.addRule(new IsNotNullRule<TProperty>());
    return this.getRulesWithExtensionsAndConditions();
  };
  public equal = (referenceValue: TProperty) => {
    this.addRule(new EqualsRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
  public notEqual = (referenceValue: TProperty) => {
    this.addRule(new NotEqualsRule(referenceValue));
    return this.getRulesWithExtensionsAndConditions();
  };
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

  // object rules
  public setValidator = () => {
    // TODO figure out
    return this.getRulesWithExtensionsAndConditions();
  };

  public addRule(rule: Rule<TProperty>): void {
    this.lastRule = rule;
    if (hasPropertyName(this.validator)) {
      this.validator.addRule(rule, this.validator.propertyName);
    } else {
      this.validator.addRule(rule);
    }
  }
}

export class ValidationBuilder<TModel, TProperty> extends AbstractValidatorBuilder<TModel, TProperty> {
  public override getAllRules() {
    return {
      ...this.getTypeRules()
    };
  }
}
