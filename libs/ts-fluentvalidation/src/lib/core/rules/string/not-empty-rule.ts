import { PropertyRule } from '../property-rule';

export class NotEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => !!value, 'Value should not be empty.');
  }
}
