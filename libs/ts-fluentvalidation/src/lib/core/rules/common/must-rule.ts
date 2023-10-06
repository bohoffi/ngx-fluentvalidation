import { PropertyRule } from '../property-rule';

/**
 * Defines a predicate validation.
 *
 * Validation will fail if the value does not meet the given condition.
 * @param predicate Condition to check against
 */
export class MustRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly predicate: (value: TProperty | null | undefined, model: TModel) => boolean) {
    super((value, model) => this.predicate(value, model), 'The specified condition was not met');
  }
}
