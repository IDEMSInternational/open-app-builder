import {
  cleanEmptyObject,
  isEmptyObjectDeep,
  isEqual,
  isObjectLiteral,
  sortJsonKeys,
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
    expect(res).toEqual({
      obj_1: { obj_1_1: { obj_1_1_1: {} }, obj_1_2: { obj_1_2_1: {} } },
    } as any);
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

  it("sortJsonKeys", () => {
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
  it("isEqual", () => {
    // equality deep check
    expect(
      isEqual(
        {
          string: "hello",
          array: [1, "a", null],
          nested: {
            array: [2],
          },
          null: null,
        },
        {
          string: "hello",
          array: [1, "a", null],
          nested: {
            array: [2],
          },
          null: null,
        }
      )
    ).toEqual(true);
    // inequality deep check
    expect(
      isEqual(
        {
          string: "hello",
          array: [1, "a", null, "additional"],
          nested: {
            array: [2],
          },
          null: null,
        },
        {
          string: "hello",
          array: [1, "a", null],
          nested: {
            array: [2],
          },
          null: null,
        }
      )
    ).toEqual(false);
  });
});
