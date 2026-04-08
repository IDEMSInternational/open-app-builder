import { authorDateParamToIso8601, parseStringValue } from "./string-utils";

describe("string-utils", () => {
  describe("authorDateParamToIso8601", () => {
    it("returns undefined for empty or whitespace-only input", () => {
      expect(authorDateParamToIso8601("", false)).toBeUndefined();
      expect(authorDateParamToIso8601("", true)).toBeUndefined();
      expect(authorDateParamToIso8601("   ", false)).toBeUndefined();
    });

    it("extends YYYY-MM-DD to start of UTC day when endOfDay is false", () => {
      expect(authorDateParamToIso8601("2023-01-01", false)).toBe("2023-01-01T00:00:00.000Z");
    });

    it("extends YYYY-MM-DD to end of UTC day when endOfDay is true", () => {
      expect(authorDateParamToIso8601("2023-01-01", true)).toBe("2023-01-01T23:59:59.999Z");
    });

    it("trims surrounding whitespace before parsing", () => {
      expect(authorDateParamToIso8601("  2023-06-15  ", false)).toBe("2023-06-15T00:00:00.000Z");
    });

    it("normalizes full date-time strings via Date.parse + toISOString", () => {
      expect(authorDateParamToIso8601("2023-06-15T12:30:00.000Z", false)).toBe(
        "2023-06-15T12:30:00.000Z"
      );
    });

    it("returns undefined for unparseable strings", () => {
      expect(authorDateParamToIso8601("not-a-date", false)).toBeUndefined();
    });
  });

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
