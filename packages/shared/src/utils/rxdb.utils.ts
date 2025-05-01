/**
 * Converts a simple JavaScript logical comparison string to a Mango query syntax object.
 * Currently supports basic comparisons with numbers: >, <, >=, <=, ===, !==
 * It assumes the comparison is of the form "fieldName operator value".
 * This is a simplified implementation and might not handle complex expressions.
 *
 * Generated using Gemini 2.5 Flash with prompt
 * ```text
 * write a function that converts logical comparison code written in javascript to mango query syntax, for use with rxdb find.
 * For example, it should take a valid javascript expression like n > 2 and return mango expression {n: {$gt: 2}}.
 * It should support text, number and boolean values used in comparison
 * ```
 *
 * @param {string} jsComparisonString - The JavaScript comparison string (e.g., "n > 2").
 * @returns {object|null} A Mango query object or null if the string is invalid.
 */
export function jsComparisonToMangoQuery(jsComparisonString: string): object | null {
  const regex = /^(\w+)\s*(>|<|>=|<=|===|!==)\s*(".*?"|'.*?'|true|false|\d+(\.\d+)?)$/;
  const match = jsComparisonString.match(regex);

  if (!match) {
    console.error("Invalid comparison string format\n", jsComparisonString);
    return null;
  }

  const fieldName = match[1];
  const operator = match[2];
  const valueString = match[3];

  let value;
  if (valueString.startsWith('"') || valueString.startsWith("'")) {
    value = valueString.substring(1, valueString.length - 1);
    // Basic unescaping for backslash followed by quote or backslash
    value = value.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  } else if (valueString === "true") {
    value = true;
  } else if (valueString === "false") {
    value = false;
  } else {
    // Assume it's a number
    value = parseFloat(valueString);
    if (isNaN(value)) {
      console.error("Invalid number value in comparison string.");
      return null;
    }
  }

  const mangoOperatorMap = {
    ">": "$gt",
    "<": "$lt",
    ">=": "$gte",
    "<=": "$lte",
    "===": "$eq",
    "!==": "$ne",
  };

  const mangoOperator = mangoOperatorMap[operator];

  if (!mangoOperator) {
    console.error(`Unsupported operator: ${operator}`);
    return null;
  }

  // While comparison operators are typically for numbers/dates,
  // allow them for strings and booleans with a warning, as MangoDB allows $gt/$lt etc. on other types.
  if (
    typeof value !== "number" &&
    (operator === ">" || operator === "<" || operator === ">=" || operator === "<=")
  ) {
    console.warn(
      `Using comparison operator "${operator}" with a non-numeric value (type: ${typeof value}). This might have unexpected behavior.`
    );
  }

  return {
    [fieldName]: {
      [mangoOperator]: value,
    },
  };
}
