import { hasNoValue, isCallable, isNumberProperty } from '../guards';
import { PropertyRule } from '../property-rule';

/**
 * Defines a `greater than` validation.
 *
 * Validation will fail if the value is equal to or less than the given reference value.
 * @param referenceValue The value to compare against
 */
export class GreaterThanRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: number | ((model: TModel) => TProperty | null | undefined)) {
    super(
      (value, model) => {
        if (!isNumberProperty(value)) {
          throw new TypeError('Passed a non-numeric value to a numeric rule.');
        }
        if (isCallable(this.referenceValue)) {
          const referenceValue = this.referenceValue(model);
          if (!hasNoValue(value) && isNumberProperty(referenceValue) && !hasNoValue(referenceValue)) {
            return value > referenceValue;
          }
        }
        if (!hasNoValue(value) && !hasNoValue(referenceValue) && !isCallable(this.referenceValue)) {
          return value > this.referenceValue;
        }
        return null;
      },
      (model: TModel) => `Value must be greater than '${isCallable(referenceValue) ? referenceValue(model) : referenceValue}'.`
    );
  }
}
