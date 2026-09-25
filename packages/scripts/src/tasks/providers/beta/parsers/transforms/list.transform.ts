import { parseAppDataActionString } from "../../../../../lib/app-data/convert/utils";

/**
 * Whether a row or column name should have its value parsed as a list, e.g. `my_list` or
 * `my_list_1`. Action lists are excluded as they require their own parsing
 */
export function isListName(name?: string) {
  if (!name || typeof name !== "string") return false;
  // if (name.endsWith("action_list") || name.includes("_action_list_")) return false;
  return name.endsWith("_list") || name.includes("_list_");
}

/**
 * Parse a list string into an array of values. Adapted from `parseTemplateList` in the
 * template flowParser
 */
export function parseListValue(value: any) {
  // Assume all falsy values indicate an empty array
  if (!value) return [];

  // Assume any non-string values already parsed
  //  if (typeof value !== "string") return value;

  // HACK - use list separator to infer whether an actual list or not
  // E.g. avoid parsing reference `my_list : @local.some_other_list`
  //  if (!value.includes(";")) return value;

  // HACK - assume any list with | characters designed as parameter list
  //  const isCollectionList = value.includes("|");

  // convert to array
  let parsed: any[] = parseAppDataListString(value);
  // map array elements if collection list
  // if (isCollectionList) {
  //    parsed = parsed.map((el: string) => parseAppDataCollectionString(el, "|"));
  // }
  return parsed;
}

function parseAppDataListString(str: string, delimeter = ";"): string[] {
  return (
    str
      .split(delimeter)
      // remove whitespace between elements
      .map((val: string) => val.trim())
      // remove any trailing empty elements left by final ';'
      .filter((val: string) => val !== "")
  );
}

// function parseAppDataCollectionString(
//   str: string,
//   delimeter = ";"
// ): { [key: string]: string | boolean } {
//   const collection = {};
//   const entryList = parseAppDataListString(str, delimeter);
//   entryList.forEach((el) => {
//     let [key, value] = el.split(":");
//     value = value ? value.trim() : value;
//     // handle keys that define deeper nesting, such as time.hours: 7
//     // do not nest dynamic references
//     if (key.includes(".") && !key.startsWith("@")) {
//       const [base, ...nested] = key.split(".");
//       collection[base] = setNestedProperty(
//         nested.join("."),
//         parseStringValue(value),
//         collection[base]
//       );
//     } else {
//       collection[key] = parseStringValue(value);
//     }
//   });
//   return collection;
// }

/** Parse the value of every column with a name ending `_list` into an array */
export function parseListColumns<T extends Record<string, any>>(row: T): T {
  const parsed: Record<string, any> = { ...row };
  for (const [field, value] of Object.entries(row)) {
    if (isListName(field) && value && typeof value === "string") {
      parsed[field] = parseListValue(value);
    }
  }
  return parsed as T;
}

/** Parse the `value` of a row with a `name` ending `_list` into an array */
export function parseListRows<T extends { name?: string; value?: any }>(row: T): T {
  if (isListName(row.name) && row.value && typeof row.value === "string") {
    return { ...row, value: parseListValue(row.value) };
  }
  return row;
}

/**
 * Convert a list column of `key: value` strings into an object of key-value pairs,
 * e.g. `["style: primary", "disabled"]` => `{ style: "primary", disabled: "true" }`.
 * Adapted from `parseParameterList` in the template flowParser. Expects the column to
 * already be parsed as a list (see `parseListColumns`), other values are left unchanged
 * @param field name of the list column to convert, e.g. `parameter_list`
 */
export function parseKeyValueList<T extends Record<string, any>>(row: T, field: string): T {
  const list = row[field];
  if (!Array.isArray(list)) return row;
  const keyValues: Record<string, any> = {};
  for (const entry of list) {
    if (typeof entry !== "string") continue;
    // split on first colon only, so values can contain colons (e.g. urls)
    const separatorIndex = entry.indexOf(":");
    const key = (separatorIndex === -1 ? entry : entry.slice(0, separatorIndex)).trim();
    // if a single word is specified, e.g. 'box_display', assume setting param to true
    const value = separatorIndex === -1 ? "true" : entry.slice(separatorIndex + 1).trim();
    if (key) keyValues[key] = value;
  }
  return { ...row, [field]: keyValues };
}

/**
 * Convert a list column of action strings into action objects,
 * e.g. `["click | go_to: home"]` => `[{ trigger: "click", action_id: "go_to", args: ["home"], ... }]`.
 * Adapted from the `action_list` handling in the default flowParser. Expects the column to
 * already be parsed as a list (see `parseListColumns`), other values are left unchanged
 * @param field name of the action list column to convert, e.g. `action_list`
 */
export function parseActionList<T extends Record<string, any>>(row: T, field: string): T {
  const list = row[field];
  if (!Array.isArray(list)) return row;
  // do not parse action lists that are populated from variable reference, e.g. `@item.action_list`
  if (list.length === 1 && typeof list[0] === "string" && list[0].startsWith("@")) {
    return { ...row, [field]: list[0] };
  }
  const actions = list.map((entry) =>
    typeof entry === "string" ? parseAppDataActionString(entry) : entry
  );
  return { ...row, [field]: actions };
}
