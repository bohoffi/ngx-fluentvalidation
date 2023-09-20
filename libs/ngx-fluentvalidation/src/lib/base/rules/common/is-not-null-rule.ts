import { AbstractRule } from '../../../core/rules/abstract-rule';
import { Nullable } from '../../../core/types';

export class IsNotNullRule<T = unknown> extends AbstractRule<Nullable<T>> {
  constructor() {
    super('Value should not be null.', value => value !== null);
  }
}
