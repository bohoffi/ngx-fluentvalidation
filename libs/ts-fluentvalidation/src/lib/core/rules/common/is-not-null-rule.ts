import { PropertyRule } from '../property-rule';

export class IsNotNullRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => value !== null, 'Value should not be null.');
  }
}
