import { PropertyRule } from '../../../core/rules/validation-rule';

export class NotEqualsRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: TProperty) {
    super(value => value !== this.referenceValue, `Value should not be equal to '${referenceValue}'.`);
  }
}
