import { TestTypeValidator, createTestTypeInstance } from '../../../test/test-helpers';

describe('ArrayValidation', () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  it('should return `false` when a rule fails', () => {
    const sut = createTestTypeInstance({
      stringArray: ['Jon', 'Bob']
    });

    testTypeValidator.forEach('stringArray').minLength(4);

    const result = testTypeValidator.validate(sut);
    expect(result).toBe(false);
  });
});
