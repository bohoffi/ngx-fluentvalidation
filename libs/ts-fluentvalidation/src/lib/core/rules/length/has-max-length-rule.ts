import { PropertyRule } from '../property-rule';
import { isLengthProperty } from './guards';

export class HasMaxLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly maxLength: number) {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return !!value && value.length <= this.maxLength;
    }, `Value does not satisfy maximum length of '${maxLength}'.`);
  }
}
