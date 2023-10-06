export type KeyOf<T> = Extract<keyof T, string> & string;

export type ArrayKeyOf<T> = {
  [K in KeyOf<T>]: T[K] extends Array<unknown> ? K : never;
}[KeyOf<T>];

export type InferArrayItem<T> = T extends Array<infer TItem> ? TItem : T;

/**
 * Type defining if a condition is set for one specific rule or all rules of a chain.
 */
export type ApplyConditionTo = 'AllValidators' | 'CurrentValidator';

/**
 * Type defining the validation cascading of validators and property chains..
 */
export type CascadeMode = 'Continue' | 'Stop';
