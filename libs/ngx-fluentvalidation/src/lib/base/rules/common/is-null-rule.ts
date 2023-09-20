import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsNullRule<T = unknown> extends AbstractRule<T> {
  constructor() {
    super('Value should be null', value => value === null);
  }
}
