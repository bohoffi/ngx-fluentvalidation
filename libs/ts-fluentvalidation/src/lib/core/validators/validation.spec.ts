import { TestTypeValidator, createTestTypeInstance } from '../../../test/test-helpers';

describe('Validation', () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  describe('validate', () => {
    it('should return `true` with no rules applied', () => {
      const sut = createTestTypeInstance();

      const result = testTypeValidator.validate(sut);
      expect(result).toBe(true);
    });

    it('should return `false` when a rule fails', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'Jon'
      });

      testTypeValidator.for('stringProperty').notEqual('Jon');

      const result = testTypeValidator.validate(sut);
      expect(result).toBe(false);
    });
  });

  describe('validationResult', () => {
    it('should contain errors when validation failed', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'Jon'
      });

      testTypeValidator.for('stringProperty').notEqual('Jon');

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      expect(result).not.toBeNull();
      expect(result?.errors).toHaveLength(1);
    });
  });
});
