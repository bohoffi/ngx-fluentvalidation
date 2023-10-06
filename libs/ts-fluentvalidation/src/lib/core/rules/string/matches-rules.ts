import { PropertyRule } from '../property-rule';

/**
 * Defines a regular expression validation.
 *
 * Validation will fail if the given regular expression tests negative against the value.
 * @param regExp Regular expression to test against the value
 */
export class MatchesRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly regexp: RegExp) {
    super(value => {
      if (typeof value !== 'string') {
        return null;
      }
      return this.regexp.test(value);
    }, 'Value is not in the correct format.');
  }
}
