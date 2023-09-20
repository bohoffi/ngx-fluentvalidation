import { AbstractRule } from '../../../core/rules/abstract-rule';

export class PredicateRule<T> extends AbstractRule<T> {
  constructor(private readonly predicate: (value: T) => boolean) {
    super('The specified condition was not met.', value => this.predicate(value));
  }
}
