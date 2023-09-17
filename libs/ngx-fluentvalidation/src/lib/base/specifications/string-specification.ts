import { AbstractSpecification, not } from '../../core/specifications/specification';
import { HasLengthSpecification } from './has-length-specification';
import { IsEmptySpecification } from './is-empty-specification';

export class StringIsEmptySpecification extends AbstractSpecification<string> implements IsEmptySpecification<string> {
  isEmpty(candidate: string): boolean {
    return candidate === '';
  }
  override isSatisfiedBy(candidate: string): boolean {
    return this.isEmpty(candidate);
  }
}

export class StringIsNotEmptySpecification extends AbstractSpecification<string> {
  override isSatisfiedBy(candidate: string): boolean {
    return not(new StringIsEmptySpecification()).isSatisfiedBy(candidate);
  }
}

export class StringHasMinLengthSpecification extends HasLengthSpecification<string> {
  constructor(minLength: number) {
    super({ minLength });
  }
}

export class StringHasMaxLengthSpecification extends HasLengthSpecification<string> {
  constructor(maxLength: number) {
    super({ maxLength });
  }
}

// TODO option for including/excluding thresholds
export class StringLengthIsInRangeSpecification extends HasLengthSpecification<string> {
  constructor(minLength: number, maxLength: number) {
    super({ minLength, maxLength });
  }
}
