import { TestBed } from "@angular/core/testing";
import { LoopItemEvaluator } from "./loop-item.evaluator";
import { VariableStore } from "../../stores/variable-store";
import { RowRegistry } from "../row.registry";
import { Parameter } from "../../reactive-components/parameters";
import { signal } from "@angular/core";

describe("LoopItemEvaluator", () => {
  let subject: LoopItemEvaluator;
  let mockVariableStore: jasmine.SpyObj<VariableStore>;
  let mockRowRegistry: jasmine.SpyObj<RowRegistry>;

  beforeEach(() => {
    mockVariableStore = jasmine.createSpyObj("VariableStore", ["has", "get"]);
    mockRowRegistry = jasmine.createSpyObj("RowRegistry", ["has", "get"]);

    TestBed.configureTestingModule({
      providers: [
        LoopItemEvaluator,
        { provide: VariableStore, useValue: mockVariableStore },
        { provide: RowRegistry, useValue: mockRowRegistry },
      ],
    });

    subject = TestBed.inject(LoopItemEvaluator);
  });

  describe("without custom index", () => {
    beforeEach(() => {
      // Setup mocks for no custom index
      mockVariableStore.has.and.returnValue(true);
      mockRowRegistry.has.and.returnValue(true);
      mockRowRegistry.get.and.returnValue({
        name: signal("mockRow"),
        value: signal(() => undefined),
        setExpression: () => {},
        params: { index: new Parameter("index", null) },
      });
      mockVariableStore.get.and.returnValue([
        { name: "Alpha", value: 10 },
        { name: "Beta", value: 20 },
      ]);
    });

    it("replaces @index", () => {
      const result = subject.evaluate("The index is @index", "loop.1");
      expect(result).toBe("The index is 1");
    });

    it("replaces @item", () => {
      const result = subject.evaluate("The item is @item", "loop.1");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @item.name", () => {
      const result = subject.evaluate("The item name is @item.name", "loop.1");
      expect(result).toBe("The item name is Beta");
    });

    it("replaces @item.name and @index", () => {
      const result = subject.evaluate("This item name is @item.name and index is @index", "loop.1");
      expect(result).toBe("This item name is Beta and index is 1");
    });

    it("replaces @item.name and @item.value", () => {
      const result = subject.evaluate(
        "The item name is @item.name and the value is @item.value",
        "loop.1"
      );
      expect(result).toBe("The item name is Beta and the value is 20");
    });

    it("replaces @first", () => {
      const result = subject.evaluate("The item is @first", "loop.1");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @first.name", () => {
      const result = subject.evaluate("The item name is @first.name", "loop.1");
      expect(result).toBe("The item name is Alpha");
    });

    it("replaces @last", () => {
      const result = subject.evaluate("The item is @last", "loop.1");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @last.name", () => {
      const result = subject.evaluate("The item name is @last.name", "loop.1");
      expect(result).toBe("The item name is Beta");
    });
  });

  describe("with custom index", () => {
    beforeEach(() => {
      // Setup mocks for custom index
      mockVariableStore.has.and.returnValue(true);
      mockRowRegistry.has.and.returnValue(true);
      mockRowRegistry.get.and.returnValue({
        name: signal("mockRow"),
        value: signal(() => undefined),
        setExpression: () => {},
        params: { index: new Parameter("index", "name") },
      });
      mockVariableStore.get.and.returnValue([
        { name: "Alpha", value: 10 },
        { name: "Beta", value: 20 },
      ]);
    });

    it("replaces @index with custom index", () => {
      const result = subject.evaluate("The index is @index", "loop.Beta");
      expect(result).toBe("The index is Beta");
    });

    it("replaces @item with custom index", () => {
      const result = subject.evaluate("The item is @item", "loop.Beta");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @item.name with custom index", () => {
      const result = subject.evaluate("The item name is @item.name", "loop.Beta");
      expect(result).toBe("The item name is Beta");
    });

    it("replaces @item.name and @index with custom index", () => {
      const result = subject.evaluate(
        "This item name is @item.name and index is @index",
        "loop.Beta"
      );
      expect(result).toBe("This item name is Beta and index is Beta");
    });

    it("replaces @item.name and @item.value with custom index", () => {
      const result = subject.evaluate(
        "The item name is @item.name and the value is @item.value",
        "loop.Beta"
      );
      expect(result).toBe("The item name is Beta and the value is 20");
    });

    it("replaces @first with custom index", () => {
      const result = subject.evaluate("The item is @first", "loop.1");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @first.name  with custom index", () => {
      const result = subject.evaluate("The item name is @first.name", "loop.1");
      expect(result).toBe("The item name is Alpha");
    });

    it("replaces @last with custom index", () => {
      const result = subject.evaluate("The item is @last", "loop.1");
      expect(result).toBe("The item is [object Object]");
    });

    it("replaces @last.name with custom index", () => {
      const result = subject.evaluate("The item name is @last.name", "loop.1");
      expect(result).toBe("The item name is Beta");
    });
  });

  describe("without custom index, with array of values", () => {
    beforeEach(() => {
      mockVariableStore.has.and.returnValue(true);
      mockRowRegistry.has.and.returnValue(true);
      mockRowRegistry.get.and.returnValue({
        name: signal("mockRow"),
        value: signal(() => undefined),
        setExpression: () => {},
        params: { index: new Parameter("index", null) },
      });
      mockVariableStore.get.and.returnValue([10, 20, 30]);
    });

    it("replaces @index with primitive array", () => {
      const result = subject.evaluate("The index is @index", "loop.1");
      expect(result).toBe("The index is 1");
    });

    it("replaces @item with primitive array", () => {
      const result = subject.evaluate("The item is @item", "loop.1");
      expect(result).toBe("The item is 20");
    });

    it("does not replace @item.name for primitive", () => {
      const result = subject.evaluate("The item name is @item.name", "loop.1");
      expect(result).toBe("The item name is 20.name");
    });

    it("replaces @item and @index for primitive", () => {
      const result = subject.evaluate("This item is @item and index is @index", "loop.1");
      expect(result).toBe("This item is 20 and index is 1");
    });

    it("replaces @first with primitive array", () => {
      const result = subject.evaluate("The item is @first", "loop.1");
      expect(result).toBe("The item is 10");
    });

    it("replaces @first.name with primitive array", () => {
      const result = subject.evaluate("The item name is @first.name", "loop.1");
      expect(result).toBe("The item name is 10.name");
    });

    it("replaces @last with primitive array", () => {
      const result = subject.evaluate("The item is @last", "loop.1");
      expect(result).toBe("The item is 30");
    });

    it("replaces @last.name with primitive array", () => {
      const result = subject.evaluate("The item name is @last.name", "loop.1");
      expect(result).toBe("The item name is 30.name");
    });
  });
});
