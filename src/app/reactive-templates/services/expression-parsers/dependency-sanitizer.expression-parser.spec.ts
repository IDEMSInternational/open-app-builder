import { DependencySanitizerExpressionParser } from "./dependency-sanitizer.expression-parser";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/expression-parsers/dependency-sanitizer.expression-parser.spec.ts
 */

describe("DependencySanitizerExpressionParser", () => {
  let subject: DependencySanitizerExpressionParser;

  beforeEach(() => {
    subject = new DependencySanitizerExpressionParser();
  });

  it("removes parameter_list prefix from string expressions", () => {
    expect(subject.parse("${parameter_list.foo}", "string")).toBe("${foo}");
  });

  it("returns non-string values as-is", () => {
    expect(subject.parse(1, "script")).toBe(1);
    expect(subject.parse(false, "list")).toBe(false);
  });

  it("sanitizes dependency names", () => {
    expect(subject.sanitizeName("parameter_list.foo#bar|baz,qux!"))
      .withContext("should remove parameter_list prefix and invalid separator characters")
      .toBe("foobarbazqux");
  });
});
