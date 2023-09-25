import { PropertyRule } from '../../../core/rules/validation-rule';

export class LessThanRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly referenceValue: number) {
    super((value: TProperty | null | undefined) => {
      if (typeof value !== 'number') {
        throw new TypeError('Passed a non-numeric value to a numeric rule.');
      }
      return value < this.referenceValue;
    }, `Value must be less than '${referenceValue}'.`);
  }
}
