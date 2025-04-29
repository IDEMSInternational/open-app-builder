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
/**
 * Converts a simple JavaScript logical comparison string to a Mango query syntax object.
 * Currently supports basic comparisons with numbers and strings: >, <, >=, <=, ===, !==
 * It assumes the comparison is of the form "fieldName operator value".
 * This is a simplified implementation and might not handle complex expressions.
 *
 * @param {string} jsComparisonString - The JavaScript comparison string (e.g., "n > 2", "name === 'bob'").
 * @returns {object|null} A Mango query object or null if the string is invalid.
 */
export function jsComparisonToMangoQuery(jsComparisonString: string): object | null {
  const regex = /^(\w+)\s*(>|<|>=|<=|===|!==)\s*(".*?"|'.*?'|\d+(\.\d+)?)$/;
  const match = jsComparisonString.match(regex);

  if (!match) {
    // console.error("Invalid comparison string format."); // Suppress logs during tests
    return null;
  }

  const fieldName = match[1];
  const operator = match[2];
  const valueString = match[3]; // This will now capture the whole number or number with decimal

  let value;
  if (valueString.startsWith('"') || valueString.startsWith("'")) {
    value = valueString.substring(1, valueString.length - 1);
  } else {
    value = parseFloat(valueString);
    if (isNaN(value)) {
      // console.error("Invalid number value in comparison string."); // Suppress logs during tests
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

  if (
    typeof value === "string" &&
    (operator === ">" || operator === "<" || operator === ">=" || operator === "<=")
  ) {
    console.warn(`Using comparison operator "${operator}" with a string value.`);
  }

  return {
    [fieldName]: {
      [mangoOperator]: value,
    },
  };
}
