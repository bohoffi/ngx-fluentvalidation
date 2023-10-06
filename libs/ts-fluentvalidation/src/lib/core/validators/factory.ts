import { ArrayKeyOf, KeyOf } from '../types';
import { IArrayPropertyValidator, IPropertyValidator } from './interfaces';
import { ArrayPropertyValidator, PropertyValidator } from './property-validator';

export function createValidatorForProperty<TModel, PropertyName extends KeyOf<TModel>>(
  propertyName: PropertyName
): IPropertyValidator<TModel, TModel[KeyOf<TModel>]> {
  return new PropertyValidator<TModel, TModel[KeyOf<TModel>]>(propertyName);
}

export function createValidatorForArrayProperty<TModel, PropertyName extends ArrayKeyOf<TModel>, TProperty extends Array<unknown>>(
  propertyName: PropertyName
): IArrayPropertyValidator<TModel, TProperty> {
  return new ArrayPropertyValidator<TModel, TProperty>(propertyName);
}
