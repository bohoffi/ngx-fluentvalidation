export interface Specification<in T> {
  isSatisfiedBy(candidate: T): boolean;
}

export abstract class AbstractSpecification<in T> implements Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;
}

export class ExpressionSpecification<in T> extends AbstractSpecification<T> {
  constructor(private readonly expression: (candidate: T) => boolean) {
    super();
  }
  override isSatisfiedBy(candidate: T): boolean {
    return this.expression(candidate);
  }
}

export class CompositeSpecification<in T> extends AbstractSpecification<T> {
  constructor(private readonly partiallySatisfaction: boolean = true, private readonly specifications: Specification<T>[] = []) {
    super();
  }

  override isSatisfiedBy(candidate: T): boolean {
    return this.partiallySatisfaction
      ? someOf(this.specifications).isSatisfiedBy(candidate)
      : everyOf(this.specifications).isSatisfiedBy(candidate);
  }
}

class NotSpecification<in T> extends AbstractSpecification<T> {
  constructor(private readonly specification: Specification<T>) {
    super();
  }
  override isSatisfiedBy(candidate: T): boolean {
    return this.specification.isSatisfiedBy(candidate) === false;
  }
}

class OrSpecification<in T> extends AbstractSpecification<T> {
  constructor(private readonly specifications: Specification<T>[]) {
    super();
  }
  override isSatisfiedBy(candidate: T): boolean {
    return this.specifications.some(spec => spec.isSatisfiedBy(candidate));
  }
}

class AndSpecification<in T> extends AbstractSpecification<T> {
  constructor(private readonly specifications: Specification<T>[]) {
    super();
  }
  override isSatisfiedBy(candidate: T): boolean {
    return this.specifications.every(spec => spec.isSatisfiedBy(candidate));
  }
}

export const not = <T>(specification: Specification<T>): Specification<T> => {
  return new NotSpecification(specification);
};

export const someOf = <T>(specifications: Specification<T>[]): Specification<T> => {
  return new OrSpecification(specifications);
};

export const everyOf = <T>(specifications: Specification<T>[]): Specification<T> => {
  return new AndSpecification(specifications);
};
