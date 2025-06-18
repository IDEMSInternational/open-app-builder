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

/**
 * Deep merge two objects.
 * Copied from https://stackoverflow.com/a/34749873/5693245
 * @param target
 * @param ...sources
 */
export function deepMergeObjects(target: any, ...sources: any) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObjectLiteral(target) && isObjectLiteral(source)) {
    for (const key in source) {
      if (isObjectLiteral(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMergeObjects(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMergeObjects(target, ...sources);
}

/**
 * Take 2 arrays and merge all values from second array onto first
 * Any values in second array will overwrite values from first
 * @param options.keyField unique field in all array objects to use as hash (e.g. 'id')
 * @param options.deep for duplicate entries specify whether to deep merge entries (default latter takes priority)
 */
export function mergeObjectArrays<T extends object>(
  baseArr: T[] = [],
  mergeArr: T[] = [],
  options: { keyField: keyof T; deep?: boolean }
) {
  const { keyField, deep } = options;
  const mergedHashmap = arrayToHashmap<T>(baseArr, keyField);
  for (const el of mergeArr) {
    const key = el[keyField] as string;
    // deep merge if specified
    if (key in mergedHashmap && deep) {
      mergedHashmap[key] = deepMergeObjects(mergedHashmap[key], el);
    } else {
      mergedHashmap[key] = el;
    }
  }
  return Object.values(mergedHashmap) as T[];
}

/**
 * Diff 2 objects and return a summary of key operations required to transform a -> b
 * Objects are compared via deep comparison, although output returned for
 * create/update operations specify the full value (not nested partial diff)
 **/
export function diffObjects(a: Record<string, any>, b: Record<string, any>) {
  const ops = {
    add: [] as { key: string; value: any }[],
    update: [] as { key: string; value: any }[],
    delete: [] as { key: string; value: any }[],
  };

  const mapA = new Map(Object.entries(a));
  const mapB = new Map(Object.entries(b));

  function addOperation(type: keyof typeof ops, key: string, value: any): void {
    ops[type].push({ key, value });
  }

  for (const [key, bValue] of mapB) {
    if (!mapA.has(key)) {
      addOperation("add", key, bValue);
    } else if (!isEqual(mapA.get(key), bValue)) {
      addOperation("update", key, bValue);
    }
  }

  for (const [key] of mapA) {
    if (!mapB.has(key)) {
      addOperation("delete", key, undefined);
    }
  }

  return ops;
}
