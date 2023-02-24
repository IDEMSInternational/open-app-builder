import { setNestedProperty } from "./file-utils";

describe("setNestedProperty", () => {
  it("Sets object deep property", () => {
    const res = setNestedProperty("a.b.c", 1);
    expect(res).toEqual({ a: { b: { c: 1 } } });
  });
  it("Preserves deep properties", () => {
    const obj = { a: { b: { d: 2 } } };
    const res = setNestedProperty<any>("a.b.c", 1, obj);
    expect(res).toEqual({ a: { b: { c: 1, d: 2 } } });
  });
  it("Supports variable properties", () => {
    const varProperty = "c";
    const res = setNestedProperty<any>(`a.b.${varProperty}`, 1);
    expect(res).toEqual({ a: { b: { c: 1 } } });
  });
});
