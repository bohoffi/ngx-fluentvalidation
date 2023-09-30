import { TestSubType, TestTypeValidator, createTestTypeInstance, hasErrorsFor } from '../../../test/test-helpers';
import { ModelValidator } from '../validators/model-validator';

describe('Rules', () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  describe('common rules', () => {
    it('equal', () => {
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

    it('notNull', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('nullableString').notNull();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['nullableString'])).toBe(true);
    });

    it('isNull', () => {
      const sut = createTestTypeInstance({
        nullableString: 'not-null'
      });

      testTypeValidator.for('nullableString').isNull();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['nullableString'])).toBe(true);
    });

    it('notEqual', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').notEqual(sut.stringProperty);
      testTypeValidator.for('numberProperty').notEqual(sut.numberProperty);
      testTypeValidator.for('booleanProperty').notEqual(sut.booleanProperty);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'numberProperty', 'booleanProperty'])).toBe(true);
    });

    describe('must', () => {
      it('property-only predicate', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('numberProperty').must(value => (value || 0) % 2 === 0);

        const isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(false);
        const validationResult = testTypeValidator.validationResult;
        expect(validationResult).not.toBeNull();
        expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
      });
      it('property and model predicate', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('numberProperty').must((value, model) => (value || 0) === 5 && model.stringProperty === '');

        const isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(false);
        const validationResult = testTypeValidator.validationResult;
        expect(validationResult).not.toBeNull();
        expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
      });
    });
  });

  describe('length rules', () => {
    it('length', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').length({ minLength: 3, maxLength: 4 });
      testTypeValidator.for('arrayProperty').length({ minLength: 1, maxLength: 1 });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'arrayProperty'])).toBe(true);
    });

    it('maxLength', () => {
      const sut = createTestTypeInstance({
        arrayProperty: [1, 2]
      });

      testTypeValidator.for('stringProperty').maxLength(4);
      testTypeValidator.for('arrayProperty').maxLength(1);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'arrayProperty'])).toBe(true);
    });

    it('minLength', () => {
      const sut = createTestTypeInstance({
        stringProperty: ''
      });

      testTypeValidator.for('stringProperty').minLength(1);
      testTypeValidator.for('arrayProperty').minLength(1);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'arrayProperty'])).toBe(true);
    });

    it('empty', () => {
      const sut = createTestTypeInstance({
        arrayProperty: [1]
      });

      testTypeValidator.for('stringProperty').empty();
      testTypeValidator.for('arrayProperty').empty();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'arrayProperty'])).toBe(true);
    });

    it('notEmpty', () => {
      const sut = createTestTypeInstance({
        stringProperty: ''
      });

      testTypeValidator.for('stringProperty').notEmpty();
      testTypeValidator.for('arrayProperty').notEmpty();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty', 'arrayProperty'])).toBe(true);
    });
  });

  describe('numeric rules', () => {
    it('lessThan', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').lessThan(5);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('lessThanOrEqualTo', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').lessThanOrEqualTo(4);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('greaterThan', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').greaterThan(5);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('greaterThanOrEqualTo', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').greaterThan(6);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('isPositive', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').isPositive();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('isNegative', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').isNegative();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('exclusiveBetween', () => {
      const sut = createTestTypeInstance({ numberProperty: 1 });

      testTypeValidator.for('numberProperty').exclusiveBetween({ min: 1, max: 3 });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });

    it('inclusiveBetween', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').inclusiveBetween({ min: 1, max: 3 });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['numberProperty'])).toBe(true);
    });
  });

  describe('object rules', () => {
    class ObjectPropertyValidator extends ModelValidator<TestSubType> {}

    it('setValidator', () => {
      const sut = createTestTypeInstance();

      const objectPropertyValidator = new ObjectPropertyValidator();
      objectPropertyValidator.for('stringProperty').notEqual('nestedString');

      testTypeValidator.for('objectProperty').setValidator(objectPropertyValidator);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['objectProperty'])).toBe(true);
    });
  });

  describe('string rules', () => {
    it('creditCard', () => {
      const sut = createTestTypeInstance({
        stringProperty: '5105105105105196'
      });

      testTypeValidator.for('stringProperty').creditCard();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty'])).toBe(true);
    });

    it('matches', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'end-word-start'
      });

      testTypeValidator.for('stringProperty').matches(/^start-word-end$/);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(validationResult).not.toBeNull();
      expect(hasErrorsFor(validationResult?.errors || [], ['stringProperty'])).toBe(true);
    });
  });

  describe('extensions', () => {
    it('withMessage', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'Jon'
      });

      const errorMessage = 'Please choose another forename';
      testTypeValidator.for('stringProperty').notEqual('Jon').withMessage(errorMessage);

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      expect(result?.errors[0].errorMessage).toEqual(errorMessage);
    });

    it('withName', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'Jon'
      });

      const propertyName = 'firstName';
      testTypeValidator.for('stringProperty').notEqual('Jon').withName(propertyName);

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      expect(result?.errors[0].propertyName).toEqual(propertyName);
    });
  });

  describe('conditions', () => {
    it('when', () => {
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

    it('unless', () => {
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
});
