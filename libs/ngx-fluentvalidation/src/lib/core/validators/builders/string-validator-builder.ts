import { HasLengthRule } from '../../../base/rules/length/has-length-rule';
import { HasMaxLengthRule } from '../../../base/rules/length/has-max-length-rule';
import { HasMinLengthRule } from '../../../base/rules/length/has-min-length-rule';
import { CreditCardRule } from '../../../base/rules/string/credit-card-rule';
import { StringIsEmptyRule } from '../../../base/rules/string/is-empty-rule';
import { StringNotEmptyRule } from '../../../base/rules/string/not-empty-rule';
import { RegexpRule } from '../../../base/rules/string/regexp-rule';
import { CommonValidatorBuilder } from './common-validator-builder';

export class StringValidatorBuilder extends CommonValidatorBuilder<string> {
  isEmpty(): this {
    this.addRule(new StringIsEmptyRule());
    return this;
  }

  notEmpty(): this {
    this.addRule(new StringNotEmptyRule());
    return this;
  }

  minLength(minLength: number): this {
    this.addRule(new HasMinLengthRule(minLength));
    return this;
  }

  maxLength(maxLength: number): this {
    this.addRule(new HasMaxLengthRule(maxLength));
    return this;
  }

  hasLength(options: { minLength: number; maxLength: number }): this {
    this.addRule(new HasLengthRule(options));
    return this;
  }

  creditCard(): this {
    this.addRule(new CreditCardRule());
    return this;
  }

  regexp(regexp: RegExp): this {
    this.addRule(new RegexpRule(regexp));
    return this;
  }
}
