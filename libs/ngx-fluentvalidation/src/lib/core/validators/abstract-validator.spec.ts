import { AbstractValidator } from './abstract-validator';
import { AbstractRule } from '../rules/abstract-rule';

interface TestEntity {
  name: string;
  firstName: string;
  age: number;
  address?: Address;
}

interface Address {
  street: string;
  country: string;
}

class EmptyRuleValidator extends AbstractValidator<TestEntity> {}

class FirstnameNotJonRule extends AbstractRule<string> {
  constructor() {
    super('Firstname should not be Jon', firstname => firstname !== 'Jon');
  }
}

class RuleValidator extends AbstractValidator<TestEntity> {
  constructor() {
    super();
    this.for('firstName').addRule(new FirstnameNotJonRule());
  }
}

describe(AbstractValidator.name, () => {
  it('should return valid when no rules applied', () => {
    const sut: TestEntity = {
      firstName: 'Jon',
      name: 'Doe',
      age: 18
    };

    const result = new EmptyRuleValidator().validate(sut);
    expect(result).toBe(true);
  });

  it('should return invalid when a rule hits', () => {
    const sut: TestEntity = {
      firstName: 'Jon',
      name: 'Doe',
      age: 18
    };

    const result = new RuleValidator().validate(sut);
    expect(result).toBe(false);
  });
});
