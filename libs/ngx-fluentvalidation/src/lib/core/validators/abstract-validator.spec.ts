import { AbstractValidator } from './abstract-validator';

interface TestType {
  stringProperty: string;
  optionalStringProperty?: string;
  numberProperty: number;
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
    objectProperty: {
      stringProperty: 'nestedString'
    },
    ...overwrites
  };
}

class TestTypeValidator extends AbstractValidator<TestType> {}

describe(AbstractValidator.name, () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  it('`validate` should return `true` when no rules applied', () => {
    const sut = createTestTypeInstance();

    const result = testTypeValidator.validate(sut);
    expect(result).toBe(true);
  });

  it('`validate` should return `false` when a rule fails', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    testTypeValidator.for('stringProperty').notEqual('Jon');

    const result = testTypeValidator.validate(sut);
    expect(result).toBe(false);
  });

  it('`result` should contain the errors when a rule fails', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    testTypeValidator.for('stringProperty').notEqual('Jon');

    testTypeValidator.validate(sut);
    const result = testTypeValidator.validationResult;
    expect(result).not.toBeNull();
    expect(result?.errors).toHaveLength(1);
  });

  it('`withErrorMessage` should overwrite rules error message', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    const errorMessage = 'Please choose another forename';
    testTypeValidator.for('stringProperty').notEqual('Jon').withMessage(errorMessage);

    testTypeValidator.validate(sut);
    const result = testTypeValidator.validationResult;
    expect(result?.errors[0].errorMessage).toEqual(errorMessage);
  });

  it('`withPropertyName` should overwrite rules property name', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    const propertyName = 'firstName';
    testTypeValidator.for('stringProperty').notEqual('Jon').withName(propertyName);

    testTypeValidator.validate(sut);
    const result = testTypeValidator.validationResult;
    expect(result?.errors[0].propertyName).toEqual(propertyName);
  });

  it('`when` should  run validation as long as a certain condition is fulfilled', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    testTypeValidator
      .for('stringProperty')
      .equal('Jon')
      .when(model => model.stringProperty.length === 3);
    let result = testTypeValidator.validate(sut);
    expect(result).toBe(true);
    sut.stringProperty = 'Bob';
    result = testTypeValidator.validate(sut);
    expect(result).toBe(false);
  });

  it('`unless` should  run validation validation until a certain condition is fulfilled', () => {
    const sut = createTestTypeInstance({
      stringProperty: 'Jon'
    });

    testTypeValidator
      .for('stringProperty')
      .equal('Jon')
      .unless(model => model.stringProperty.length === 3);
    let result = testTypeValidator.validate(sut);
    expect(result).toBe(true);
    sut.stringProperty = 'Jo';
    result = testTypeValidator.validate(sut);
    expect(result).toBe(false);
  });
});
