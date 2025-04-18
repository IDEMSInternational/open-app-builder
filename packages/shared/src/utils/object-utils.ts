/**
 * Determine whether a value is a literal object type (`{}`)
 * Adapted from discussion https://stackoverflow.com/q/1173549
 */
export function isObjectLiteral(v: any) {
  return v ? v.constructor === {}.constructor : false;
}

/** Check if an object is either empty or contains only empty child */
export function isEmptyObjectDeep(v: any) {
  return isObjectLiteral(v) && Object.values(v).every((x) => isEmptyObjectDeep(x));
}

/**
 * Takes a json object and empties all data inside, just leaving nested entry nodes
 * This is used to create placeholder objects for deeply nested partial configurations
 * @example
 * ```ts
 * const obj = {parent:{text:'hello',obj:{number:1}}}
 * toEmptyObject(obj)
 * // output
 * {parent:{obj:{}}}
 * ```
 ***/
export function toEmptyObject<T extends Record<string, any>>(obj: T) {
  const emptied = {} as any;
  if (isObjectLiteral(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      if (isObjectLiteral(value)) {
        emptied[key] = toEmptyObject(value);
      }
    }
  } else {
    console.error("[toEmptyObject] invalid input: " + obj);
    return obj;
  }
  return emptied as T;
}

/**
 * Takes an input object with deeply nested keys and removes all child entries
 * that are either empty `{}` or contain only empty child entries `{nested:{}}`
 * @example
 * ```ts
 *
 * ```
 */
export function cleanEmptyObject(obj: Record<string, any>) {
  const cleaned = {} as any;
  if (obj.constructor === {}.constructor) {
    for (const [key, value] of Object.entries(obj)) {
      if (value.constructor === {}.constructor) {
        if (!isEmptyObjectDeep(value)) {
          cleaned[key] = cleanEmptyObject(value);
        }
      } else {
        cleaned[key] = value;
      }
    }
  } else {
    return cleaned;
  }
  return cleaned;
}

/** Order a nested json object literal in alphabetical key order */
export const sortJsonKeys = <T extends Record<string, any>>(json: T): T => {
  // return non json-type data as-is
  if (!isObjectLiteral(json)) {
    return json;
  }
  // recursively sort any nested json by key
  return Object.keys(json)
    .sort()
    .reduce((obj, key) => {
      obj[key] = sortJsonKeys(json[key]);
      return obj;
    }, {}) as T;
};

/** Minimal deep equality checker, loosely based on lodash _isEqual but for simple primitives only */
export function isEqual(a: any, b: any) {
  // handle simple string, boolean, number, undefined, null or same object reference
  if (a === b) return true;
  // handle different object types
  if (typeof a !== typeof b) return false;
  // handle deep comparison for arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    // find the first element index where there is a mismatch
    // if all elements are the same `findIndex` returns value -1
    const differentIndex = a.findIndex((v, i) => !isEqual(v, b[i]));
    return differentIndex === -1;
  }
  // handle deep comparison for literal objects
  if (isObjectLiteral(a) && isObjectLiteral(b)) {
    // assert if equal if same properties but in different order
    const aSorted = sortJsonKeys(a);
    const bSorted = sortJsonKeys(b);
    if (!isEqual(Object.keys(aSorted), Object.keys(bSorted))) return false;
    return isEqual(Object.values(aSorted), Object.values(bSorted));
  }
  // NOTE - does not compare symbols, date objects, functions, buffers etc.
  return false;
}

/**
 * Convert an object array into a json object, with keys corresponding to array entries
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 * @param handleDuplicateKey optional function to trigger when duplicate hash key entry detected.
 * Should return replacement key to populate instead
 */
export function arrayToHashmap<T extends object>(
  arr: T[],
  keyfield: keyof T,
  handleDuplicateKey = (k: string) => k
): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      let hashKey = el[keyfield] as string;
      if (hashKey in hashmap) {
        hashKey = handleDuplicateKey(hashKey);
      }
      hashmap[hashKey] = el;
    }
  }
  return hashmap;
}

/** Take an object and return a subset of keys matching list of provided keys */
export function filterObjectByKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  includeKeys: K[]
) {
  const filteredEntries = Object.entries(obj).filter(([key]) => includeKeys.includes(key as K));
  return Object.fromEntries(filteredEntries) as Partial<Pick<T, K>>;
}

/**
 * Extract all the unique keys across objects in an array
 * @param maxDepth - max number of items to iterate over to check for keys. Default checks all
 **/
export function uniqueObjectArrayKeys(arr: Record<string, any>[], maxDepth?: number) {
  // Loop over max number of array items as defined by maxDepth
  const loopArr = maxDepth ? arr.slice(0, Math.min(arr.length, maxDepth)) : arr;

  const keyHashmap: Record<string, boolean> = {};
  for (const el of loopArr) {
    for (const key of Object.keys(el)) {
      keyHashmap[key] = true;
    }
  }
  return Object.keys(keyHashmap);
}
