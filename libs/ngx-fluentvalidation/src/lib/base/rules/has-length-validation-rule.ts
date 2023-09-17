import { AbstractValidationRule } from '../../core/rules/validation-rule';
import { HasLengthSpecification } from '../specifications/has-length-specification';

export class HasLengthValidationRule<T extends { length: number }> extends AbstractValidationRule<T> {
  override get errorMessage(): string {
    throw new Error('Method not implemented.');
  }

  private readonly hasLengthSpec: HasLengthSpecification<T>;

  constructor(options: { minLength: number; maxLength: number }) {
    super();
    this.hasLengthSpec = new HasLengthSpecification(options);
  }

  protected override validateInternal(candidate: T): boolean {
    return this.hasLengthSpec.isSatisfiedBy(candidate);
  }
}
