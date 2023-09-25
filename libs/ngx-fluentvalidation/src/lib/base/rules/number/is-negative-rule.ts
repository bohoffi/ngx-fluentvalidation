import { PropertyRule } from '../../../core/rules/validation-rule';

export class IsNegativeRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value < 0;
    }, 'Value must be less than 0.');
  }
}
