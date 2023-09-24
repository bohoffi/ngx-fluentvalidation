import { PropertyRule } from '../../../core/rules/validation-rule';

export class NotEmptyRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => !!value, 'Value should not be empty.');
  }
}
