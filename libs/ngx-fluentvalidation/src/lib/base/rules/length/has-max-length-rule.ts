import { PropertyRule } from '../../../core/rules/validation-rule';
import { hasLength } from './guards';

export class HasMaxLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly maxLength: number) {
    super(value => {
      if (!hasLength(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return value.length <= this.maxLength;
    }, `Value does not satisfy maximum length of '${maxLength}'.`);
  }
}
