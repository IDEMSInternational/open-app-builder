import { JavascriptEvaluator } from "./javascript.evaluator";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/javascript.evaluator.spec.ts
 */
describe("JavascriptEvaluator", () => {
  let evaluator: JavascriptEvaluator;

  beforeEach(() => {
    evaluator = new JavascriptEvaluator();
  });

  describe("script evaluation", () => {
    it("evaluates simple arithmetic expressions", () => {
      const result = evaluator.evaluate("2 + 3", "script");

      expect(result).toBe(5);
    });

    it("evaluates expressions with context variables", () => {
      evaluator.setContext({ x: 10, y: 5 });

      const result = evaluator.evaluate("x + y", "script");

      expect(result).toBe(15);
    });

    it("evaluates boolean expressions", () => {
      evaluator.setContext({ x: 10 });

      const result = evaluator.evaluate("x > 5", "script");

      expect(result).toBe(true);
    });

    it("evaluates complex expressions with multiple variables", () => {
      evaluator.setContext({ a: 5, b: 3, c: 2 });

      const result = evaluator.evaluate("(a + b) * c", "script");

      expect(result).toBe(16);
    });

    it("evaluates array access from context", () => {
      evaluator.setContext({ items: [1, 2, 3, 4, 5] });

      const result = evaluator.evaluate("items[2]", "script");

      expect(result).toBe(3);
    });

    it("evaluates object property access from context", () => {
      evaluator.setContext({ person: { name: "John", age: 30 } });

      const result = evaluator.evaluate("person.age", "script");

      expect(result).toBe(30);
    });

    it("evaluates method calls on context objects", () => {
      evaluator.setContext({ str: "hello" });

      const result = evaluator.evaluate("str.toUpperCase()", "script");

      expect(result).toBe("HELLO");
    });

    it("handles list type as script evaluation", () => {
      evaluator.setContext({ items: [1, 2, 3] });

      const result = evaluator.evaluate("items.length", "list");

      expect(result).toBe(3);
    });

    it("parses a mango style query", () => {
      const result = evaluator.evaluate(
        "{selector: {active: true}, sort: [{name: 'desc'}], limit: 3}",
        "script"
      );

      expect(result).toEqual({ selector: { active: true }, sort: [{ name: "desc" }], limit: 3 });
    });
  });

  describe("template literal evaluation", () => {
    it("evaluates simple template literals", () => {
      const result = evaluator.evaluate("Hello World", "string");

      expect(result).toBe("Hello World");
    });

    it("evaluates template literals with context variables", () => {
      evaluator.setContext({ firstName: "Alice" });

      const result = evaluator.evaluate("Hello, ${firstName}!", "string");

      expect(result).toBe("Hello, Alice!");
    });

    it("evaluates template literals with expressions", () => {
      evaluator.setContext({ x: 5, y: 3 });

      const result = evaluator.evaluate("The sum is ${x + y}", "string");

      expect(result).toBe("The sum is 8");
    });

    it("evaluates template literals with method calls", () => {
      evaluator.setContext({ text: "hello" });

      const result = evaluator.evaluate("Result: ${text.toUpperCase()}", "string");

      expect(result).toBe("Result: HELLO");
    });

    it("evaluates template literals with multiple expressions", () => {
      evaluator.setContext({ a: 10, b: 20 });

      const result = evaluator.evaluate("${a} + ${b} = ${a + b}", "string");

      expect(result).toBe("10 + 20 = 30");
    });

    it("supports literal backticks in string mode", () => {
      const result = evaluator.evaluate("Use `inline code` in text", "string");

      expect(result).toBe("Use `inline code` in text");
    });

    it("supports literal backslashes in string mode", () => {
      const result = evaluator.evaluate("Path: C:\\users\\name", "string");

      expect(result).toBe("Path: C:\\users\\name");
    });
  });

  describe("type handling", () => {
    it("evaluates number literals in script mode", () => {
      const result = evaluator.evaluate(42, "script");

      expect(result).toBe(42);
    });

    it("evaluates boolean literals in script mode", () => {
      const result = evaluator.evaluate(true, "script");

      expect(result).toBe(true);
    });
  });

  describe("error handling", () => {
    it("returns undefined for syntax errors", () => {
      const result = evaluator.evaluate("x + ", "script");

      expect(result).toBeUndefined();
    });

    it("returns undefined for undefined variable access", () => {
      evaluator.setContext({ x: 5 });

      const result = evaluator.evaluate("undefinedVar", "script");

      expect(result).toBeUndefined();
    });

    it("logs error to console on evaluation failure", () => {
      spyOn(console, "error");

      evaluator.evaluate("x +", "script");

      expect(console.error).toHaveBeenCalledWith(
        "Failed to evaluate expression",
        jasmine.objectContaining({ expression: "x +" })
      );
    });

    it("handles division by zero gracefully", () => {
      const result = evaluator.evaluate("1 / 0", "script");

      expect(result).toBe(Infinity);
    });
  });

  describe("context management", () => {
    it("updates context when setContext is called", () => {
      evaluator.setContext({ x: 5 });
      let result = evaluator.evaluate("x", "script");

      expect(result).toBe(5);

      evaluator.setContext({ x: 10 });
      result = evaluator.evaluate("x", "script");

      expect(result).toBe(10);
    });

    it("handles empty context", () => {
      evaluator.setContext({});

      const result = evaluator.evaluate("5 + 3", "script");

      expect(result).toBe(8);
    });

    it("supports multiple context variables", () => {
      evaluator.setContext({ a: 1, b: 2, c: 3, d: 4 });

      const result = evaluator.evaluate("a + b + c + d", "script");

      expect(result).toBe(10);
    });

    it("handles nested context objects", () => {
      evaluator.setContext({
        user: {
          profile: {
            firstName: "John",
            lastName: "Doe",
          },
        },
      });

      const result = evaluator.evaluate("user.profile.firstName", "script");

      expect(result).toBe("John");
    });
  });

  describe("edge cases", () => {
    it("evaluates empty string template", () => {
      const result = evaluator.evaluate("", "string");

      expect(result).toBe("");
    });

    it("evaluates ternary expressions", () => {
      evaluator.setContext({ x: 10 });

      const result = evaluator.evaluate("x > 5 ? 'yes' : 'no'", "script");

      expect(result).toBe("yes");
    });

    it("evaluates logical operators", () => {
      evaluator.setContext({ x: true, y: false });

      const result = evaluator.evaluate("x && y || true", "script");

      expect(result).toBe(true);
    });

    it("handles whitespace in expressions", () => {
      evaluator.setContext({ x: 5 });

      const result = evaluator.evaluate("  x   +   3  ", "script");

      expect(result).toBe(8);
    });

    it("supports arrow function evaluation", () => {
      evaluator.setContext({ items: [1, 2, 3] });

      const result = evaluator.evaluate("items.filter(x => x > 1)", "script");

      expect(result).toEqual([2, 3]);
    });

    it("evaluates spread operator in arrays", () => {
      evaluator.setContext({ arr: [1, 2, 3] });

      const result = evaluator.evaluate("[0, ...arr, 4]", "script");

      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
