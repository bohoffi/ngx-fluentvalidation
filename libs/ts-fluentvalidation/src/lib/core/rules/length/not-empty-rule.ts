import { isLengthProperty } from '../guards';
import { PropertyRule } from '../property-rule';

/**
 * Defines a `not empty` validation.
 *
 * Validation will fail if the values length is equal to 0.
 */
export class NotEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed a value which cannot be checked for being empty.');
      }
      return !!value && value.length > 0;
    }, 'Value should not be empty.');
  }
}
