import { PropertyRule } from '../../../core/rules/validation-rule';

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
