import { AbstractRule } from '../../../core/rules/abstract-rule';
import { Nullable } from '../../../core/types';

export class NotEmptyRule extends AbstractRule<Nullable<string>> {
  constructor() {
    super('Value should not be empty.', value => !!value && value !== '');
  }
}
