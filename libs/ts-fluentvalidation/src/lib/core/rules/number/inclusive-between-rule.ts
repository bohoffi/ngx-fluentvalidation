import { PropertyRule } from '../property-rule';

/**
 * Defines an `inclusive between` validation.
 *
 * Validation will fail if the value is not inside the given range - `min/max` are part of the range.
 * @param options The options specifying the range to check against
 */
export class InclusiveBetweenRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly options: { min: number; max: number }) {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value >= this.options.min && value <= this.options.max;
    }, `Value must be greater than or equal to '${options.min}' and less than or equal to '${options.max}'.`);
  }
}
