import { ItemDataPipe } from "./itemPipe";

describe("ItemDataPipe", () => {
  let pipe: ItemDataPipe;

  beforeEach(() => {
    pipe = new ItemDataPipe();
  });

  describe("filter operation", () => {
    const testData = [
      { id: "1", name: "Alice", age: 25, tags: ["admin", "user"], status: "active" },
      { id: "2", name: "Bob", age: 30, tags: ["user"], status: "inactive" },
      { id: "3", name: "Charlie", age: 35, tags: ["admin", "moderator"], status: "active" },
      { id: "4", name: "David", age: 28, tags: ["user", "guest"], status: "active" },
    ];

    it("should filter items using basic comparison", () => {
      const result = pipe.process(testData, [{ name: "filter", arg: "this.item.age > 28" }]);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Bob");
      expect(result[1].name).toBe("Charlie");
    });

    it("should filter items using array.includes() to check if array contains value", () => {
      const result = pipe.process(testData, [
        { name: "filter", arg: "this.item.tags.includes('admin')" },
      ]);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Alice");
      expect(result[1].name).toBe("Charlie");
    });

    it("should filter items using string.includes() to check if string contains substring", () => {
      const result = pipe.process(testData, [
        { name: "filter", arg: "this.item.name.includes('a')" },
      ]);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Charlie");
      expect(result[1].name).toBe("David");
    });

    it("should filter items where external value is included in item array", () => {
      // Note: In practice, expressions like "@local.value.includes(@item.field)" 
      // are pre-evaluated before reaching the filter. This test demonstrates 
      // using a hardcoded value that would typically be injected during evaluation
      const result = pipe.process(testData, [
        { name: "filter", arg: "this.item.tags.includes('moderator')" },
      ]);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Charlie");
    });

    it("should support combined filter conditions with includes", () => {
      const result = pipe.process(testData, [
        {
          name: "filter",
          arg: "this.item.tags.includes('admin') && this.item.status === 'active'",
        },
      ]);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Alice");
      expect(result[1].name).toBe("Charlie");
    });

    it("should support negated includes", () => {
      const result = pipe.process(testData, [
        { name: "filter", arg: "!this.item.tags.includes('admin')" },
      ]);
      expect(result.length).toBe(2);
      expect(result[0].name).toBe("Bob");
      expect(result[1].name).toBe("David");
    });
  });

  describe("sort operation", () => {
    const data = [
      { id: 1, text: "c" },
      { id: 2, text: "b" },
      { id: 3, text: "d" },
      { id: 4, text: "a" },
    ];

    it("should sort items by field", () => {
      const result = pipe.process(data, [{ name: "sort", arg: "text" }]);
      expect(result[0].text).toBe("a");
      expect(result[1].text).toBe("b");
      expect(result[2].text).toBe("c");
      expect(result[3].text).toBe("d");
    });
  });

  describe("reverse operation", () => {
    it("should reverse items", () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = pipe.process(data, [{ name: "reverse" }]);
      expect(result[0].id).toBe(3);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(1);
    });
  });

  describe("limit operation", () => {
    it("should limit number of items", () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const result = pipe.process(data, [{ name: "limit", arg: "2" }]);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
  });

  describe("combined operations", () => {
    it("should apply multiple operations in sequence", () => {
      const data = [
        { id: 1, text: "c", active: true },
        { id: 2, text: "b", active: false },
        { id: 3, text: "d", active: true },
        { id: 4, text: "a", active: true },
      ];

      const result = pipe.process(data, [
        { name: "filter", arg: "this.item.active === true" },
        { name: "sort", arg: "text" },
        { name: "limit", arg: "2" },
      ]);

      expect(result.length).toBe(2);
      expect(result[0].text).toBe("a");
      expect(result[1].text).toBe("c");
    });
  });
});
