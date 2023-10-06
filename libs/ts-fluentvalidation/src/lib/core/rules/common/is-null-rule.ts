import { PropertyRule } from '../property-rule';

/**
 * Defines a `null` validation.
 *
 * Validation will fail if the value is not null.
 */
export class IsNullRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => value === null, 'Value should be null.');
  }
}
