import { TestTypeValidator, createTestTypeInstance } from '../../../test/test-helpers';
import { ModelValidator } from './model-validator';

describe(ModelValidator.name, () => {
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
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('classLevelCascadeMode', () => {
    it('should execute all chains regardless of failures when set to `Continue`', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
      testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      // both chains were executed
      expect(result.toMap().size).toEqual(2);
    });

    it('should stop after first failed chain when set to `Stop`', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.classLevelCascadeMode = 'Stop';

      testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
      testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      // only the first chain was executed because it failed
      expect(result.toMap().size).toEqual(1);
      expect(result.toMap().has('stringProperty')).toBe(true);
    });
  });

  describe('ValidationOptions', () => {
    describe('includeProperties', () => {
      it('should validate all properties when `includeProperties` was not passed', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
        testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

        testTypeValidator.validate(sut);
        const result = testTypeValidator.validationResult;
        expect(result.isValid).toBe(false);
        // both properties were validated
        expect(result.toMap().size).toEqual(2);
        expect(result.toMap().has('stringProperty')).toBe(true);
        expect(result.toMap().has('stringPropertyTwo')).toBe(true);
      });

      it('should validate no properties when `includeProperties` contains chainless properties only', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
        testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

        testTypeValidator.validate(sut, {
          includeProperties: ['booleanProperty']
        });
        const result = testTypeValidator.validationResult;
        expect(result.isValid).toBe(true);
        expect(result.toMap().size).toEqual(0);
      });

      it('should validate included properties only when `includeProperties` was passed', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
        testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

        testTypeValidator.validate(sut, {
          includeProperties: ['stringPropertyTwo']
        });
        let result = testTypeValidator.validationResult;
        expect(result.isValid).toBe(false);
        // only the second chain was executed because of inclusion filter
        expect(result.toMap().size).toEqual(1);
        expect(result.toMap().has('stringPropertyTwo')).toBe(true);

        testTypeValidator.validate(sut, {
          includeProperties: ['stringProperty', 'stringPropertyTwo']
        });
        result = testTypeValidator.validationResult;
        expect(result.isValid).toBe(false);
        // both were executed because of inclusion filter
        expect(result.toMap().size).toEqual(2);
        expect(result.toMap().has('stringProperty')).toBe(true);
        expect(result.toMap().has('stringPropertyTwo')).toBe(true);
      });
    });
  });
});
