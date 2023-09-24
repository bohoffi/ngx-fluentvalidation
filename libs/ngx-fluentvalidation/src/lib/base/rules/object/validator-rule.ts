import { PropertyRule } from '../../../core/rules/validation-rule';
import { IValidator } from '../../../core/validators/interfaces';

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
