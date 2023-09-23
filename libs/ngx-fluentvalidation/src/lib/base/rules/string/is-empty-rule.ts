import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsEmptyRule<T> extends AbstractRule<T> {
  constructor() {
    super('Value should be empty.', value => !value || value === '');
  }
}
