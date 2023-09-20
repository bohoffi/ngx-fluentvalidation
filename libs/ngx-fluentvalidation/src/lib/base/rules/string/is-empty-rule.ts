import { AbstractRule } from '../../../core/rules/abstract-rule';

export class StringIsEmptyRule extends AbstractRule<string> {
  constructor() {
    super('Value should not be empty', value => !!value && value !== '');
  }
}
