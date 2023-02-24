import * as FileUtils from "./file-utils";

describe("setNestedProperty", () => {
  it("Sets object deep property", () => {
    expect(FileUtils.setNestedProperty("a.b.c", 1, undefined)).toEqual({
      a: { b: { c: 1 } },
    });
  });
  it("Preserves deep properties", () => {
    const res = FileUtils.setNestedProperty<any>("a.b.c", 1, {
      a: { b: { d: 2 } },
    });
    expect(res).toEqual({
      a: { b: { c: 1, d: 2 } },
    });
  });
  it("Supports variable properties", () => {
    const varProperty = "c";
    const res = FileUtils.setNestedProperty<any>(`a.b.${varProperty}`, 1);
    expect(res).toEqual({
      a: { b: { c: 1 } },
    });
  });
});
