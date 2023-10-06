import { isLengthProperty } from '../guards';
import { PropertyRule } from '../property-rule';

/**
 * Defines an `empty` validation.
 *
 * Validation will fail if the values length is not equal to 0.
 */
export class IsEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed a value which cannot be checked for being empty.');
      }
      return !value || value.length === 0;
    }, 'Value should be empty.');
  }
}
