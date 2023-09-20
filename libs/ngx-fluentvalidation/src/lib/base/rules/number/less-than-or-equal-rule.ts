import { AbstractRule } from '../../../core/rules/abstract-rule';

export class LessThanOrEqualRule extends AbstractRule<number> {
  constructor(private readonly referenceValue: number) {
    super(`Value must be less than or equal to'${referenceValue}'`, value => value <= this.referenceValue);
  }
}
