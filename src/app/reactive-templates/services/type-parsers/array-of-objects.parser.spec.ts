import { ArrayOfObjectsParser } from "./array-of-objects.parser";

describe("ArrayOfObjectsParser", () => {
  let parser: ArrayOfObjectsParser;

  beforeEach(() => {
    parser = new ArrayOfObjectsParser();
  });

  describe("parseExpression", () => {
    it("parses array-of-objects formatted strings into structured objects", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: Value 3;
			`;

      const result = parser.parseExpression(expression);

      expect(result).toEqual([
        { key: "name_1", value: "Value 1" },
        { key: "name_2", value: "Value 2 with trailing spaces" },
        { key: "name_3", value: "Value 3" },
      ]);
    });

    it("parses array-of-objects with a single object", () => {
      const expression = `
				key: name_1 | value: Value 1 | description: This is description 1;
			`;

      const result = parser.parseExpression(expression);

      expect(result).toEqual([
        { key: "name_1", value: "Value 1", description: "This is description 1" },
      ]);
    });

    it("supports values containing additional colons and ignores empty entries", () => {
      const expression = `
				key: name_1 | value: Value with: colon;
				key: name_2 | value: ;
				key: name_3 | description: Something else | value: Another: colon;
			`;

      const result = parser.parseExpression(expression);

      expect(result).toEqual([
        { key: "name_1", value: "Value with: colon" },
        { key: "name_2" },
        { key: "name_3", description: "Something else", value: "Another: colon" },
      ]);
    });

    it("returns the original string when the format is not array of object syntax", () => {
      const expression = "Plain string value";

      expect(parser.parseExpression(expression)).toBe(expression);
    });

    it("returns the original string when string contains :", () => {
      const expression = "Plain string value: with colon";

      expect(parser.parseExpression(expression)).toBe(expression);
    });

    it("returns primitives as-is when expression is not a string", () => {
      expect(parser.parseExpression(42)).toBe(42);
      expect(parser.parseExpression(true)).toBe(true);
    });
  });
});
