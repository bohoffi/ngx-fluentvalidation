import { PropertyRule } from '../property-rule';

/**
 * Defines an `exclusive between` validation.
 *
 * Validation will fail if the value is not inside the given range - `min/max` are not part of the range.
 * @param options The options specifying the range to check against
 */
export class ExclusiveBetweenRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly options: { min: number; max: number }) {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value > this.options.min && value < this.options.max;
    }, `Value must be greater than '${options.min}' and less than '${options.max}'.`);
  }
}
