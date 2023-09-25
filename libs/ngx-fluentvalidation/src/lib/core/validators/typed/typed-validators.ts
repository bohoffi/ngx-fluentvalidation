import { ApplyConditionTo } from '../../types';
import { IValidator } from '../interfaces';

type StringProperty = string | null | undefined;
type NumberProperty = number | bigint | null | undefined;
type ObjectProperty = object | null | undefined;
type LengthProperty = { length: number };

type CommonValidator<TModel, TProperty> = {
  /**
   * Defines a `null` validation.
   *
   * Validation will fail if the value is not null.
   */
  isNull(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `not null` validation.
   *
   * Validation will fail if the value is null.
   */
  notNull(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines an `equal` validation.
   *
   * Validation will fail if the value is not equal to the given reference value.
   * @param referenceValue The value to compare against
   */
  equal(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `not equal` validation.
   *
   * Validation will fail if the value is equal to the given reference value.
   * @param referenceValue The value to compare against
   */
  notEqual(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a predicate validation.
   *
   * Validation will fail if the value does not meet the given condition.
   * @param predicate Condition to check against
   */
  must(predicate: (value: TProperty | null | undefined, model: TModel) => boolean): ExtendedValidator<TModel, TProperty>;
};

type StringValidator<TModel, TProperty extends StringProperty> = {
  /**
   * Defines a credit card number validation. This validation uses the Luhn algorythm.
   *
   * Validation will fail if the value is not a valid credit card number.
   */
  creditCard(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines an `empty` validation.
   *
   * Validation will fail if the value is not an empty string.
   */
  empty(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `not empty` validation.
   *
   * Validation will fail if the value is an empty string.
   */
  notEmpty(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a regular expression validation.
   *
   * Validation will fail if the given regular expression tests negative against the value.
   * @param regExp Regular expression to test against the value
   */
  matches(regExp: RegExp): ExtendedValidator<TModel, TProperty>;
};

type NumberValidator<TModel, TProperty extends NumberProperty> = {
  /**
   * Defines a `less than` validation.
   *
   * Validation will fail if the value is equal to or greater than the given reference value.
   * @param referenceValue The value to compare against
   */
  lessThan(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `less than or equal to` validation.
   *
   * Validation will fail if the value is greater than the given reference value.
   * @param referenceValue The value to compare against
   */
  lessThanOrEqualTo(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `greater than` validation.
   *
   * Validation will fail if the value is equal to or less than the given reference value.
   * @param referenceValue The value to compare against
   */
  greaterThan(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `greater than or equals` validation.
   *
   * Validation will fail if the value is less than the given reference value.
   * @param referenceValue The value to compare against
   */
  greaterThanOrEqualTo(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `is positive` validation.
   *
   * Validation will fail if the value less than `1`.
   */
  isPositive(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a `is negative` validation.
   *
   * Validation will fail if the value greater than `-1`.
   */
  isNegative(): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines an `exclusive between` validation.
   *
   * Validation will fail if the value is not inside the given range - `min/max` are not part of the range.
   * @param options The options specifying the range to check against
   */
  exclusiveBetween(options: { min: number; max: number }): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines an `inclusive between` validation.
   *
   * Validation will fail if the value is not inside the given range - `min/max` are part of the range.
   * @param options The options specifying the range to check against
   */
  inclusiveBetween(options: { min: number; max: number }): ExtendedValidator<TModel, TProperty>;
};

type ObjectValidator<TModel, TProperty extends ObjectProperty> = {
  /**
   * Defines a validation against a specific validator.
   *
   * Validation will fail if the given validator fails.
   * @param validator Specific validator to perform validations on the value.
   */
  setValidator(validator: IValidator<TProperty>): ExtendedValidator<TModel, TProperty>;
};

type LengthValidator<TModel, TProperty extends LengthProperty> = {
  /**
   * Defines a `min/max length` validation.
   *
   * Validation will fail if the length of the value is either less then the minLength or greater then maxLength.
   * @param options The options specifying the range to check against
   */
  length(options: { minLength: number; maxLength: number }): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a 'max length' validation.
   *
   * Validation will fail if the length of the value is greater than the given maxLength.
   * @param maxLength The maximum length to check against
   */
  maxLength(maxLength: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Defines a 'min length' validation.
   *
   * Validation will fail if the length of the value is less than the given minLength.
   * @param maxLength The minimum length to check against
   */
  minLength(minLength: number): ExtendedValidator<TModel, TProperty>;
};

export type TypeValidator<TModel, TProperty> = CommonValidator<TModel, TProperty> &
  (TProperty extends StringProperty ? StringValidator<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty ? NumberValidator<TModel, TProperty> : unknown) &
  (TProperty extends ObjectProperty ? ObjectValidator<TModel, TProperty> : unknown) &
  (TProperty extends LengthProperty ? LengthValidator<TModel, TProperty> : unknown);

type ConditionalValidator<TModel, TProperty> = TypeValidator<TModel, TProperty> & {
  /**
   * Defines a condition when a validation rule should execute. Rule will not get executed if the condition evaluates to `false`.
   * @param condition Condition to evaluate
   * @param applyConditionTo Option to apply condition to either all preceding validation rules - the default - or to the last validation rule only.
   */
  when(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeValidator<TModel, TProperty>;
  /**
   * Defines a condition when a validation rule should execute. Rule will not get executed if the condition evaluates to `true`.
   * @param condition Condition to evaluate
   * @param applyConditionTo Option to apply condition to either all preceding validation rules - the default - or to the last validation rule only.
   */
  unless(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeValidator<TModel, TProperty>;
};

type ExtendedValidator<TModel, TProperty> = ConditionalValidator<TModel, TProperty> & {
  /**
   * Overrides the default error message of a validation rule.
   * @param message Custom error message to use
   */
  withMessage(message: string): ConditionalValidator<TModel, TProperty>;
  /**
   * Overrides the default property name of a validation rule.
   * @param message Custom property name to use
   */
  withName(propertyName: string): ConditionalValidator<TModel, TProperty>;
};
