import { PropertyRule } from '../property-rule';

/**
 * Defines a `not null` validation.
 *
 * Validation will fail if the value is null.
 */
export class IsNotNullRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor() {
    super(value => value !== null, 'Value should not be null.');
  }
}
