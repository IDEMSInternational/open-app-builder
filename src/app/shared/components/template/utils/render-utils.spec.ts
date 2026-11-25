import { getPaddingValuesFromShorthand } from "./render-utils";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/utils/render-utils.spec.ts
 */
describe("Data Items Utils", () => {
  it("getPaddingValuesFromShorthand extracts correct values", () => {
    expect(getPaddingValuesFromShorthand("10px")).toEqual({
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px",
    });
    expect(getPaddingValuesFromShorthand("10px 20px")).toEqual({
      top: "10px",
      right: "20px",
      bottom: "10px",
      left: "20px",
    });
    expect(getPaddingValuesFromShorthand("10px 20px 30px")).toEqual({
      top: "10px",
      right: "20px",
      bottom: "30px",
      left: "20px",
    });
    expect(getPaddingValuesFromShorthand("10px 20px 30px 40px")).toEqual({
      top: "10px",
      right: "20px",
      bottom: "30px",
      left: "40px",
    });
  });
  it("getPaddingValuesFromShorthand gives unitless zero values a unit", () => {
    expect(getPaddingValuesFromShorthand("0 0")).toEqual({
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    });
    expect(getPaddingValuesFromShorthand("24px 0")).toEqual({
      top: "24px",
      right: "0px",
      bottom: "24px",
      left: "0px",
    });
  });
});
