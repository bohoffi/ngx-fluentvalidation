import { PropertyRule } from '../property-rule';
import { isLengthProperty } from '../guards';

/**
 * Defines a 'min length' validation.
 *
 * Validation will fail if the length of the value is less than the given minLength.
 * @param maxLength The minimum length to check against
 */
export class HasMinLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly minLength: number) {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return !!value && value.length >= this.minLength;
    }, `Value does not satisfy minimum length of '${minLength}'.`);
  }
}
