import { comparator } from '../comparator';
import { isCallable, isDateProperty, isNumberProperty } from '../guards';
import { PropertyRule } from '../property-rule';
import { NumberProperty, DateProperty } from '../rule-builders';

/**
 * Defines a `greater than` validation.
 *
 * Validation will fail if the value is equal to or less than the given reference value.
 * @param referenceValue The value to compare against
 */
export class GreaterThanRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: TProperty | ((model: TModel) => TProperty | null | undefined)) {
    super(
      (value, model) => {
        if (isNumberProperty(value) && (isNumberProperty(this.referenceValue) || isCallable<NumberProperty>(this.referenceValue))) {
          return comparator.greaterThan(value, isCallable(this.referenceValue) ? this.referenceValue(model) : this.referenceValue);
        }
        if (isDateProperty(value) && (isDateProperty(this.referenceValue) || isCallable<DateProperty>(this.referenceValue))) {
          return comparator.greaterThan(value, isCallable(this.referenceValue) ? this.referenceValue(model) : this.referenceValue);
        }
        return null;
      },
      (model: TModel) => `Value must be greater than '${isCallable(referenceValue) ? referenceValue(model) : referenceValue}'.`
    );
  }
}
