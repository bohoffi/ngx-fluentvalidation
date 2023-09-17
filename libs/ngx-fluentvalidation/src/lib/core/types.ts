export type KeyOf<T> = Extract<keyof T, string> & string;
export type PropertyType<T> = T[KeyOf<T>];
