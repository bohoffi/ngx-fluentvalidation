import { ApplyConditionTo } from '../../types';
import { IValidator } from '../interfaces';

export type StringProperty = string | null | undefined;
export type NumberProperty = number | bigint | null | undefined;
export type ObjectProperty = object | null | undefined;
export type LengthProperty = { length: number };

export type CommonValidator<TModel, TProperty> = {
  /**
   * Validates that the value should be null.
   */
  isNull(): ExtendedValidator<TModel, TProperty>;
  /**
   * Validates that the value should not be null.
   */
  notNull(): ExtendedValidator<TModel, TProperty>;
  /**
   * Validates that the value should be equal to a reference value.
   */
  equal(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
  /**
   * Validates that the value should not be equal to a reference value.
   */
  notEqual(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
  must(predicate: (value: TProperty | null | undefined, model: TModel) => boolean): ExtendedValidator<TModel, TProperty>;
};

export type StringValidator<TModel, TProperty extends StringProperty> = {
  creditCard(): ExtendedValidator<TModel, TProperty>;
  empty(): ExtendedValidator<TModel, TProperty>;
  /**
   * Validates that the value should not be an empty string.
   */
  notEmpty(): ExtendedValidator<TModel, TProperty>;
  matches(regExp: RegExp): ExtendedValidator<TModel, TProperty>;
};

export type NumberValidator<TModel, TProperty extends NumberProperty> = {
  lessThan(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  lessThanOrEqualTo(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  greaterThan(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  greaterThanOrEqualTo(referenceValue: number): ExtendedValidator<TModel, TProperty>;
  /**
   * Validates that the value should be a positive number.
   */
  isPositive(): ExtendedValidator<TModel, TProperty>;
  isNegative(): ExtendedValidator<TModel, TProperty>;
  exclusiveBetween(options: { min: number; max: number }): ExtendedValidator<TModel, TProperty>;
  inclusiveBetween(options: { min: number; max: number }): ExtendedValidator<TModel, TProperty>;
};

export type ObjectValidator<TModel, TProperty extends ObjectProperty> = {
  setValidator(validator: IValidator<TProperty>): ExtendedValidator<TModel, TProperty>;
};

export type LengthValidator<TModel, TProperty extends LengthProperty> = {
  length(options: { minLength: number; maxLength: number }): ExtendedValidator<TModel, TProperty>;
  maxLength(maxLength: number): ExtendedValidator<TModel, TProperty>;
  minLength(minLength: number): ExtendedValidator<TModel, TProperty>;
};

export type TypeValidator<TModel, TProperty> = CommonValidator<TModel, TProperty> &
  (TProperty extends StringProperty ? StringValidator<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty ? NumberValidator<TModel, TProperty> : unknown) &
  (TProperty extends ObjectProperty ? ObjectValidator<TModel, TProperty> : unknown) &
  (TProperty extends LengthProperty ? LengthValidator<TModel, TProperty> : unknown);

export type ConditionalValidator<TModel, TProperty> = TypeValidator<TModel, TProperty> & {
  when(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeValidator<TModel, TProperty>;
  unless(condition: (model: TModel) => boolean, applyConditionTo?: ApplyConditionTo): TypeValidator<TModel, TProperty>;
};

export type ExtendedValidator<TModel, TProperty> = ConditionalValidator<TModel, TProperty> & {
  withMessage(message: string): ConditionalValidator<TModel, TProperty>;
  withName(propertyName: string): ConditionalValidator<TModel, TProperty>;
};
