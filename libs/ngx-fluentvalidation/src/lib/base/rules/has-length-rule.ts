import { AbstractRule } from '../../core/rules/abstract-rule';
import { HasLengthSpecification } from '../specifications/has-length-specification';

export class HasLengthRule<T extends { length: number }> extends AbstractRule<T> {
  private readonly hasLengthSpec: HasLengthSpecification<T>;

  constructor(options: { minLength: number; maxLength: number }) {
    super('Value does not satisfy length constraints', value => this.validateInternal(value));
    this.hasLengthSpec = new HasLengthSpecification(options);
  }

  private validateInternal(candidate: T): boolean {
    return this.hasLengthSpec.isSatisfiedBy(candidate);
  }
}
