import { PropertyRule } from '../../../core/rules/validation-rule';

export class IsNullRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => value === null, 'Value should be null.');
  }
}
