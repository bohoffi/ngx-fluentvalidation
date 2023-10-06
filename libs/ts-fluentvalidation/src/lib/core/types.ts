export type KeyOf<T> = Extract<keyof T, string> & string;

export type ArrayKeyOf<T> = {
  [K in KeyOf<T>]: T[K] extends Array<unknown> ? K : never;
}[KeyOf<T>];

export type InferArrayItem<T> = T extends Array<infer TItem> ? TItem : T;

export type ApplyConditionTo = 'AllValidators' | 'CurrentValidator';
