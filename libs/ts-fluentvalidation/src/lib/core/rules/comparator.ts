import { isDateProperty } from './guards';
import { DateProperty, NumberProperty } from './rule-builders';

function ensureNumber<T extends NumberProperty | DateProperty>(value: T): number | bigint {
  return isDateProperty(value) ? value?.getTime() ?? 0 : value ?? 0;
}

export const comparator = {
  lessThan: <T extends NumberProperty | DateProperty>(left: T, right: T): boolean => ensureNumber(left) < ensureNumber(right),
  lessThanOrEqualTo: <T extends NumberProperty | DateProperty>(left: T, right: T): boolean => ensureNumber(left) <= ensureNumber(right),
  greaterThan: <T extends NumberProperty | DateProperty>(left: T, right: T): boolean => ensureNumber(left) > ensureNumber(right),
  greaterThanOrEqualTo: <T extends NumberProperty | DateProperty>(left: T, right: T): boolean => ensureNumber(left) >= ensureNumber(right),
  inclusiveBetween: <T extends NumberProperty | DateProperty>(
    left: T,
    options: { min: T extends NumberProperty ? number | bigint : Date; max: T extends NumberProperty ? number | bigint : Date }
  ): boolean => ensureNumber(left) >= ensureNumber(options.min) && ensureNumber(left) <= ensureNumber(options.max),
  exclusiveBetween: <T extends NumberProperty | DateProperty>(
    left: T,
    options: { min: T extends NumberProperty ? number | bigint : Date; max: T extends NumberProperty ? number | bigint : Date }
  ): boolean => ensureNumber(left) > ensureNumber(options.min) && ensureNumber(left) < ensureNumber(options.max)
};
