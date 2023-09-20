import { AbstractRule } from '../../../core/rules/abstract-rule';
import { Nullable } from '../../../core/types';

export class IsNullRule<T = unknown> extends AbstractRule<Nullable<T>> {
  constructor() {
    super('Value should be null.', value => value === null);
  }
}
