import { AbstractRule } from '../../../core/rules/abstract-rule';

export class HasMinLengthRule<T extends { length: number }> extends AbstractRule<T> {
  constructor(private readonly minLength: number) {
    super(`Value does not satisfy minimum length of '${minLength}'`, value => this.validateInternal(value));
  }

  private validateInternal(candidate: T): boolean {
    return candidate.length >= this.minLength;
  }
}
