import { isCallable } from '../guards';
import { PropertyRule } from '../property-rule';

export class EqualsRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: TProperty | ((model: TModel) => TProperty | null | undefined)) {
    super(
      (value, model) => {
        if (isCallable(this.referenceValue)) {
          return value === this.referenceValue(model);
        }
        return value === this.referenceValue;
      },
      (model: TModel) => `Value should be equal to '${isCallable(referenceValue) ? referenceValue(model) : referenceValue}'.`
    );
  }
}
