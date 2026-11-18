/**
 * Set a key on an object to a new value, adding it if missing. Any existing value is replaced
 * entirely (not merged). Returns a copy, the original object is not changed
 */
export function updateElement<T extends Record<string, any>>(obj: T, key: string, value: any): T {
  return { ...obj, [key]: value };
}
