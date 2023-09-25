import { PropertyRule } from '../../../core/rules/validation-rule';

export class EqualsRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: TProperty) {
    super(value => value === this.referenceValue, `Value should be equal to '${referenceValue}'.`);
  }
}
