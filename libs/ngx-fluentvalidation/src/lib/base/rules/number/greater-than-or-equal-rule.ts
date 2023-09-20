import { AbstractRule } from '../../../core/rules/abstract-rule';

export class GreaterThanOrEqualRule extends AbstractRule<number> {
  constructor(private readonly referenceValue: number) {
    super(`Value must be greater than or equal to '${referenceValue}'`, value => value >= this.referenceValue);
  }
}
