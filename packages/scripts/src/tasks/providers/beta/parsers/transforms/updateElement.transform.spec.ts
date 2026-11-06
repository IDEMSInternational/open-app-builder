import { updateElement } from "./updateElement.transform";

/** yarn workspace scripts test -t updateElement.transform.spec.ts */
describe("Beta updateElement transform", () => {
  it("adds the key when missing", () => {
    expect(updateElement({ a: 1 }, "_source", { folder: "" })).toEqual({
      a: 1,
      _source: { folder: "" },
    });
  });

  it("replaces all existing contents without changing the original", () => {
    const input = { a: 1, _source: { url: "x", path: "y.xlsx" } };
    expect(updateElement(input, "_source", { folder: "local" })).toEqual({
      a: 1,
      _source: { folder: "local" },
    });
    expect(input).toEqual({ a: 1, _source: { url: "x", path: "y.xlsx" } });
  });
});
