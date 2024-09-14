import {
  cleanEmptyObject,
  isEmptyObjectDeep,
  isObjectLiteral,
  toEmptyObject,
} from "./object-utils";

const MOCK_NESTED_OBJECT = {
  obj_1: {
    obj_1_1: {
      number: 2,
      obj_1_1_1: {},
    },
    obj_1_2: {
      obj_1_2_1: {},
    },
  },
  string: "hi",
  number: 1,
};

describe("Object Utils", () => {
  it("isObjectLiteral", () => {
    expect(isObjectLiteral({})).toEqual(true);
    expect(isObjectLiteral({ string: "hello" })).toEqual(true);
    expect(isObjectLiteral(undefined)).toEqual(false);
    expect(isObjectLiteral([])).toEqual(false);
    expect(isObjectLiteral(new Date())).toEqual(false);
  });

  it("isEmptyObjectDeep", () => {
    expect(isEmptyObjectDeep({})).toEqual(true);
    expect(isEmptyObjectDeep(undefined)).toEqual(false);
    expect(isEmptyObjectDeep({ key: { key: { key: {} } } })).toEqual(true);
    expect(isEmptyObjectDeep({ key: { key: { key: undefined } } })).toEqual(false);
  });

  it("toEmptyObject", () => {
    const res = toEmptyObject(MOCK_NESTED_OBJECT);
    expect(res).toEqual({ obj_1: { obj_1_1: { obj_1_1_1: {} }, obj_1_2: { obj_1_2_1: {} } } });
  });

  it("cleanEmptyObject", () => {
    const res = cleanEmptyObject(MOCK_NESTED_OBJECT);
    expect(res).toEqual({
      obj_1: {
        obj_1_1: {
          number: 2,
        },
      },
      string: "hi",
      number: 1,
    });
  });
});
