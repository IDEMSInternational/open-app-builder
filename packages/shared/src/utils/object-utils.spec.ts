import {
  cleanEmptyObject,
  isEmptyObjectDeep,
  isEqual,
  isObjectLiteral,
  sortJsonKeys,
  toEmptyObject,
  arrayToHashmap,
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
    // literal object with different order
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toEqual(true);
    // inequality deep check
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
          array: [1, "a", null, false],
          nested: {
            array: [2],
          },
          null: null,
        }
      )
    ).toEqual(false);
  });
  it("arrayToHashmap", () => {
    const arr = [
      { id: "id_1", number: 1 },
      { id: "id_2", number: 2 },
    ];
    const res = arrayToHashmap(arr, "id");
    expect(res).toEqual({
      id_1: { id: "id_1", number: 1 },
      id_2: { id: "id_2", number: 2 },
    });
  });

  it("arrayToHashmap duplicate key", () => {
    const arr = [
      { id: "id_1", number: 1 },
      { id: "id_2", number: 2 },
      { id: "id_2", number: 2.1 },
    ];
    const res = arrayToHashmap(arr, "id", (k) => `${k}_duplicate`);
    expect(res).toEqual({
      id_1: { id: "id_1", number: 1 },
      id_2: { id: "id_2", number: 2 },
      id_2_duplicate: { id: "id_2", number: 2.1 },
    });
  });
});
