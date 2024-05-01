import { parseStringValue } from "./string-utils";

describe("string-utils", () => {
  it("parses string values", () => {
    const test_non_string = parseStringValue({ test: "hello" } as any);
    expect(test_non_string).toEqual({ test: "hello" });
    const test_a_string = parseStringValue("My test string");
    expect(test_a_string).toEqual("My test string");
    const test_empty_string = parseStringValue("");
    expect(test_empty_string).toEqual("");
    const test_float = parseStringValue("-5.25");
    expect(test_float).toEqual(-5.25);
    const test_boolean = parseStringValue("TrUe");
    expect(test_boolean).toEqual(true);
    const test_null = parseStringValue("null");
    expect(test_null).toEqual(null);
    const test_undefined = parseStringValue("undefined");
    expect(test_undefined).toEqual(undefined);
    const test_whitespace = parseStringValue(" 2 ");
    expect(test_whitespace).toEqual(2);
    const test_quoted = parseStringValue('"2"');
    expect(test_quoted).toEqual("2");
  });
});
