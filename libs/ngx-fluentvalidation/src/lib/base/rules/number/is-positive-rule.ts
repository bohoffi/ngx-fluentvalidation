import { AbstractRule } from '../../../core/rules/abstract-rule';

export class IsPositiveRule<T> extends AbstractRule<T> {
  constructor() {
    super('Value must be greater than 0.', value => {
      if (typeof value !== 'number') {
        throw new TypeError('Non-number value is not allowed here.');
      }
      return value > 0;
    });
  }
}
