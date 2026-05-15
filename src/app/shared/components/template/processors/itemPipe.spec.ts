import { ItemDataPipe } from "./itemPipe";

// yarn ng test --include src/app/shared/components/template/processors/itemPipe.spec.ts

const TEST_ITEMS = () => [
  { id: "a", value: 3 },
  { id: "b", value: 1 },
  { id: "c", value: 2 },
];

describe("ItemDataPipe", () => {
  let pipe: ItemDataPipe;

  beforeEach(() => {
    pipe = new ItemDataPipe();
  });

  it("filter - returns items matching expression", () => {
    const result = pipe.process(TEST_ITEMS(), [{ name: "filter", arg: "this.item.value > 1" }]);
    expect(result.map((r) => r.id)).toEqual(["a", "c"]);
  });

  it("filter - returns empty array when no items match", () => {
    const result = pipe.process(TEST_ITEMS(), [{ name: "filter", arg: "this.item.value > 10" }]);
    expect(result).toEqual([]);
  });

  it("sort - sorts items by field ascending", () => {
    const result = pipe.process(TEST_ITEMS(), [{ name: "sort", arg: "value" }]);
    expect(result.map((r) => r.value)).toEqual([1, 2, 3]);
  });

  it("reverse - reverses item order", () => {
    const result = pipe.process(TEST_ITEMS(), [{ name: "reverse" }]);
    expect(result.map((r) => r.id)).toEqual(["c", "b", "a"]);
  });

  it("limit - returns first n items", () => {
    const result = pipe.process(TEST_ITEMS(), [{ name: "limit", arg: "2" }]);
    expect(result.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("applies multiple operations in sequence", () => {
    // sort ascending then limit 2 → lowest two values
    const result = pipe.process(TEST_ITEMS(), [
      { name: "sort", arg: "value" },
      { name: "limit", arg: "2" },
    ]);
    expect(result.map((r) => r.value)).toEqual([1, 2]);
  });
});
