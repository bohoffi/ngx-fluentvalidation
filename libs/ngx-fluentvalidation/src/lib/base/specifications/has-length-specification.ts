import { AbstractSpecification, CompositeSpecification, Specification } from '../../core/specifications/specification';

export class HasLengthSpecification<in T extends { length: number }> extends AbstractSpecification<T> {
  private readonly minLengthSpec: Specification<T>;
  private readonly maxLengthSpec: Specification<T>;

  constructor(options: { minLength?: number; maxLength?: number }) {
    super();
    this.minLengthSpec = {
      isSatisfiedBy(candidate) {
        return options.minLength === undefined ? true : candidate?.length >= (options.minLength as number);
      }
    };
    this.maxLengthSpec = {
      isSatisfiedBy(candidate) {
        return options.maxLength === undefined ? true : candidate?.length <= (options.maxLength as number);
      }
    };
  }
  override isSatisfiedBy(candidate: T): boolean {
    return new CompositeSpecification(false, [this.minLengthSpec, this.maxLengthSpec]).isSatisfiedBy(candidate);
  }
}
