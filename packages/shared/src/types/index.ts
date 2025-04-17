export interface ITemplatedStringVariable {
  value?: string;
  variables?: { [key: string]: ITemplatedStringVariable };
}

/** A recursive version of Partial, making all properties, included nested ones, optional.
 * Copied from https://stackoverflow.com/a/47914631
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
