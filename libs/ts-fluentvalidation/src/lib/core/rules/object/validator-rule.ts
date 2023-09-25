import { IValidator } from '../../validators/interfaces';
import { PropertyRule } from '../property-rule';

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
