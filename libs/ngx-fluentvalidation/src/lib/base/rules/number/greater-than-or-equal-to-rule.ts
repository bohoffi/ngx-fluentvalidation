import { PropertyRule } from '../../../core/rules/validation-rule';

export class GreaterThanOrEqualToRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: number) {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value >= this.referenceValue;
    }, `Value must be greater than or equal to '${referenceValue}'.`);
  }
}
