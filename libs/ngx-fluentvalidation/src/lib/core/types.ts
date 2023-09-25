export type KeyOf<T> = Extract<keyof T, string> & string;

export type ApplyConditionTo = 'AllValidators' | 'CurrentValidator';
