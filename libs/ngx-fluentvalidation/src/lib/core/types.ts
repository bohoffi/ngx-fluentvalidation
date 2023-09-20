export type KeyOf<T> = Extract<keyof T, string> & string;

type FilterFlags<T, U> = {
  [Key in keyof T]: T[Key] extends U ? Key : never;
};

type AllowedNames<T, U> = FilterFlags<T, U>[keyof T];

export type KeyOfType<T, U> = KeyOf<Pick<T, AllowedNames<T, U>>>;

/**
 * Union null and undefined with T.
 */
export type Nullable<T> = T | null | undefined;
