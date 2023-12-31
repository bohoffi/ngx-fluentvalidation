import { ValidationFailure } from '../lib/core/result/validation-failure';
import { KeyOf } from '../lib/core/types';
import { ModelValidator } from '../lib/core/validators/model-validator';

export interface TestType {
  stringProperty: string;
  stringPropertyTwo: string;
  optionalStringProperty?: string;
  numberProperty: number;
  numberPropertyTwo: number;
  booleanProperty: boolean;
  optionalBooleanProperty?: boolean;
  optionalNumberProperty?: number;
  objectProperty: TestSubType;
  optionalObjectProperty?: TestSubType;
  dateProperty: Date;
  datePropertyTwo: Date;
  nullableString: string | null;
  stringArray: string[];
  numberArray: number[];
}

export interface TestSubType {
  stringProperty: string;
}

export function createTestTypeInstance(overwrites: Partial<TestType> = {}): TestType {
  return {
    stringProperty: 'string',
    stringPropertyTwo: 'string',
    numberProperty: 5,
    numberPropertyTwo: 5,
    booleanProperty: true,
    objectProperty: {
      stringProperty: 'nestedString'
    },
    dateProperty: new Date(2023, 0, 1),
    datePropertyTwo: new Date(2023, 0, 1),
    nullableString: null,
    stringArray: [],
    numberArray: [],
    ...overwrites
  };
}

export class TestTypeValidator extends ModelValidator<TestType> {}

export function hasErrorsFor(failures: ValidationFailure[], properties: Array<KeyOf<TestType>>): boolean {
  const failureSet = new Set<string>(
    failures.map(failure => failure.propertyName).filter((propName): propName is string => typeof propName === 'string')
  );
  return properties.map(prop => `${prop}`).every(prop => failureSet.has(prop));
}
