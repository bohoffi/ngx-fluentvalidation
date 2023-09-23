export type StringProperty = string | null | undefined;
export type NumberProperty = number | bigint | null | undefined;
export type ObjectProperty = object | null | undefined;

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
  must(model: TModel, value: TProperty): ExtendedValidator<TModel, TProperty>;
};

export type StringValidator<TModel, TProperty extends StringProperty> = {
  /**
   * Validates that the value should not be an empty string.
   */
  notEmpty(): ExtendedValidator<TModel, TProperty>;
};

export type NumberValidator<TModel, TProperty extends NumberProperty> = {
  /**
   * Validates that the value should be a positive number.
   */
  isPositive(): ExtendedValidator<TModel, TProperty>;
};

export type ObjectValidator<TModel, TProperty extends ObjectProperty> = {
  // TODO figure out
  setValidator(): ExtendedValidator<TModel, TProperty>;
};

export type TypeValidator<TModel, TProperty> = CommonValidator<TModel, TProperty> &
  (TProperty extends StringProperty ? StringValidator<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty ? NumberValidator<TModel, TProperty> : unknown) &
  (TProperty extends ObjectProperty ? ObjectValidator<TModel, TProperty> : unknown);

export type ConditionalValidator<TModel, TProperty> = TypeValidator<TModel, TProperty> & {
  // TODO update interface
  when(condition: (model: TModel) => boolean): TypeValidator<TModel, TProperty>;
  // TODO update interface
  unless(condition: (model: TModel) => boolean): TypeValidator<TModel, TProperty>;
};

export type ExtendedValidator<TModel, TProperty> = ConditionalValidator<TModel, TProperty> & {
  withMessage(message: string): ConditionalValidator<TModel, TProperty>;
  withName(propertyName: string): ConditionalValidator<TModel, TProperty>;
};
