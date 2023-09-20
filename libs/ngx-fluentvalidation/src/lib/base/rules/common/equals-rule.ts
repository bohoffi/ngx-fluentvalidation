import { AbstractRule } from '../../../core/rules/abstract-rule';

export class EqualsRule<T> extends AbstractRule<T> {
  constructor(private readonly referenceValue: T) {
    super(`Value should be equal to '${referenceValue}'.`, value => value === this.referenceValue);
  }
}
