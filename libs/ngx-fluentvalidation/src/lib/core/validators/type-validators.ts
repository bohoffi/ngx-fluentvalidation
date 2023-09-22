export type StringProperty = string | null | undefined;
export type NumberProperty = number | bigint | null | undefined;
export type ObjectProperty = object | null | undefined;

export type CommonValidator<TModel, TProperty> = {
  isNull(): ExtendedValidator<TModel, TProperty>;
  notNull(): ExtendedValidator<TModel, TProperty>;
  equal(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
  notEqual(referenceValue: TProperty): ExtendedValidator<TModel, TProperty>;
};

export type StringValidator<TModel, TProperty extends StringProperty> = {
  notEmpty(): ExtendedValidator<TModel, TProperty>;
};

export type NumberValidator<TModel, TProperty extends NumberProperty> = {
  isPositive(): ExtendedValidator<TModel, TProperty>;
};

export type ObjectValidator<TModel, TProperty extends ObjectProperty> = {
  setValidator(): ExtendedValidator<TModel, TProperty>;
};

export type TypeValidator<TModel, TProperty> = CommonValidator<TModel, TProperty> &
  (TProperty extends StringProperty ? StringValidator<TModel, TProperty> : unknown) &
  (TProperty extends NumberProperty ? NumberValidator<TModel, TProperty> : unknown) &
  (TProperty extends ObjectProperty ? ObjectValidator<TModel, TProperty> : unknown);

export type ConditionalValidator<TModel, TProperty> = TypeValidator<TModel, TProperty> & {
  when(condition: (model: TModel) => boolean): TypeValidator<TModel, TProperty>;
  unless(condition: (model: TModel) => boolean): TypeValidator<TModel, TProperty>;
};

export type ExtendedValidator<TModel, TProperty> = ConditionalValidator<TModel, TProperty> & {
  withMessage(message: string): ConditionalValidator<TModel, TProperty>;
};
