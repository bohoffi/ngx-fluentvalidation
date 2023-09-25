import { PropertyRule } from '../property-rule';

export class IsEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => !value || value === '', 'Value should be empty.');
  }
}
