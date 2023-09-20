import { AbstractRule } from '../../../core/rules/abstract-rule';

export class HasLengthRule<T extends { length: number }> extends AbstractRule<T> {
  constructor(private readonly options: { minLength: number; maxLength: number }) {
    super(`Value does not satisfy minimum length of '${options.minLength}' and/or maximum length of '${options.maxLength}'.`, value =>
      this.validateInternal(value)
    );
  }

  private validateInternal(candidate: T): boolean {
    return candidate.length >= this.options.minLength && candidate.length <= this.options.maxLength;
  }
}
