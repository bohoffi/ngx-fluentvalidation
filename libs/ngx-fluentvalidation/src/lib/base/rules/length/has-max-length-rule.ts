import { AbstractRule } from '../../../core/rules/abstract-rule';

export class HasMaxLengthRule<T extends { length: number }> extends AbstractRule<T> {
  constructor(private readonly maxLength: number) {
    super(`Value does not satisfy maximum length of '${maxLength}'.`, value => this.validateInternal(value));
  }

  private validateInternal(candidate: T): boolean {
    return candidate.length <= this.maxLength;
  }
}
