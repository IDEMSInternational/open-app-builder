import { getScopeFallbackCandidates } from "./scope-fallback.utils";

describe("getScopeFallbackCandidates", () => {
  it("returns names from the most-specific scope to the root", () => {
    expect(getScopeFallbackCandidates("a.b.c.value")).toEqual([
      "a.b.c.value",
      "a.b.value",
      "a.value",
      "value",
    ]);
  });

  it("returns the name unchanged when it has no scope", () => {
    expect(getScopeFallbackCandidates("value")).toEqual(["value"]);
  });
});
