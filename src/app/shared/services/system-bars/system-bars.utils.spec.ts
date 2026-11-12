import {
  flattenColours,
  isLightColour,
  parseCssColour,
  relativeLuminance,
} from "./system-bars.utils";

describe("system-bars utils", () => {
  it("parses computed css colours", () => {
    expect(parseCssColour("rgb(10, 20, 30)")).toEqual([10, 20, 30, 1]);
    expect(parseCssColour("rgba(10, 20, 30, 0.5)")).toEqual([10, 20, 30, 0.5]);
    expect(parseCssColour("rgb(10 20 30 / 50%)")).toEqual([10, 20, 30, 0.5]);
    expect(parseCssColour("rgba(0, 0, 0, 0)")).toEqual([0, 0, 0, 0]);
    expect(parseCssColour("color(srgb 1 0 0)")).toBeNull();
    expect(parseCssColour("")).toBeNull();
  });

  it("flattens layers from the top down", () => {
    // opaque top layer hides the rest
    expect(
      flattenColours([
        [10, 20, 30, 1],
        [200, 200, 200, 1],
      ])
    ).toEqual([10, 20, 30, 1]);
    // transparent layers are skipped
    expect(
      flattenColours([
        [0, 0, 0, 0],
        [200, 100, 50, 1],
      ])
    ).toEqual([200, 100, 50, 1]);
    // 60% black over white, as with a pop-up backdrop
    const [r, g, b] = flattenColours([
      [0, 0, 0, 0.6],
      [255, 255, 255, 1],
    ]);
    expect([r, g, b].map((v) => Math.round(v))).toEqual([102, 102, 102]);
    // falls back to the base colour
    expect(flattenColours([], [1, 2, 3, 1])).toEqual([1, 2, 3, 1]);
  });

  it("calculates relative luminance", () => {
    expect(relativeLuminance([0, 0, 0, 1])).toBe(0);
    expect(relativeLuminance([255, 255, 255, 1])).toBeCloseTo(1);
  });

  it("identifies colours that need dark text", () => {
    expect(isLightColour([255, 255, 255, 1])).toBeTrue();
    expect(isLightColour([245, 250, 255, 1])).toBeTrue();
    expect(isLightColour([243, 156, 18, 1])).toBeTrue();
    expect(isLightColour([14, 62, 95, 1])).toBeFalse();
    expect(isLightColour([0, 0, 0, 1])).toBeFalse();
  });
});
