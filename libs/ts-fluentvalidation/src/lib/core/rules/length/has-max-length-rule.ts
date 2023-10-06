import { PropertyRule } from '../property-rule';
import { isLengthProperty } from '../guards';

/**
 * Defines a 'max length' validation.
 *
 * Validation will fail if the length of the value is greater than the given maxLength.
 * @param maxLength The maximum length to check against
 */
export class HasMaxLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly maxLength: number) {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return !!value && value.length <= this.maxLength;
    }, `Value does not satisfy maximum length of '${maxLength}'.`);
  }
}
