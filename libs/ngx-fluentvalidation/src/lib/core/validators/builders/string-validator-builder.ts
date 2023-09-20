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

  creditCard(): this {
    this.addRule(new CreditCardRule());
    return this;
  }

  regexp(regexp: RegExp): this {
    this.addRule(new RegexpRule(regexp));
    return this;
  }
}
