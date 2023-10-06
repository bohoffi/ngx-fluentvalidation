import { KeyOf } from '../types';

/**
 * Options to control validation behavior.
 */
export interface ValidationOptions<TModel> {
  /**
   * Array of specific properties to validate.
   *
   * If set only properties contained in this array will get validated (given there is a chain defined).
   *
   * If unset or set to an empty array all properties will get validated (given there is a chain defined).
   */
  includeProperties?: Array<KeyOf<TModel>>;
}
