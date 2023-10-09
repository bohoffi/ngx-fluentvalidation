import { TestSubType, TestType, TestTypeValidator, createTestTypeInstance, hasErrorsFor } from '../../../test/test-helpers';
import { ModelValidator } from '../validators/model-validator';
import { PropertyRule } from './property-rule';

describe('Rules', () => {
  let testTypeValidator: TestTypeValidator;

  beforeEach(() => {
    testTypeValidator = new TestTypeValidator();
  });

  describe('common rules', () => {
    it('equal', () => {
      const sut = createTestTypeInstance({
        stringPropertyTwo: 'Jon',
        numberPropertyTwo: 6
      });

      testTypeValidator.for('stringProperty').equal('Jon');
      testTypeValidator.for('stringProperty').equal(model => model.stringPropertyTwo);
      testTypeValidator.for('numberProperty').equal(6);
      testTypeValidator.for('numberProperty').equal(model => model.numberPropertyTwo);
      testTypeValidator.for('booleanProperty').equal(false);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberProperty', 'booleanProperty'])).toBe(true);
    });

    it('notNull', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('nullableString').notNull();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['nullableString'])).toBe(true);
    });

    it('isNull', () => {
      const sut = createTestTypeInstance({
        nullableString: 'not-null'
      });

      testTypeValidator.for('nullableString').isNull();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['nullableString'])).toBe(true);
    });

    it('notEqual', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').notEqual(sut.stringProperty);
      testTypeValidator.for('stringProperty').notEqual(model => model.stringPropertyTwo);
      testTypeValidator.for('numberProperty').notEqual(sut.numberProperty);
      testTypeValidator.for('numberProperty').notEqual(model => model.numberPropertyTwo);
      testTypeValidator.for('booleanProperty').notEqual(sut.booleanProperty);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberProperty', 'booleanProperty'])).toBe(true);
    });

    describe('must', () => {
      it('property-only predicate', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('numberProperty').must(value => (value || 0) % 2 === 0);

        const isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(false);
        const validationResult = testTypeValidator.validationResult;
        expect(hasErrorsFor(validationResult.errors, ['numberProperty'])).toBe(true);
      });
      it('property and model predicate', () => {
        const sut = createTestTypeInstance();

        testTypeValidator.for('numberProperty').must((value, model) => (value || 0) === 5 && model.stringProperty === '');

        const isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(false);
        const validationResult = testTypeValidator.validationResult;
        expect(hasErrorsFor(validationResult.errors, ['numberProperty'])).toBe(true);
      });
    });

    describe('withCustomRule', () => {
      class RevertedSecondHalfStringEqualsRule<TModel> extends PropertyRule<TModel, string> {
        constructor(public referenceValue: string) {
          super(value => {
            const reverted = (value ?? '').split('').reverse().join('');
            const secondHalf = this.getSecondHalf(reverted);
            return secondHalf === this.referenceValue;
          }, `The reverted second half of the string should be equal to ${referenceValue}`);
        }

        private getSecondHalf(value: string): string {
          const arr = value.split('');
          return arr
            .slice(Math.floor(arr.length / 2))
            .join('')
            .trim();
        }
      }

      it('should execute a custom rule when passed', () => {
        const sut = createTestTypeInstance({
          stringProperty: 'HelloWorld'
        });

        const customRuleInstance = new RevertedSecondHalfStringEqualsRule<TestType>('dlroW');
        testTypeValidator.for('stringProperty').withCustomRule(customRuleInstance);

        let isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(false);
        let validationResult = testTypeValidator.validationResult;
        expect(validationResult.errors).toHaveLength(1);
        expect(validationResult.errors[0].errorMessage).toEqual('The reverted second half of the string should be equal to dlroW');

        // update reference value
        customRuleInstance.referenceValue = 'olleH';
        isValid = testTypeValidator.validate(sut);
        expect(isValid).toBe(true);
        validationResult = testTypeValidator.validationResult;
        expect(validationResult.errors).toHaveLength(0);
      });
    });
  });

  describe('length rules', () => {
    it('length', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('stringProperty').length({ minLength: 3, maxLength: 4 });
      testTypeValidator.for('numberArray').length({ minLength: 1, maxLength: 1 });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberArray'])).toBe(true);
    });

    it('maxLength', () => {
      const sut = createTestTypeInstance({
        numberArray: [1, 2]
      });

      testTypeValidator.for('stringProperty').maxLength(4);
      testTypeValidator.for('numberArray').maxLength(1);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberArray'])).toBe(true);
    });

    it('minLength', () => {
      const sut = createTestTypeInstance({
        stringProperty: ''
      });

      testTypeValidator.for('stringProperty').minLength(1);
      testTypeValidator.for('numberArray').minLength(1);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberArray'])).toBe(true);
    });

    it('empty', () => {
      const sut = createTestTypeInstance({
        numberArray: [1]
      });

      testTypeValidator.for('stringProperty').empty();
      testTypeValidator.for('numberArray').empty();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberArray'])).toBe(true);
    });

    it('notEmpty', () => {
      const sut = createTestTypeInstance({
        stringProperty: ''
      });

      testTypeValidator.for('stringProperty').notEmpty();
      testTypeValidator.for('numberArray').notEmpty();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty', 'numberArray'])).toBe(true);
    });
  });

  describe('numeric rules', () => {
    it('isPositive', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').isPositive();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty'])).toBe(true);
    });

    it('isNegative', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').isNegative();

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty'])).toBe(true);
    });
  });

  describe('comparison rule', () => {
    it('lessThan', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').lessThan(sut.numberPropertyTwo);
      testTypeValidator.for('numberProperty').lessThan(model => model.numberPropertyTwo);
      testTypeValidator.for('dateProperty').lessThan(sut.datePropertyTwo);
      testTypeValidator.for('dateProperty').lessThan(model => model.datePropertyTwo);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
    });

    it('lessThanOrEqualTo', () => {
      const sut = createTestTypeInstance({
        numberPropertyTwo: 4,
        datePropertyTwo: new Date(2022, 0, 1)
      });

      testTypeValidator.for('numberProperty').lessThanOrEqualTo(4);
      testTypeValidator.for('numberProperty').lessThanOrEqualTo(model => model.numberPropertyTwo);
      testTypeValidator.for('dateProperty').lessThanOrEqualTo(new Date(2022, 0, 1));
      testTypeValidator.for('dateProperty').lessThanOrEqualTo(model => model.datePropertyTwo);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
    });

    it('greaterThan', () => {
      const sut = createTestTypeInstance();

      testTypeValidator.for('numberProperty').greaterThan(sut.numberPropertyTwo);
      testTypeValidator.for('numberProperty').greaterThan(model => model.numberPropertyTwo);
      testTypeValidator.for('dateProperty').greaterThan(sut.datePropertyTwo);
      testTypeValidator.for('dateProperty').greaterThan(model => model.datePropertyTwo);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
    });

    it('greaterThanOrEqualTo', () => {
      const sut = createTestTypeInstance({
        numberPropertyTwo: 6,
        datePropertyTwo: new Date(2024, 0, 1)
      });

      testTypeValidator.for('numberProperty').greaterThanOrEqualTo(sut.numberPropertyTwo);
      testTypeValidator.for('numberProperty').greaterThanOrEqualTo(model => model.numberPropertyTwo);
      testTypeValidator.for('dateProperty').greaterThanOrEqualTo(sut.datePropertyTwo);
      testTypeValidator.for('dateProperty').greaterThanOrEqualTo(model => model.datePropertyTwo);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
    });

    it('exclusiveBetween', () => {
      const sut = createTestTypeInstance({ numberProperty: 1 });

      testTypeValidator.for('numberProperty').exclusiveBetween({ min: 1, max: 3 });
      testTypeValidator.for('dateProperty').exclusiveBetween({ min: new Date(2023, 0, 1), max: new Date(2024, 0, 1) });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
    });

    it('inclusiveBetween', () => {
      const sut = createTestTypeInstance({ numberProperty: 0 });

      testTypeValidator.for('numberProperty').inclusiveBetween({ min: 1, max: 3 });
      testTypeValidator.for('dateProperty').inclusiveBetween({ min: new Date(2023, 0, 2), max: new Date(2024, 0, 1) });

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['numberProperty', 'dateProperty'])).toBe(true);
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
      expect(hasErrorsFor(validationResult.errors, ['objectProperty'])).toBe(true);
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
      expect(hasErrorsFor(validationResult.errors, ['stringProperty'])).toBe(true);
    });

    it('matches', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'end-word-start'
      });

      testTypeValidator.for('stringProperty').matches(/^start-word-end$/);

      const isValid = testTypeValidator.validate(sut);
      expect(isValid).toBe(false);
      const validationResult = testTypeValidator.validationResult;
      expect(hasErrorsFor(validationResult.errors, ['stringProperty'])).toBe(true);
    });
  });

  describe('validator behaviour', () => {
    describe('cascade mode', () => {
      it('set on property chain', () => {
        const sut = createTestTypeInstance();

        // execute both rules
        testTypeValidator.for('stringProperty').notEqual('string').minLength(7);
        // stop cascading after `notEqual` fails
        testTypeValidator.for('stringPropertyTwo').cascade('Stop').notEqual('string').minLength(7);

        testTypeValidator.validate(sut);
        const result = testTypeValidator.validationResult;
        expect(result.errors.filter(err => err.propertyName === 'stringProperty')).toHaveLength(2);
        expect(result.errors.filter(err => err.propertyName === 'stringPropertyTwo')).toHaveLength(1);
      });

      it('validator.ruleLevelCascadeMode', () => {
        const sut = createTestTypeInstance();

        // overwrites property chain setting
        testTypeValidator.ruleLevelCascadeMode = 'Stop';
        // stop cascading after `notEqual` fails even though 'Continue' is set
        testTypeValidator.for('stringProperty').cascade('Continue').notEqual('string').minLength(7);
        testTypeValidator.for('stringPropertyTwo').notEqual('string').minLength(7);

        testTypeValidator.validate(sut);
        const result = testTypeValidator.validationResult;
        expect(result.errors.filter(err => err.propertyName === 'stringProperty')).toHaveLength(1);
        expect(result.errors.filter(err => err.propertyName === 'stringPropertyTwo')).toHaveLength(1);
      });
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
      expect(result.errors[0].errorMessage).toEqual(errorMessage);
    });

    it('withName', () => {
      const sut = createTestTypeInstance({
        stringProperty: 'Jon'
      });

      const propertyName = 'firstName';
      testTypeValidator.for('stringProperty').notEqual('Jon').withName(propertyName);

      testTypeValidator.validate(sut);
      const result = testTypeValidator.validationResult;
      expect(result.errors[0].propertyName).toEqual(propertyName);
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
