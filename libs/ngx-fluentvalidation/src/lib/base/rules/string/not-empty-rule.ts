import { AbstractRule } from '../../../core/rules/abstract-rule';

export class NotEmptyRule<T> extends AbstractRule<T> {
  constructor() {
    super('Value should not be empty.', value => !!value);
  }
}
