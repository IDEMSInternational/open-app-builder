import { generateRequestKey, shorthandToMilliseconds, shorthandToTime } from "./http.utils";

describe("HttpUtils", () => {
  describe("generateRequestKey", () => {
    it("should combine method and URL", () => {
      const key = generateRequestKey({ method: "get", url: "https://example.com/api" });
      expect(key).toBe("GET|https://example.com/api");
    });

    it("should normalize method to uppercase", () => {
      const key = generateRequestKey({ method: "post", url: "https://example.com/api" });
      expect(key).toBe("POST|https://example.com/api");
    });

    it("should remove trailing slash from URL", () => {
      const key1 = generateRequestKey({ method: "GET", url: "https://example.com/api/" });
      const key2 = generateRequestKey({ method: "GET", url: "https://example.com/api" });
      expect(key1).toBe("GET|https://example.com/api");
      expect(key1).toBe(key2);
    });

    it("should preserve query parameters", () => {
      const key = generateRequestKey({
        method: "GET",
        url: "https://example.com/api?foo=bar&baz=qux",
      });
      expect(key).toBe("GET|https://example.com/api?foo=bar&baz=qux");
    });
  });

  describe("shorthandToMilliseconds", () => {
    it("should return undefined for undefined input", () => {
      expect(shorthandToMilliseconds(undefined)).toBeUndefined();
    });

    it("should return the number if input is a number", () => {
      expect(shorthandToMilliseconds(1234)).toBe(1234);
    });

    it("should parse 'ms' unit", () => {
      expect(shorthandToMilliseconds("500ms")).toBe(500);
      expect(shorthandToMilliseconds("500 ms")).toBe(500);
    });

    it("should parse 's' unit", () => {
      expect(shorthandToMilliseconds("1s")).toBe(1000);
      expect(shorthandToMilliseconds("2.5s")).toBe(2500);
    });

    it("should parse 'm' unit", () => {
      expect(shorthandToMilliseconds("1m")).toBe(60000);
      expect(shorthandToMilliseconds("0.5m")).toBe(30000);
    });

    it("should parse 'h' and 'hr' unit", () => {
      expect(shorthandToMilliseconds("1h")).toBe(3600000);
      expect(shorthandToMilliseconds("1hr")).toBe(3600000);
    });

    it("should parse 'd' unit", () => {
      expect(shorthandToMilliseconds("1d")).toBe(86400000);
    });

    it("should handle numeric strings", () => {
      expect(shorthandToMilliseconds("1000")).toBe(1000);
    });

    it("should throw error for unsupported formats", () => {
      expect(() => shorthandToMilliseconds("1w")).toThrowError(/Unsupported time format/);
      expect(() => shorthandToMilliseconds("abc")).toThrowError(/Unsupported time format/);
    });

    it("should throw TypeError for invalid types", () => {
      expect(() => shorthandToMilliseconds({} as any)).toThrowError(
        "Time must be a string or a number."
      );
    });
  });

  describe("shorthandToTime", () => {
    const mockNow = new Date("2024-01-01T00:00:00Z");

    it("should return current time if shorthand is undefined", () => {
      const time = shorthandToTime(undefined, mockNow);
      expect(time).toBe(mockNow.getTime());
    });

    it("should add milliseconds to provided base date", () => {
      const time = shorthandToTime("1m", mockNow);
      expect(time).toBe(mockNow.getTime() + 60000);
    });

    it("should use current date if none provided", () => {
      const now = Date.now();
      const time = shorthandToTime("1s");
      // Allow 100ms tolerance for execution time
      expect(time).toBeGreaterThanOrEqual(now + 1000);
      expect(time).toBeLessThanOrEqual(now + 1100);
    });
  });
});
