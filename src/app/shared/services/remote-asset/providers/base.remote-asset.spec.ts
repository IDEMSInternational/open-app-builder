import { appendCacheBuster, isAbortError } from "./base.remote-asset";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/providers/base.remote-asset.spec.ts
 */
describe("appendCacheBuster", () => {
  it("adds a query string to a url that has none", () => {
    expect(appendCacheBuster("https://cdn.example.com/pack.json")).toMatch(
      /^https:\/\/cdn\.example\.com\/pack\.json\?_oab_ts=\d+$/
    );
  });

  it("appends to an existing query string rather than replacing it", () => {
    // Firebase download URLs always carry `?alt=media`, which must survive
    expect(appendCacheBuster("https://cdn.example.com/pack.json?alt=media")).toMatch(
      /^https:\/\/cdn\.example\.com\/pack\.json\?alt=media&_oab_ts=\d+$/
    );
  });

  it("produces a different url on each call", async () => {
    const first = appendCacheBuster("https://cdn.example.com/pack.json");
    await new Promise((resolve) => setTimeout(resolve, 2));
    expect(appendCacheBuster("https://cdn.example.com/pack.json")).not.toEqual(first);
  });
});

describe("isAbortError", () => {
  it("recognises the DOMException fetch rejects with on abort", () => {
    // The reason this exists: DOMException is not reliably an `instanceof Error`, so a check on
    // the prototype chain would let a cancelled transfer be retried as a download failure
    expect(isAbortError(new DOMException("The operation was aborted", "AbortError"))).toBeTrue();
  });

  it("recognises anything else named AbortError", () => {
    expect(isAbortError({ name: "AbortError" })).toBeTrue();
  });

  it("does not treat a genuine network failure as an abort", () => {
    expect(isAbortError(new TypeError("Failed to fetch"))).toBeFalse();
    expect(isAbortError(new Error("boom"))).toBeFalse();
  });

  it("tolerates a thrown null or undefined", () => {
    expect(isAbortError(null)).toBeFalse();
    expect(isAbortError(undefined)).toBeFalse();
  });
});
