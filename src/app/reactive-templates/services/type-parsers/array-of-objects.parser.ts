import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ArrayOfObjectsParser {
  /**
   * Parses the given expression into a structured format.
   * e.g. array format:
   *   key: name_1 | value: This is value 1 | description: This is description 1;
   *   key: name_2 | value: This is value 2 | description: This is description 2;
   *   key: name_3 | value: This is value 3 | description: This is description 3;
   *
   * todo: more expression types e.g. object/json and a more robust parsing system.
   * todo: Improve expressions by changing the syntax, maybe expressions can more closely
   *       resemble javascript string interpolation expressions.
   * todo: This expression parser should probably happen in the template parsing process, not here.
   *
   * @param expression The expression to parse, which may represent an array of objects in a custom string format.
   * @returns
   */
  public parseExpression(expression: string | number | boolean | any) {
    // Detect array type expression: lines with 'key: ... | key2: ...;' format
    if (typeof expression === "string") {
      // Only attempt structured parsing when the author used ';' as entry separators
      if (!expression.includes(";")) {
        return expression;
      }
      // Split by semicolon, filter out empty lines
      const lines = expression
        .split(";")
        .map((line) => line.trim())
        .filter((line) => line);
      // Check if there are multiple lines that contain at least one ':'
      const isArrayOfObjectsType = lines.length > 0 && lines.every((line) => line.includes(":"));
      if (isArrayOfObjectsType) {
        return lines.map((line) => {
          const obj: { [key: string]: string } = {};
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
          return obj;
        });
      }
    }
    // Fallback: return as-is for string, boolean, number
    return expression;
  }
}
