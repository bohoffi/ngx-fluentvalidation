import { AbstractRule } from '../../../core/rules/abstract-rule';

export class LessThanRule extends AbstractRule<number> {
  constructor(private readonly referenceValue: number) {
    super(`Value must be less than '${referenceValue}'.`, value => value < this.referenceValue);
  }
}
