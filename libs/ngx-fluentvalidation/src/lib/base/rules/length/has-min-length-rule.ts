import { PropertyRule } from '../../../core/rules/validation-rule';
import { hasLength } from './guards';

export class HasMinLengthRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly minLength: number) {
    super(value => {
      if (!hasLength(value)) {
        throw new TypeError('Passed non-length value to a length rule.');
      }
      return value.length >= this.minLength;
    }, `Value does not satisfy minimum length of '${minLength}'.`);
  }
}
