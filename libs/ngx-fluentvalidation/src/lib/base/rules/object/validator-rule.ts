import { AbstractRule } from '../../../core/rules/abstract-rule';
import { Validatable } from '../../../core/validators/validatable';

export class ValidatorRule<T> extends AbstractRule<T> {
  constructor(private readonly validator: Validatable<T>) {
    super('', value => this.validator.validate(value));
  }
}
