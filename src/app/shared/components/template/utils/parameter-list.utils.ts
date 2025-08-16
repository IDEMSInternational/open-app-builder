import * as z from "zod";
import type { FlowTypes } from "src/app/shared/model";

/**
 * Custom utilities to convert string parameter_list values to custom type
 * All methods include a `fallback` which will be used if incoming data not
 * a string value (e.g. undefined), or in case of a `list` if value does not exist
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
      .string()
      .transform((v) => {
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
      .string()
      .transform((v) => v.toLowerCase().trim() === "true")
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
      .string()
      .transform((v) => v.split(",").map((s) => s.trim()))
      .catch([]),

  /** Provide custom value conversion method */
  custom: (transformer: (v: string) => any, fallback: any) =>
    z.string().transform(transformer).catch(fallback),

  /**
   *  Allow any value, e.g. could be inline string or parsed dynamic value ref.
   *  This is generally discouraged, ideally custom transformers should be used to handle
   *  comple cases.
   *  NOTE - use `.default()` to ensure key populated as catch never triggered
   **/
  any: (fallback: any) => z.any().default(fallback),

  // TODO - provide more options to handle data that may already be parsed from dynamic variables
  // These should only be added as use-cases are detected in specific components
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
  parameterList: FlowTypes.TemplateRow["parameter_list"],
  schema: T
) {
  // NOTE - should not throw as all coerce methods include own catch
  const parsed = schema.parse(parameterList || {});
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
 * Extract the type of a defined parameter list schema
 *
 * @example
 * const Schema = defineAuthorParameterSchema({...})
 * type ISchema = InferParamSchemaType<typeof Schema>
 */
export type InferParamSchemaType<T> = z.infer<T>;

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
