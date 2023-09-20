import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsNegativeRule extends AbstractRule<number> {
  constructor() {
    super('Value has to be less than 0.', value => value < 0);
  }
}
