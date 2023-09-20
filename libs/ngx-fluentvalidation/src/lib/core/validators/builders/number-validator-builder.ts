import { ExclusiveBetweenRule } from '../../../base/rules/number/exclusive-between-rule';
import { GreaterThanOrEqualRule } from '../../../base/rules/number/greater-than-or-equal-rule';
import { GreaterThanRule } from '../../../base/rules/number/greater-than-rule';
import { InclusiveBetweenRule } from '../../../base/rules/number/inclusive-between-rule';
import { IsNegativeRule } from '../../../base/rules/number/is-negative-rule';
import { IsPositiveRule } from '../../../base/rules/number/is-positive-rule';
import { LessThanOrEqualRule } from '../../../base/rules/number/less-than-or-equal-rule';
import { LessThanRule } from '../../../base/rules/number/less-than-rule';
import { CommonValidatorBuilder } from './common-validator-builder';

export class NumberValidatorBuilder extends CommonValidatorBuilder<number> {
  isPositive(): this {
    this.addRule(new IsPositiveRule());
    return this;
  }

  isNegative(): this {
    this.addRule(new IsNegativeRule());
    return this;
  }

  lessThan(referenceValue: number): this {
    this.addRule(new LessThanRule(referenceValue));
    return this;
  }

  lessThanOrEqual(referenceValue: number): this {
    this.addRule(new LessThanOrEqualRule(referenceValue));
    return this;
  }

  greaterThan(referenceValue: number): this {
    this.addRule(new GreaterThanRule(referenceValue));
    return this;
  }

  greaterThanOrEqual(referenceValue: number): this {
    this.addRule(new GreaterThanOrEqualRule(referenceValue));
    return this;
  }

  between(options: { min: number; max: number }, inclusive = false): this {
    this.addRule(inclusive ? new InclusiveBetweenRule(options) : new ExclusiveBetweenRule(options));
    return this;
  }
}
