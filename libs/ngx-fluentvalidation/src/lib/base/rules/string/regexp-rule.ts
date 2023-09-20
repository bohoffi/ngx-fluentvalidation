import { AbstractRule } from '../../../core/rules/abstract-rule';

export class RegexpRule extends AbstractRule<string> {
  constructor(private readonly regexp: RegExp) {
    super('Value is not in the correct format.', value => this.regexp.test(value));
  }
}
