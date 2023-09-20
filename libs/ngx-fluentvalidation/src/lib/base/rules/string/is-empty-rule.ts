import { AbstractRule } from '../../../core/rules/abstract-rule';
import { Nullable } from '../../../core/types';

export class IsEmptyRule extends AbstractRule<Nullable<string>> {
  constructor() {
    super('Value should be empty.', value => !value || value === '');
  }
}
