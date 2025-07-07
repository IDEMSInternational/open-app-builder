import {
  cleanEmptyObject,
  isEmptyObjectDeep,
  isEqual,
  isObjectLiteral,
  sortJsonKeys,
  toEmptyObject,
  arrayToHashmap,
  filterObjectByKeys,
  uniqueObjectArrayKeys,
  mergeObjectArrays,
  diffObjects,
  deepMergeArrays,
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

/**
 * yarn workspace shared test --filter "Object Utils"
 */
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
  it("filterObjectByKeys", () => {
    const res = filterObjectByKeys({ keep: 1, ignore: 2 }, ["keep"]);
    expect(res).toEqual({ keep: 1 });
  });
  it("uniqueObjectArrayKeys", () => {
    const res = uniqueObjectArrayKeys([
      { a: 1, b: 2 },
      { b: 3, c: 4 },
    ]);
    expect(res).toEqual(["a", "b", "c"]);
  });
  it("uniqueObjectArrayKeys max depth", () => {
    const res = uniqueObjectArrayKeys([{ a: 1 }, { b: 2 }, { c: 3 }], 2);
    expect(res).toEqual(["a", "b"]);
  });
  it("mergeObjectArrays", () => {
    const baseArr: any[] = [
      { id: "id_1", string: "hello" },
      { id: "id_2", string: "hello", nested: { boolean: true, string: "hello" } },
    ];
    const mergeArr: any[] = [
      { id: "id_2", string: "goodbye", nested: { boolean: false, number: 1 } },
      { id: "id_3", string: "hello" },
    ];
    const mergeRes = mergeObjectArrays(baseArr, mergeArr, { keyField: "id", deep: false });
    expect(mergeRes).toEqual([
      { id: "id_1", string: "hello" },
      { id: "id_2", string: "goodbye", nested: { boolean: false, number: 1 } },
      { id: "id_3", string: "hello" },
    ]);
    const deepMergeRes = mergeObjectArrays(baseArr, mergeArr, { keyField: "id", deep: true });
    expect(deepMergeRes).toEqual([
      { id: "id_1", string: "hello" },
      { id: "id_2", string: "goodbye", nested: { boolean: false, number: 1, string: "hello" } },
      { id: "id_3", string: "hello" },
    ]);
  });
  it("diffObjects", () => {
    const a = { key_1: { string: "hello", number: 1 }, key_2: { boolean: true } };
    const b = { key_1: { string: "goodbye", number: 1 }, key_3: false };
    const res = diffObjects(a, b);
    expect(res).toEqual({
      add: [{ key: "key_3", value: false }],
      update: [{ key: "key_1", value: { string: "goodbye", number: 1 } }],
      delete: [{ key: "key_2", value: undefined }],
    });
  });

  it("deepMergeArrays", () => {
    const baseData: Record<string, any>[] = [
      { id: "1", name: "Whiskers", age: 3, details: { city: "London", country: "UK" } },
      { id: "2", name: "Mittens", age: 5, details: { city: "Edinburgh", country: "UK" } },
    ];
    const overrideData: Record<string, any>[] = [
      {
        id: "2",
        name: "Mittens",
        age: 6,
        details: { city: "Edinburgh", country: "UK", postcode: "EH1 1AA" },
      },
      { id: "3", name: "Shadow", age: 2, details: { city: "Manchester", country: "UK" } },
    ];

    const result = deepMergeArrays(baseData, overrideData, "id");

    expect(result).toEqual([
      { id: "1", name: "Whiskers", age: 3, details: { city: "London", country: "UK" } },
      {
        id: "2",
        name: "Mittens",
        age: 6,
        details: { city: "Edinburgh", country: "UK", postcode: "EH1 1AA" },
      },
      { id: "3", name: "Shadow", age: 2, details: { city: "Manchester", country: "UK" } },
    ]);
  });

  it("deepMergeArrays with custom key field", () => {
    const baseData: Record<string, any>[] = [
      { catId: "cat1", name: "Luna", preferences: { food: "salmon", playtime: true } },
      { catId: "cat2", name: "Oliver", preferences: { food: "chicken", playtime: false } },
    ];
    const overrideData: Record<string, any>[] = [
      {
        catId: "cat2",
        name: "Oliver",
        preferences: { food: "tuna", playtime: true, toys: "feathers" },
      },
    ];

    const result = deepMergeArrays(baseData, overrideData, "catId");

    expect(result).toEqual([
      { catId: "cat1", name: "Luna", preferences: { food: "salmon", playtime: true } },
      {
        catId: "cat2",
        name: "Oliver",
        preferences: { food: "tuna", playtime: true, toys: "feathers" },
      },
    ]);
  });

  it("deepMergeArrays with empty arrays", () => {
    const result1 = deepMergeArrays([], []);
    expect(result1).toEqual([]);

    const result2 = deepMergeArrays([{ id: "1", name: "Whiskers" }], []);
    expect(result2).toEqual([{ id: "1", name: "Whiskers" }]);

    const result3 = deepMergeArrays([], [{ id: "1", name: "Whiskers" }]);
    expect(result3).toEqual([{ id: "1", name: "Whiskers" }]);
  });

  it("deepMergeArrays with default id key", () => {
    const baseData = [
      { id: "1", name: "Whiskers" },
      { id: "2", name: "Mittens" },
    ];
    const overrideData = [{ id: "2", name: "Mittens" }];

    const result = deepMergeArrays(baseData, overrideData);

    expect(result).toEqual([
      { id: "1", name: "Whiskers" },
      { id: "2", name: "Mittens" },
    ]);
  });
});
