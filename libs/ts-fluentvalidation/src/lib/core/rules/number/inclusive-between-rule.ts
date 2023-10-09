import { comparator } from '../comparator';
import { isNumberProperty, isDateProperty } from '../guards';
import { PropertyRule } from '../property-rule';
import { NumberProperty } from '../rule-builders';

/**
 * Defines an `inclusive between` validation.
 *
 * Validation will fail if the value is not inside the given range - `min/max` are part of the range.
 * @param options The options specifying the range to check against
 */
export class InclusiveBetweenRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(
    private readonly options: {
      min: TProperty extends NumberProperty ? number | bigint : Date;
      max: TProperty extends NumberProperty ? number | bigint : Date;
    }
  ) {
    super(value => {
      if (isNumberProperty(value)) {
        return comparator.inclusiveBetween(value, this.options);
      }
      if (isDateProperty(value)) {
        return comparator.inclusiveBetween(value, this.options);
      }
      return null;
    }, `Value must be greater than or equal to '${options.min}' and less than or equal to '${options.max}'.`);
  }
}
