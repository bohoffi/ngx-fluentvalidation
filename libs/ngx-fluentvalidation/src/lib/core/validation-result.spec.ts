import { ValidationFailure } from './validation-failure';
import { ValidationResult } from './validation-result';

const structuredCloneMock = jest.fn((toClone) => JSON.parse(JSON.stringify(toClone)));
global.structuredClone = structuredCloneMock;

describe('ValidationResult', () => {
  it('should handle the list of ValidationFailure as immutable', () => {
    const failures: ValidationFailure[] = [
      {
        propertyName: 'Prop_A',
        errorMessage: "'Prop_A' is a required field"
      },
      {
        propertyName: 'Prop_B',
        errorMessage: "'Prop_B' is a required field"
      }
    ];
    const sut = new ValidationResult(failures);

    expect(sut.errors).toContainEqual(failures.at(0));
    expect(sut.errors).toContainEqual(failures.at(1));

    failures[0].errorMessage = "'Prop_A' contains unsupported characters";

    expect(sut.errors).not.toContainEqual(failures.at(0));
    expect(sut.errors).toContainEqual(failures.at(1));
  });

  it('should construct the map correctly by property', () => {
    const failures: ValidationFailure[] = [
      {
        propertyName: 'Prop_A',
        errorMessage: "'Prop_A' is a required field"
      },
      {
        propertyName: 'Prop_A',
        errorMessage: "'Prop_A' should contain at least 8 characters"
      },
      {
        propertyName: 'Prop_B',
        errorMessage: "'Prop_B' is a required field"
      }
    ];
    const sut = new ValidationResult(failures).toMap();

    expect(sut.size).toBe(2);

    const sut2 = Array.from(sut.values());
    expect(sut2.at(0)).toHaveLength(2);
    expect(sut2.at(1)).toHaveLength(1);
  });
});
