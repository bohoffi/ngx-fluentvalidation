import { IValidator } from '../../validators/interfaces';
import { PropertyRule } from '../property-rule';

/**
 * Defines a validation against a specific validator.
 *
 * Validation will fail if the given validator fails.
 * @param validator Specific validator to perform validations on the value.
 */
export class ValidatorRule<TModel, TProperty> extends PropertyRule<TModel, TProperty> {
  constructor(private readonly validator: IValidator<TProperty>) {
    super(value => {
      if (value === null || value === undefined) {
        return null;
      }
      return this.validator.validate(value);
    }, '');
  }
}
