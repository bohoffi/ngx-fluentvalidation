import { PropertyRule } from '../property-rule';
import { isLengthProperty } from '../guards';

/**
 * Defines a `min/max length` validation.
 *
 * Validation will fail if the length of the value is either less then the minLength or greater then maxLength.
 * @param options The options specifying the range to check against
 */
export class HasLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly options: { minLength: number; maxLength: number }) {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return !!value && value.length >= this.options.minLength && value.length <= this.options.maxLength;
    }, `Value does not satisfy minimum length of '${options.minLength}' and/or maximum length of '${options.maxLength}'.`);
  }
}
