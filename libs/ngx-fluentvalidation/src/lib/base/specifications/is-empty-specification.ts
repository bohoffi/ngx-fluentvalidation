import { Specification } from '../core/specifications/specification';

export interface IsEmptySpecification<in T> extends Specification<T> {
  isEmpty(candidate: T): boolean;
}
