import { PropertyRule } from '../../../core/rules/validation-rule';

export class IsPositiveRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Non-number value is not allowed here.');
      }
      return value > 0;
    }, 'Value must be greater than 0.');
  }
}
