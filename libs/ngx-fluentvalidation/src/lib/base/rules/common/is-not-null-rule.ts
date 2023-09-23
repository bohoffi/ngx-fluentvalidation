import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsNotNullRule<T> extends AbstractRule<T> {
  constructor() {
    super('Value should not be null.', value => value !== null);
  }
}
