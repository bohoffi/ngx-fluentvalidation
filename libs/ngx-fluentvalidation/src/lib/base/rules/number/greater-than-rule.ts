import { AbstractRule } from '../../../core/rules/abstract-rule';

export class GreaterThanRule extends AbstractRule<number> {
  constructor(private readonly referenceValue: number) {
    super(`Value must be greater than '${referenceValue}'`, value => value > this.referenceValue);
  }
}
