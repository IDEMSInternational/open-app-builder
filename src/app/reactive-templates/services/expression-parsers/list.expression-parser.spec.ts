import { ListExpressionParser } from "./list.expression-parser";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/expression-parsers/list.expression-parser.spec.ts
 */

describe("ListExpressionParser", () => {
  let subject: ListExpressionParser;

  beforeEach(() => {
    subject = new ListExpressionParser();
  });

  describe("parseExpression", () => {
    it("parses array-of-objects formatted strings into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: Value 3;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value":"Value 3"}]'
      );
    });

    it("parses array-of-objects formatted strings which includes a local variable reference into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: local.someVariable;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": local.someVariable }]'
      );
    });

    it("parses array-of-objects formatted strings which includes a global variable reference into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: global.someVariable;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": global.someVariable }]'
      );
    });

    it("parses array-of-objects formatted strings which includes a system variable reference into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: system.someVariable;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": system.someVariable }]'
      );
    });

    it("parses array-of-objects formatted strings which includes a local variable reference inside a template literal into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: \${local.someVariable};
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": `${local.someVariable}` }]'
      );
    });

    it("parses array-of-objects formatted strings which includes a global variable reference inside a template literal into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: \${global.someVariable};
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": `${global.someVariable}` }]'
      );
    });

    it("parses array-of-objects formatted strings which includes a system variable reference inside a template literal into a JavaScript list string", () => {
      const expression = `
				key: name_1 | value: Value 1;
				key: name_2 | value: Value 2 with trailing spaces  ;
				key: name_3 | value: \${system.someVariable};
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1"},{"key":"name_2","value":"Value 2 with trailing spaces"},{"key":"name_3","value": `${system.someVariable}` }]'
      );
    });

    it("parses array-of-objects with a single object into a list string", () => {
      const expression = `
				key: name_1 | value: Value 1 | description: This is description 1;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value 1","description":"This is description 1"}]'
      );
    });

    it("supports values containing additional colons and ignores empty entries", () => {
      const expression = `
				key: name_1 | value: Value with: colon;
				key: name_2 | value: ;
				key: name_3 | description: Something else | value: Another: colon;
			`;

      const result = subject.parse(expression);

      expect(result).toBe(
        '[{"key":"name_1","value":"Value with: colon"},{"key":"name_2"},{"key":"name_3","description":"Something else","value":"Another: colon"}]'
      );
    });

    it("returns the original string when the format is not array of object syntax", () => {
      const expression = "Plain string value";

      expect(subject.parse(expression)).toBe(expression);
    });

    it("returns the original string when string contains :", () => {
      const expression = "Plain string value: with colon";

      expect(subject.parse(expression)).toBe(expression);
    });

    it("returns primitives as-is when expression is not a string", () => {
      expect(subject.parse(42)).toBe(42);
      expect(subject.parse(true)).toBe(true);
    });
  });
});
