type KeyOf<T> = Extract<keyof T, string> & string;

// Define validation failure
interface ValidationFailure<T> {
  propertyName?: string;
  errorMessage: string;
  attemptedValue: T;
}

// Define validation result
interface ValidationResult<T> {
  failures: ValidationFailure<T>[];
}

// Define a generic Validator interface
interface Validator<T> {
  validate(value: T): boolean;
}

// Define a Rule interface that extends Validator
interface Rule<T> extends Validator<T> {
  errorMessage: string;
  validationFailure: ValidationFailure<T> | null;
  withPropertyName(propertyName: string): this;
}

// Create a basic implementation of a Rule
class BasicRule<T> implements Rule<T> {
  validationFailure: ValidationFailure<T> | null = null;

  constructor(public readonly errorMessage: string, private readonly condition: (value: T) => boolean, private propertyName?: string) {}

  withPropertyName(propertyName: string): this {
    this.propertyName = propertyName;
    return this;
  }

  validate(value: T): boolean {
    const result = this.condition(value);
    this.validationFailure = result
      ? null
      : {
          attemptedValue: value,
          errorMessage: this.errorMessage,
          propertyName: this.propertyName
        };
    return result;
  }
}

abstract class AbstractValidator<T> implements Validator<T> {
  protected rules: Rule<T>[] = [];
  protected propertyValidators: PropertyValidator[] = [];
  protected result: ValidationResult<T> | null = null;

  public get validationResult(): ValidationResult<T> | null {
    return this.result;
  }

  addRule(rule: Rule<T>): this {
    this.rules = this.rules.concat(rule);
    return this;
  }

  for<K extends KeyOf<T>>(propertyName: K): PropertyValidator<T[K]> {
    const propertyValidator = PropertyValidator.forProperty<T, T[K]>(propertyName);
    this.propertyValidators = this.propertyValidators.concat(propertyValidator);
    return propertyValidator;
  }

  validate(value: T): boolean {
    const ruleResult = this.rules.map(r => r.validate(value)).every(r => r);
    const propValResult = this.propertyValidators.map(pv => pv.validate(value[pv.propertyName as KeyOf<T>])).every(r => r);
    const result = ruleResult && propValResult;
    this.result = result
      ? null
      : {
          // TODO include property validator failures
          failures: this.rules.map(r => r.validationFailure).filter((f): f is ValidationFailure<T> => f !== null)
        };
    return result;
  }
}

class PropertyValidator<TProperty = unknown> extends AbstractValidator<TProperty> {
  public get validationFailure(): ValidationFailure<TProperty> | null {
    return this.validationResult?.failures?.length ? this.validationResult.failures.slice(0, 1)[0] : null;
  }

  static forProperty<T, TProperty>(propertyName: KeyOf<T>): PropertyValidator<TProperty> {
    return new PropertyValidator<TProperty>(propertyName);
  }

  protected constructor(public readonly propertyName: string) {
    super();
  }
}

interface TestEntity {
  name: string;
  age: number;
  verified: boolean;
}

class TestEntityValidator extends AbstractValidator<TestEntity> {
  constructor() {
    super();
    this.for('name').addRule(new BasicRule('Name has to have at least 3 chars', name => name.length >= 3));
    this.for('age').addRule(new BasicRule('Age has to by at least 3', age => age >= 3));
    this.addRule(new BasicRule('Verified has to be set true', x => x.verified === true, 'verified'));
  }
}

const validator = new TestEntityValidator();
const sut: TestEntity = {
  age: 2,
  name: 'Jo',
  verified: false
};
validator.validate(sut);
console.log('result', validator.validationResult);
