import { ValidationFailure } from '../../core/result/validation-failure';
import { KeyOf } from '../../core/types';
import { AbstractValidator } from '../../core/validators/abstract-validator';

interface TestType {
  stringProperty: string;
  optionalStringProperty?: string;
  numberProperty: number;
  booleanProperty: boolean;
  optionalBooleanProperty?: boolean;
  optionalNumberProperty?: number;
  objectProperty: TestSubType;
  optionalObjectProperty?: TestSubType;
}

interface TestSubType {
  stringProperty: string;
}

function createTestTypeInstance(overwrites: Partial<TestType> = {}): TestType {
  return {
    stringProperty: 'string',
    numberProperty: 5,
    booleanProperty: true,
    objectProperty: {
      stringProperty: 'nestedString'
    },
    ...overwrites
  };
}

class TestTypeValidator extends AbstractValidator<TestType> {}

function hasErrorsFor(failures: ValidationFailure[], properties: Array<KeyOf<TestType>>): boolean {
  const failureSet = new Set<string>(
    failures.map(failure => failure.propertyName).filter((propName): propName is string => typeof propName === 'string')
  );
  return properties.map(prop => `${prop}`).every(prop => failureSet.has(prop));
}

describe('Rules', () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  describe('common rules', () => {
    it('equals', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').equal('Jon');
      testTypeValidator.for('numberProperty').equal(6);
      testTypeValidator.for('booleanProperty').equal(false);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'numberProperty', 'booleanProperty'])).toBe(true);
    });
  });
});
