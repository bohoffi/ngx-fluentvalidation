import { PropertyRule } from '../property-rule';

export class IsNullRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => value === null, 'Value should be null.');
  }
}
