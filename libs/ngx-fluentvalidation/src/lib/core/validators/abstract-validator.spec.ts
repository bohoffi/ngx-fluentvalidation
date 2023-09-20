import { AbstractValidator } from './abstract-validator';

interface Person {
  surname: string;
  forename: string;
  address?: Address;
}

interface Address {
  line1: string;
  line2: string;
}

class TestValidator extends AbstractValidator<Person> {}

describe(AbstractValidator.name, () => {
  let testValidator: TestValidator;

  beforeEach(() => {
    testValidator = new TestValidator();
  });

  it('`validate` should return `true` when no rules applied', () => {
    const sut: Person = {
      forename: 'Jon',
      surname: 'Doe'
    };

    const result = testValidator.validate(sut);
    expect(result).toBe(true);
  });

  it('`validate` should return `false` when a rule fails', () => {
    const sut: Person = {
      forename: 'Jon',
      surname: 'Doe'
    };

    testValidator.forString('forename').notEquals('Jon');

    const result = testValidator.validate(sut);
    expect(result).toBe(false);
  });

  it('`result` should contain the errors when a rule fails', () => {
    const sut: Person = {
      forename: 'Jon',
      surname: 'Doe'
    };

    testValidator.forString('forename').notEquals('Jon');

    testValidator.validate(sut);
    const result = testValidator.validationResult;
    expect(result).not.toBeNull();
    expect(result?.errors).toHaveLength(1);
  });

  it('`withErrorMessage` should overwrite rules error message', () => {
    const sut: Person = {
      forename: 'Jon',
      surname: 'Doe'
    };

    const errorMessage = 'Please choose another forename';
    testValidator.forString('forename').notEquals('Jon').withErrorMessage(errorMessage);

    testValidator.validate(sut);
    const result = testValidator.validationResult;
    expect(result?.errors[0].errorMessage).toEqual(errorMessage);
  });

  it('`withPropertyName` should overwrite rules property name', () => {
    const sut: Person = {
      forename: 'Jon',
      surname: 'Doe'
    };

    const propertyName = 'firstName';
    testValidator.forString('forename').notEquals('Jon').withPropertyName(propertyName);

    testValidator.validate(sut);
    const result = testValidator.validationResult;
    expect(result?.errors[0].propertyName).toEqual(propertyName);
  });
});
