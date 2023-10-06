import { isCallable } from '../guards';
import { PropertyRule } from '../property-rule';

/**
 * Defines a `not equal` validation.
 *
 * Validation will fail if the value is equal to the given reference value.
 * @param referenceValue The value to compare against
 */
export class NotEqualsRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: TProperty | ((model: TModel) => TProperty | null | undefined)) {
    super(
      (value, model) => {
        if (isCallable(this.referenceValue)) {
          return value !== this.referenceValue(model);
        }
        return value !== this.referenceValue;
      },
      (model: TModel) => `Value should not be equal to '${isCallable(referenceValue) ? referenceValue(model) : referenceValue}'.`
    );
  }
}
