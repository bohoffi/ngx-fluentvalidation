import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsNegativeRule extends AbstractRule<number> {
  constructor() {
    super('Value must be less than 0.', value => value < 0);
  }
}
