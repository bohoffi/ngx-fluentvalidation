import { Rule } from '../rules/rule';

export interface Validator<T = unknown> {
  addRule(rule: Rule<T>, propertyName?: string): this;
  when(predicate: (value: T) => boolean): this;
  unless(predicate: (value: T) => boolean): this;
}
