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
