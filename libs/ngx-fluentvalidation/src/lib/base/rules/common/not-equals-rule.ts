import { AbstractRule } from '../../../core/rules/abstract-rule';

export class NotEqualsRule<T> extends AbstractRule<T> {
  constructor(private readonly referenceValue: T) {
    super(`Value should not be equal to '${referenceValue}'.`, value => value !== this.referenceValue);
  }
}
