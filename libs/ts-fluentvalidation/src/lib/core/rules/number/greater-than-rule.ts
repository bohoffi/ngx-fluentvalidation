import { PropertyRule } from '../property-rule';

export class GreaterThanRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: number) {
    super(value => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value > this.referenceValue;
    }, `Value must be greater than '${referenceValue}'.`);
  }
}
