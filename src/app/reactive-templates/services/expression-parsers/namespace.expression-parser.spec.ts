import { NamespaceExpressionParser } from "./namespace.expression-parser";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/expression-parsers/namespace.expression-parser.spec.ts
 */

describe("NamespaceExpressionParser", () => {
  let subject: NamespaceExpressionParser;

  beforeEach(() => {
    subject = new NamespaceExpressionParser();
  });

  it("converts local variable references to include namespace", () => {
    const expression = "local.foo + local.bar.baz";

    expect(subject.parse(expression, "myNs")).toBe("local.myNs.foo + local.myNs.bar.baz");
  });

  it("converts local references inside template placeholders", () => {
    const expression = "Hello ${local.name}, count=${local.meta.count}";

    expect(subject.parse(expression, "screen_1")).toBe(
      "Hello ${local.screen_1.name}, count=${local.screen_1.meta.count}"
    );
  });

  it("does not alter non-local roots", () => {
    const expression = "global.foo + system.env + loop.item.value";

    expect(subject.parse(expression, "myNs")).toBe(expression);
  });

  it("does not double-prefix already namespaced local paths", () => {
    const expression = "local.myNs.foo + local.bar";

    expect(subject.parse(expression, "myNs")).toBe("local.myNs.foo + local.myNs.bar");
  });

  it("does not rewrite local references used as object properties", () => {
    const expression = "other.local.foo + local.bar";

    expect(subject.parse(expression, "myNs")).toBe("other.local.foo + local.myNs.bar");
  });

  it("returns original expression when namespace is empty", () => {
    const expression = "local.foo + local.bar";

    expect(subject.parse(expression, "")).toBe(expression);
  });

  it("returns non-string values as-is", () => {
    expect(subject.parse(42, "myNs")).toBe(42);
    expect(subject.parse(true, "myNs")).toBe(true);
  });
});
