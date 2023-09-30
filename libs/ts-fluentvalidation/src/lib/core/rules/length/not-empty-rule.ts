import { isLengthProperty } from '../length/guards';
import { PropertyRule } from '../property-rule';

export class NotEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => {
      if (!isLengthProperty(value)) {
        throw new TypeError('Passed a value which cannot be checked for being empty.');
      }
      return !!value && value.length > 0;
    }, 'Value should not be empty.');
  }
}
