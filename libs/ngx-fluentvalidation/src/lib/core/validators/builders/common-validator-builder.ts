import { EqualsRule } from '../../../base/rules/common/equals-rule';
import { NotEqualsRule } from '../../../base/rules/common/not-equals-rule';
import { IsNotNullRule } from '../../../base/rules/common/is-not-null-rule';
import { Rule } from '../../rules/rule';
import { Validator } from '../validator';
import { IsNullRule } from '../../../base/rules/common/is-null-rule';
import { PredicateRule } from '../../../base/rules/common/predicate-rule';

function hasPropertyName(value?: unknown): value is { propertyName: string } {
  return !!value && typeof value === 'object' && 'propertyName' in value;
}

export class CommonValidatorBuilder<T = unknown> {
  private lastRule: Rule<T> | null = null;

  constructor(protected readonly validator: Validator<T>) {}

  isNull(): this {
    this.addRule(new IsNullRule<T>());
    return this;
  }

  notNull(): this {
    this.addRule(new IsNotNullRule<T>());
    return this;
  }

  equals(referenceValue: T) {
    this.addRule(new EqualsRule(referenceValue));
    return this;
  }

  notEquals(referenceValue: T): this {
    this.addRule(new NotEqualsRule(referenceValue));
    return this;
  }

  must(predicate: (value: T) => boolean): this {
    this.addRule(new PredicateRule(predicate));
    return this;
  }

  /**
   * Overwrites the last rules error message.
   */
  withErrorMessage(errorMessage: string): this {
    if (this.lastRule !== null) {
      this.lastRule.errorMessage = errorMessage;
    }
    return this;
  }

  /**
   * Overwrites the last rules property name.
   */
  withPropertyName(propertyName: string): this {
    if (this.lastRule !== null) {
      this.lastRule.withPropertyName(propertyName);
    }
    return this;
  }

  protected addRule(rule: Rule<T>): void {
    this.lastRule = rule;
    if (hasPropertyName(this.validator)) {
      this.validator.addRule(rule, this.validator.propertyName);
    } else {
      this.validator.addRule(rule);
    }
  }
}
