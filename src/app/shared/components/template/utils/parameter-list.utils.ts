import * as z from "zod";
import type { FlowTypes } from "src/app/shared/model";

/**
 * Custom utilities to convert string parameter_list values to custom type
 *
 * Methods are defined to parse incoming string parameters, as well as data
 * matching intended target type (already be parsed)
 *
 * Most methods include a `fallback` which will be used if expected data type
 * not received (e.g. undefined)
 *
 * NOTE - zod's `z.coerce` methods not used in favor of custom implementation
 * (e.g. support parsing boolean-string not just truthy/falsy values )
 */
const coerceMethods = {
  /** Use authored string value with fallback if undefined */
  string: (fallback: string) => z.string().catch(fallback),

  /** Convert to number with fallback if undefined or NaN */
  number: (fallback: number) =>
    z
      .union([z.number(), z.string()])
      .transform((v) => {
        if (typeof v === "number") return v;
        const n = Number(v);
        return isNaN(n) ? fallback : n;
      })
      .catch(fallback),

  /**
   * Convert to boolean. Treats boolean and string representation of "true" as true,
   * otherwise will return false
   */
  boolean: () =>
    z
      .union([z.boolean(), z.string()])
      .transform((v) => {
        if (typeof v === "boolean") return v;
        return v.toLowerCase().trim() === "true";
      })
      .catch(false),

  /*** Convert to value from allowed list, with fallback in case not in list  */
  allowedValues: <const T extends readonly string[]>(values: T, fallback: T[number]) =>
    z.enum(values).catch((v) => {
      for (const issue of v.issues) {
        // Provide console warning if incorrect value used
        if (v.value) {
          console.warn("[Parameter List] invalid value", {
            value: v.value,
            allowed: issue.values,
            default: fallback,
          });
        }
      }
      return fallback;
    }),

  /*** Convert to value from allowed list, with fallback in case not in list  */
  commaSeparatedList: () =>
    z
      .union([z.array(z.string()), z.string()])
      .transform((v) => {
        if (Array.isArray(v)) return v;
        return v.split(",").map((s) => s.trim());
      })
      .catch([]),

  /**
   * Parse a string to an array of objects
   * Expects string in the format:
   * 'key_1: value_1_a | key_2: value_2_a | key_3: value_3_a; key_1: value_1_b | key_2: value_2_b | key_3: value_3_b'
   * @param fallback fallback array of objects if parsing fails
   * @returns array of objects with specified type
   */
  objectArray: <T extends Record<string, any>>(fallback: T[]) =>
    z
      .union([z.array(z.record(z.string(), z.any())), z.string()])
      .transform((v): T[] => {
        // If already an array of objects, return as-is
        if (Array.isArray(v)) return v as T[];

        // Parse string format: 'key_1: value_1_a | key_2: value_2_a; key_1: value_1_b | key_2: value_2_b'
        if (typeof v === "string") {
          // Split by semicolon, filter out empty lines
          const lines = v
            .split(";")
            .map((line) => line.trim())
            .filter((line) => line);

          // Check if lines contain at least one ':'
          const isArrayOfObjectsType =
            lines.length > 0 && lines.every((line) => line.includes(":"));

          if (isArrayOfObjectsType) {
            return lines.map((line) => {
              const obj: Record<string, string> = {};
              // Split by '|', then parse each key-value pair
              line.split("|").forEach((part) => {
                const [key, ...rest] = part.split(":");
                if (key && rest.length > 0) {
                  const value = rest.join(":").trim();
                  if (value !== "") {
                    obj[key.trim()] = value;
                  }
                }
              });
              return obj as T;
            });
          }
        }

        return fallback;
      })
      .catch(fallback),

  /** Provide custom value conversion method */
  custom: <T>(transformer: (v: string | T) => T, fallback: T) =>
    z.any().transform((value) => {
      try {
        const transformed = transformer(value);
        return transformed;
      } catch (error) {
        return fallback;
      }
    }),

  /**
   *  Allow any value, e.g. could be inline string or parsed dynamic value ref.
   *  This is generally discouraged, ideally custom transformers should be used to handle
   *  comple cases.
   *  NOTE - use `.default()` to ensure key populated as catch never triggered
   **/
  any: <T>(fallback: T) => z.any().default(fallback),
};

/**
 * Create zod object to define authoring parameter values, type coersion and default values
 * This object can be used to parse incoming values from sheets
 *
 * @example
 * ```ts
 * const AuthorParams = defineAuthorParameterSchema(coerce=>({
 *    string_param: coerce.string(''),
 *    number_param: coerce.number(-1),
 *    allowedValues_param: coerce.allowedValues(['option_1','option_2'],'option_2'), *
 *    custom_param: coerce.custom(v=>parseAnswerList(v),[])
 * })
 * const parsedParams = parseTemplateParameterList(row.parameterList(),AuthorParams)
 * ```
 */
export function defineAuthorParameterSchema<Shape extends z.ZodRawShape>(
  coerceValues: (coerce: typeof coerceMethods) => Shape
) {
  const coerced = coerceValues(coerceMethods);
  return z.object(coerced);
}

/** Parse author parameter list using type-safe schema **/
export function parseTemplateParameterList<T extends z.ZodObject<any, any>>(
  parameterList: FlowTypes.TemplateRow["parameter_list"] = {},
  schema: T
) {
  // Compare keys to notify authors if any parameter_list values not supported
  const schemaKeys = new Set(Object.keys(schema.shape));
  const inputKeys = Object.keys(parameterList);
  const unknownKeys = inputKeys.filter((k) => !schemaKeys.has(k));
  const allowedKeys = Array.from(schemaKeys);
  unknownKeys.forEach((k) =>
    console.warn(`[Parameter List] Invalid Property: "${unknownKeys}"`, { allowedKeys })
  );

  // NOTE - should not throw as all coerce methods include own catch
  const parsed = schema.parse(parameterList);
  // Transform snake_case to camelCase. This will keep type-safety following conversion
  return snakeToCamelKeys(parsed);
}

/** Convert all keys in an object from snake_case to camelCase */
function snakeToCamelKeys<T>(obj: T): ISnakeToCamelKeys<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeToCamelKeys(v)) as ISnakeToCamelKeys<T>;
  } else if (obj && typeof obj === "object" && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [snakeToCamel(k), snakeToCamelKeys(v)])
    ) as ISnakeToCamelKeys<T>;
  }
  return obj as ISnakeToCamelKeys<T>;
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Extract the type of zod schema and convert
 * snake_case to camelCase for corrected types after parsing
 *
 * @example
 * const Schema = defineAuthorParameterSchema({...})
 * type ISchema = InferParamSchemaType<typeof Schema>
 */
export type InferParamSchemaType<T> = ISnakeToCamelKeys<z.infer<T>>;

// type inference to convert a key in snake_case to key in camelCase
type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

// type inference when converting all keys in an object from snake_case to camelCase
type ISnakeToCamelKeys<T> =
  T extends Array<infer U>
    ? ISnakeToCamelKeys<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string ? SnakeToCamel<K> : K]: ISnakeToCamelKeys<T[K]>;
        }
      : T;
