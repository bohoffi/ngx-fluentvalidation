import { ValidationFailure } from './validation-failure';
import { ValidationResult } from './validation-result';

describe(ValidationResult.name, () => {
  it('should return `isValid === true` when failure list is empty', () => {
    const validationResult = ValidationResult.Initial();
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('should return `isValid === false` when failure list is not empty', () => {
    const errorMessages = ['`foo` is not valid', `Value does not satisfy minimum length of '5'`];

    const validationResult = ValidationResult.withFailures(
      errorMessages.map<ValidationFailure>(errorMessage => ({
        attemptedValue: 'foo',
        errorMessage
      }))
    );
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(2);
  });

  it('should join error messages by given separator', () => {
    const errorMessages = ['`foo` is not valid', `Value does not satisfy minimum length of '5'`];

    const validationResult = ValidationResult.withFailures(
      errorMessages.map<ValidationFailure>(errorMessage => ({
        attemptedValue: 'foo',
        errorMessage
      }))
    );

    let joined = validationResult.toString();
    expect(joined).toEqual(errorMessages.join('\n'));
    joined = validationResult.toString(' - ');
    expect(joined).toEqual(errorMessages.join(' - '));
  });

  it('should create a map with messages grouped by property name', () => {
    const validationResult = ValidationResult.withFailures([
      {
        attemptedValue: 'foo',
        errorMessage: 'A not valid',
        propertyName: 'A'
      },
      {
        attemptedValue: 'foo',
        errorMessage: 'A too short',
        propertyName: 'A'
      },
      {
        attemptedValue: 'foo',
        errorMessage: 'B not valid',
        propertyName: 'B'
      },
      {
        attemptedValue: 'foo',
        errorMessage: 'value not valid'
      }
    ]);

    const mapped = validationResult.toMap();
    expect(mapped.size).toEqual(3);
    expect(mapped.has('A')).toBe(true);
    expect(mapped.has('B')).toBe(true);
    expect(mapped.has('UNKNOWN')).toBe(true);
    expect(mapped.has('C')).toBe(false);
    expect(mapped.get('A')?.length).toEqual(2);
    expect(mapped.get('B')?.length).toEqual(1);
    expect(mapped.get('UNKNOWN')?.length).toEqual(1);
    expect(mapped.get('C')?.length).toBeUndefined();
  });
});
