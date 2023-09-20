import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsPositiveRule extends AbstractRule<number> {
  constructor() {
    super('Value must be greater than 0.', value => value > 0);
  }
}
