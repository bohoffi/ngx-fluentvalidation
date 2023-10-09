import { ApplyConditionTo, CascadeMode } from '../types';
import { IValidator } from '../validators/interfaces';
import { PropertyRule } from './property-rule';

export type StringProperty = string | null | undefined;
export type NumberProperty = number | bigint | null | undefined;
export type ObjectProperty = object | null | undefined;
export type LengthProperty = { length: number } | null | undefined;
export type DateProperty = Date | null | undefined;

export type CommonRuleBuilder<TModel, TProperty> = {
  /**
   * Defines a `null` validation.
   *
   * Validation will fail if the value is not null.
   */
  isNull(): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `not null` validation.
   *
   * Validation will fail if the value is null.
   */
  notNull(): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines an `equal` validation.
   *
   * Validation will fail if the value is not equal to the given reference value.
   * @param referenceValue The value to compare against
   */
  equal(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `not equal` validation.
   *
   * Validation will fail if the value is equal to the given reference value.
   * @param referenceValue The value to compare against
   */
  notEqual(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a predicate validation.
   *
   * Validation will fail if the value does not meet the given condition.
   * @param predicate Condition to check against
   */
  must(predicate: (value: TProperty | null | undefined, model: TModel) => boolean): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a custom validation passed by the user.
   * @param customRule `PropertyRule` implementation to execute
   */
  withCustomRule(customRule: PropertyRule<TModel, TProperty>): ExtendedRuleBuilder<TModel, TProperty>;
};

export type StringRuleBuilder<TModel, TProperty extends StringProperty> = {
  /**
   * Defines a credit card number validation. This validation uses the Luhn algorythm.
   *
   * Validation will fail if the value is not a valid credit card number.
   */
  creditCard(): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a regular expression validation.
   *
   * Validation will fail if the given regular expression tests negative against the value.
   * @param regExp Regular expression to test against the value
   */
  matches(regExp: RegExp): ExtendedRuleBuilder<TModel, TProperty>;
};

export type NumberRuleBuilder<TModel, TProperty extends NumberProperty> = {
  /**
   * Defines a `is positive` validation.
   *
   * Validation will fail if the value less than `1`.
   */
  isPositive(): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `is negative` validation.
   *
   * Validation will fail if the value greater than `-1`.
   */
  isNegative(): ExtendedRuleBuilder<TModel, TProperty>;
};

export type ObjectRuleBuilder<TModel, TProperty extends ObjectProperty> = {
  /**
   * Defines a validation against a specific validator.
   *
   * Validation will fail if the given validator fails.
   * @param validator Specific validator to perform validations on the value.
   */
  setValidator(validator: IValidator<TProperty>): ExtendedRuleBuilder<TModel, TProperty>;
};

export type LengthRuleBuilder<TModel, TProperty extends LengthProperty> = {
  /**
   * Defines a `min/max length` validation.
   *
   * Validation will fail if the length of the value is either less then the minLength or greater then maxLength.
   * @param options The options specifying the range to check against
   */
  length(options: { minLength: number; maxLength: number }): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a 'max length' validation.
   *
   * Validation will fail if the length of the value is greater than the given maxLength.
   * @param maxLength The maximum length to check against
   */
  maxLength(maxLength: number): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a 'min length' validation.
   *
   * Validation will fail if the length of the value is less than the given minLength.
   * @param maxLength The minimum length to check against
   */
  minLength(minLength: number): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines an `empty` validation.
   *
   * Validation will fail if the values length is not equal to 0.
   */
  empty(): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `not empty` validation.
   *
   * Validation will fail if the values length is equal to 0.
   */
  notEmpty(): ExtendedRuleBuilder<TModel, TProperty>;
};

export type ComparisonRuleBuilder<TModel, TProperty extends NumberProperty | DateProperty> = {
  /**
   * Defines a `less than` validation.
   *
   * Validation will fail if the value is equal to or greater than the given reference value.
   * @param referenceValue The value to compare against
   */
  lessThan(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `less than or equal to` validation.
   *
   * Validation will fail if the value is greater than the given reference value.
   * @param referenceValue The value to compare against
   */
  lessThanOrEqualTo(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `greater than` validation.
   *
   * Validation will fail if the value is equal to or less than the given reference value.
   * @param referenceValue The value to compare against
   */
  greaterThan(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines a `greater than or equals` validation.
   *
   * Validation will fail if the value is less than the given reference value.
   * @param referenceValue The value to compare against
   */
  greaterThanOrEqualTo(referenceValue: TProperty | ((model: TModel) => TProperty)): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines an `exclusive between` validation.
   *
   * Validation will fail if the value is not inside the given range - `min/max` are not part of the range.
   * @param options The options specifying the range to check against
   */
  exclusiveBetween(options: {
    min: TProperty extends NumberProperty ? number | bigint : Date;
    max: TProperty extends NumberProperty ? number | bigint : Date;
  }): ExtendedRuleBuilder<TModel, TProperty>;
  /**
   * Defines an `inclusive between` validation.
   *
   * Validation will fail if the value is not inside the given range - `min/max` are part of the range.
   * @param options The options specifying the range to check against
   */
  inclusiveBetween(options: {
    min: TProperty extends NumberProperty ? number | bigint : Date;
    max: TProperty extends NumberProperty ? number | bigint : Date;
  }): ExtendedRuleBuilder<TModel, TProperty>;
};

export type TypeRuleBuilder<TModel, TProperty> = CommonRuleBuilder<TModel, TProperty> &
  (TProperty extends StringProperty ? StringRuleBuilder<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty ? NumberRuleBuilder<TModel, TProperty> : unknown) &
  (TProperty extends ObjectProperty ? ObjectRuleBuilder<TModel, TProperty> : unknown) &
  (TProperty extends LengthProperty ? LengthRuleBuilder<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty | DateProperty ? ComparisonRuleBuilder<TModel, TProperty> : unknown);

export type ValidatorBehaviourBuilder<TModel, TProperty> = {
  /**
   * Specifies the cascade mode for a property validation chain.
   *
   * If set to `Stop` then the execution of the validation will stop once the first rule fails.
   *
   * If set to `Continue` - the default - then all rules will execute regardless of failures.
   * @param cascadeMode mode to set on this rule
   */
  cascade(cascadeMode: CascadeMode): ConditionalRuleBuilder<TModel, TProperty>;
};

export type ConditionalRuleBuilder<TModel, TProperty> = TypeRuleBuilder<TModel, TProperty> & {
  /**
   * Defines a condition when a validation rule should execute. Rule will not get executed if the condition evaluates to `false`.
   * @param condition Condition to evaluate
   * @param applyConditionTo Option to apply condition to either all preceding validation rules - the default - or to the last validation rule only.
   */
  when(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeRuleBuilder<TModel, TProperty>;
  /**
   * Defines a condition when a validation rule should execute. Rule will not get executed if the condition evaluates to `true`.
   * @param condition Condition to evaluate
   * @param applyConditionTo Option to apply condition to either all preceding validation rules - the default - or to the last validation rule only.
   */
  unless(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeRuleBuilder<TModel, TProperty>;
};

export type ExtendedRuleBuilder<TModel, TProperty> = ConditionalRuleBuilder<TModel, TProperty> & {
  /**
   * Overrides the default error message of a validation rule.
   * @param message Custom error message to use
   */
  withMessage(message: string): ConditionalRuleBuilder<TModel, TProperty>;
  /**
   * Overrides the default property name of a validation rule.
   * @param message Custom property name to use
   */
  withName(propertyName: string): ConditionalRuleBuilder<TModel, TProperty>;
};
