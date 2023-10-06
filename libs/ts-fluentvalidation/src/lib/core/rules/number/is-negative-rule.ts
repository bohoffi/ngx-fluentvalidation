import { PropertyRule } from '../property-rule';

/**
 * Defines a `is negative` validation.
 *
 * Validation will fail if the value greater than `-1`.
 */
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
