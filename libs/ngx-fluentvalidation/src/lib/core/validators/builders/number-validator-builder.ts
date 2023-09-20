import { IsNegativeRule } from '../../../base/rules/number/is-negative-rule';
import { IsPositiveRule } from '../../../base/rules/number/is-positive-rule';
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
}
