// import { AbstractSpecification, ExpressionSpecification, Specification, everyOf } from './specification';

// export class CompoundSpecification<in T> extends AbstractSpecification<T> {
//   constructor(private readonly specifications: Specification<T> | Specification<T>[], private readonly condition?: Specification<T>) {
//     super();
//   }
//   isSatisfiedBy(candidate: T): boolean {
//     if (this.condition && this.condition.isSatisfiedBy(candidate) === false) {
//       return true;
//     }
//     return everyOf(Array.isArray(this.specifications) ? this.specifications : [this.specifications]).isSatisfiedBy(candidate);
//   }
// }

// export class SpecificationBuilder<in T> {
//   private specifications: Specification<T>[] = [];
//   private condition?: Specification<T> | ExpressionSpecification<T>;

//   with(specification: Specification<T>): this {
//     this.specifications = this.specifications.concat(specification);
//     return this;
//   }

//   when(condition: Specification<T> | ((candidate: T) => boolean)): this {
//     this.condition = typeof condition === 'function' ? new ExpressionSpecification<T>(condition) : condition;
//     return this;
//   }

//   build(): CompoundSpecification<T> {
//     return new CompoundSpecification(this.specifications, this.condition);
//   }
// }

// export class StringSpecificationBuilder extends SpecificationBuilder<string> {}
