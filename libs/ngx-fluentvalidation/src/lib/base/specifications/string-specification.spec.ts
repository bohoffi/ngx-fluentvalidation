import {
  StringHasMaxLengthSpecification,
  StringHasMinLengthSpecification,
  StringIsEmptySpecification,
  StringIsNotEmptySpecification,
  StringLengthIsInRangeSpecification
} from './string-specification';

describe('StringSpecifications', () => {
  it('StringIsEmptySpecification', () => {
    const spec = new StringIsEmptySpecification();
    expect(spec.isSatisfiedBy('')).toBe(true);
    expect(spec.isSatisfiedBy('ABC')).toBe(false);
  });
  it('StringIsNotEmptySpecification', () => {
    const spec = new StringIsNotEmptySpecification();
    expect(spec.isSatisfiedBy('ABC')).toBe(true);
    expect(spec.isSatisfiedBy('')).toBe(false);
  });
  it('StringHasMinLengthSpecification', () => {
    const spec = new StringHasMinLengthSpecification(3);
    expect(spec.isSatisfiedBy('ABC')).toBe(true);
    expect(spec.isSatisfiedBy('ABCD')).toBe(true);
    expect(spec.isSatisfiedBy('')).toBe(false);
  });
  it('StringHasMaxLengthSpecification', () => {
    const spec = new StringHasMaxLengthSpecification(3);
    expect(spec.isSatisfiedBy('ABC')).toBe(true);
    expect(spec.isSatisfiedBy('')).toBe(true);
    expect(spec.isSatisfiedBy('ABCD')).toBe(false);
  });
  it('StringLengthIsInRangeSpecification', () => {
    const spec = new StringLengthIsInRangeSpecification(3, 5);
    expect(spec.isSatisfiedBy('AB')).toBe(false);
    expect(spec.isSatisfiedBy('ABC')).toBe(true);
    expect(spec.isSatisfiedBy('ABCD')).toBe(true);
    expect(spec.isSatisfiedBy('ABCDE')).toBe(true);
    expect(spec.isSatisfiedBy('ABCDEF')).toBe(false);
  });
});
