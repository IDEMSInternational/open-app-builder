import { basenameFromExternalUrl, isExternalHttpUrl, parseStringValue } from "./string-utils";

describe("string-utils", () => {
  describe("isExternalHttpUrl", () => {
    it("returns true for http and https URLs", () => {
      expect(isExternalHttpUrl("https://example.com/file.png")).toBe(true);
      expect(isExternalHttpUrl("http://localhost:4200/assets/x.png")).toBe(true);
      expect(isExternalHttpUrl("HTTPS://EXAMPLE.COM/")).toBe(true);
    });

    it("returns false for non-http(s) values", () => {
      expect(isExternalHttpUrl("assets/global/icon.png")).toBe(false);
      expect(isExternalHttpUrl("ftp://files.example.com/a")).toBe(false);
      expect(isExternalHttpUrl("")).toBe(false);
    });
  });

  describe("basenameFromExternalUrl", () => {
    it("returns the last path segment, sanitized for filenames", () => {
      expect(
        basenameFromExternalUrl("https://storage.example.com/bucket/folder/abc123def456.png")
      ).toBe("abc123def456.png");
    });

    it("strips characters invalid in filenames", () => {
      expect(basenameFromExternalUrl("https://x.com/folder/foo:bar.png")).toBe("foo_bar.png");
    });

    it("returns undefined when no basename can be derived", () => {
      expect(basenameFromExternalUrl("https://example.com")).toBeUndefined();
      expect(basenameFromExternalUrl("not-a-url")).toBeUndefined();
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
