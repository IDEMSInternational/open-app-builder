import { PLH_CALC_FUNCTIONS } from "./plh-calc-functions";

/** Testing mock input. Called as function to avoid manipulation across tests */
const MOCK_FAMILES = () => [["Ada", "Blaise"], ["Charles"], ["Daniel", "Eva"]];

/**
 * Unit tests for plh calc functions (do not require angular test runner but implemented here for convenience)
 * yarn ng test --include src\app\shared\components\template\services\template-calc-functions\plh-calc-functions.spec.ts
 */
describe("Template Calc - PLH Functions", () => {
  it("Add family", () => {
    const res = PLH_CALC_FUNCTIONS.plh_add_family(MOCK_FAMILES(), "Friedrich", "Graham", "Hannah");
    expect(res).toEqual([
      ["Ada", "Blaise"],
      ["Charles"],
      ["Daniel", "Eva"],
      ["Friedrich", "Graham", "Hannah"],
    ]);
  });
  it("Merges families", () => {
    const res = PLH_CALC_FUNCTIONS.plh_merge_families(MOCK_FAMILES(), "Daniel", "Ada");
    expect(res).toEqual([["Ada", "Blaise", "Daniel", "Eva"], ["Charles"]]);
  });
  it("Removes family member", () => {
    const res = PLH_CALC_FUNCTIONS.plh_remove_family_member(MOCK_FAMILES(), "Charles");
    expect(res).toEqual([
      ["Ada", "Blaise"],
      ["Daniel", "Eva"],
    ]);
  });
});
