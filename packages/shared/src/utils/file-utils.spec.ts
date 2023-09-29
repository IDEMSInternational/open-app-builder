import { setNestedProperty, sortJsonKeys } from "./file-utils";

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

describe("sortJsonKeys", () => {
  it("Sorts nested json by key", () => {
    const input = {
      b: "foo",
      c: null,
      a: {
        f: 6,
        e: 5,
      },
      d: [],
    };
    const res = sortJsonKeys(input);
    expect(Object.keys(res)).toEqual(["a", "b", "c", "d"]);
    expect(Object.keys(res.a)).toEqual(["e", "f"]);
    expect(Object.values(res.a)).toEqual([5, 6]);
  });
});
