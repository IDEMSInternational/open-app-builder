import { NumericSegmentExpressionParser } from "./numeric-segment.expression-parser";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/expression-parsers/numeric-segment.expression-parser.spec.ts
 */

describe("NumericSegmentExpressionParser", () => {
  let subject: NumericSegmentExpressionParser;

  beforeEach(() => {
    subject = new NumericSegmentExpressionParser();
  });

  it("converts numeric dot segments to bracket notation", () => {
    const expression = "${local.myvar.0.something}";

    expect(subject.parse(expression, "", "string")).toBe('${local.myvar["0"].something}');
  });

  it("converts numeric segments in script expressions", () => {
    const expression = "local.myvar.0.something + global.items.12.value";

    expect(subject.parse(expression, "", "script")).toBe(
      'local.myvar["0"].something + global.items["12"].value'
    );
  });

  it("converts mixed segments that start with a number", () => {
    const expression = "local.myvar.0startswithnumber.something";

    expect(subject.parse(expression, "", "script")).toBe(
      'local.myvar["0startswithnumber"].something'
    );
  });

  it("does not change non-numeric path segments", () => {
    const expression = "local.myvar.zero.something";

    expect(subject.parse(expression, "", "script")).toBe(expression);
  });

  it("returns non-string values as-is", () => {
    expect(subject.parse(42, "", "script")).toBe(42);
    expect(subject.parse(false, "", "script")).toBe(false);
  });
});
