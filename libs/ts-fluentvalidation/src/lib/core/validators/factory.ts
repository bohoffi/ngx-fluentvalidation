import { KeyOf } from '../types';
import { IPropertyValidator } from './interfaces';
import { PropertyValidator } from './property-validator';

export function createValidatorForProperty<TModel, PropertyName extends KeyOf<TModel>>(
  propertyName: PropertyName
): IPropertyValidator<TModel, TModel[KeyOf<TModel>]> {
  return new PropertyValidator<TModel, TModel[KeyOf<TModel>]>(propertyName);
}
