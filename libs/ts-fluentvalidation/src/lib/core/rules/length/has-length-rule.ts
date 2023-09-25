import { PropertyRule } from '../property-rule';
import { hasLength } from './guards';

export class HasLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly options: { minLength: number; maxLength: number }) {
    super(value => {
      if (!hasLength(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return value.length >= this.options.minLength && value.length <= this.options.maxLength;
    }, `Value does not satisfy minimum length of '${options.minLength}' and/or maximum length of '${options.maxLength}'.`);
  }
}
