import { LegacyVariableExpressionParser } from "./legacy-variable.expression-parser";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/expression-parsers/legacy-variable.expression-parser.spec.ts
 */

describe("LegacyVariableExpressionParser", () => {
  let subject: LegacyVariableExpressionParser;

  beforeEach(() => {
    subject = new LegacyVariableExpressionParser();
  });

  it("converts @local paths to template placeholder syntax", () => {
    const expression = "Hello @local.user.name";

    expect(subject.parse(expression, "string")).toBe("Hello ${local.user.name}");
  });

  it("converts @global and @system paths to template placeholder syntax", () => {
    const expression = "Globals: @global.app.name and @system.device.locale";

    expect(subject.parse(expression, "string")).toBe(
      "Globals: ${global.app.name} and ${system.device.locale}"
    );
  });

  it("converts multiple legacy variables in the same expression", () => {
    const expression = "@local.first and @local.second.value";

    expect(subject.parse(expression, "string")).toBe("${local.first} and ${local.second.value}");
  });

  it("converts @item paths to loop field placeholders", () => {
    const expression = "Item: @item.value";

    expect(subject.parse(expression, "string")).toBe("Item: ${loop.item.value}");
  });

  it("converts legacy variables to bare references in script mode", () => {
    const expression = "@local.user.name + @item.value + @count + @is_first";

    expect(subject.parse(expression, "script")).toBe(
      "local.user.name + loop.value + loop.count + loop.is_first"
    );
  });

  it("converts @global and @system to bare references in script mode", () => {
    const expression = "@global.flags.enabled && @system.meta.online";

    expect(subject.parse(expression, "script")).toBe("global.flags.enabled && system.meta.online");
  });

  it("converts loop metadata aliases", () => {
    const expression = "@index of @count, first=@is_first, last=@is_last";

    expect(subject.parse(expression, "string")).toBe(
      "${loop.index} of ${loop.count}, first=${loop.is_first}, last=${loop.is_last}"
    );
  });

  it("converts first and last item aliases", () => {
    const expression = "first: @first.value, last: @last.value";

    expect(subject.parse(expression, "string")).toBe(
      "first: ${loop.first.value}, last: ${loop.last.value}"
    );
  });

  it("does not convert values that are already inside template placeholders", () => {
    const expression = "${@local.user.name} ${@item.value} ${@index}";

    expect(subject.parse(expression, "string")).toBe(expression);
  });

  it("does not wrap already templated values in script mode", () => {
    const expression = "${@local.user.name} && @item.value";

    expect(subject.parse(expression, "script")).toBe("${@local.user.name} && loop.value");
  });

  it("does not convert when @local is part of another token", () => {
    const expression = "contact@local.domain and label@item.value";

    expect(subject.parse(expression, "string")).toBe(expression);
  });

  it("returns non-string values as-is", () => {
    expect(subject.parse(42, "string")).toBe(42);
    expect(subject.parse(true, "string")).toBe(true);
  });

  it("does not convert when new syntax is used", () => {
    const expression = "local.someVar.foo";

    expect(subject.parse(expression, "script")).toBe(expression);
  });
});
