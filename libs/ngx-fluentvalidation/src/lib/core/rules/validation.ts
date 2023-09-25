export type ModelValidation<TModel> = (model: TModel) => boolean | null;
export type PropertyValidation<TModel, TProperty> = (value: TProperty | null | undefined, model: TModel) => boolean | null;
