import { TestBed } from "@angular/core/testing";
import { ContextCreatorService } from "./context-creator.service";
import { VariableStore } from "../stores/variable-store";
import { RowRegistry } from "./row.registry";
import { signal } from "@angular/core";
import { Parameter } from "../reactive-components/parameters";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/context-creator.service.spec.ts
 */
describe("ContextCreatorService", () => {
  let service: ContextCreatorService;
  let variableStore: VariableStore;
  let rowRegistry: RowRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextCreatorService);
    variableStore = TestBed.inject(VariableStore);
    rowRegistry = TestBed.inject(RowRegistry);
    variableStore.clear();
  });

  it("creates context for flat dependency", () => {
    variableStore.set({ name: "simple", type: "local" }, 123);

    const context = service.createContext([{ name: "simple", type: "local" }]);

    expect(context).toEqual({ local: { simple: 123 }, global: {}, system: {}, loop: {} });
  });

  it("creates nested context from dot paths", () => {
    variableStore.set({ name: "outer.inner.value", type: "local" }, "ok");

    const context = service.createContext([{ name: "outer.inner.value", type: "local" }]);

    expect(context).toEqual({
      local: { outer: { inner: { value: "ok" } } },
      global: {},
      system: {},
      loop: {},
    });
  });

  it("merges shared prefixes", () => {
    variableStore.set({ name: "root.left", type: "local" }, "L");
    variableStore.set({ name: "root.right", type: "local" }, "R");

    const context = service.createContext([
      { name: "root.left", type: "local" },
      { name: "root.right", type: "local" },
    ]);

    expect(context).toEqual({
      local: { root: { left: "L", right: "R" } },
      global: {},
      system: {},
      loop: {},
    });
  });

  it("replaces non-object segments to allow nesting", () => {
    variableStore.set({ name: "root", type: "local" }, "leaf");
    variableStore.set({ name: "root.child", type: "local" }, "nested");

    const context = service.createContext([
      { name: "root", type: "local" },
      { name: "root.child", type: "local" },
    ]);

    expect(context).toEqual({
      local: { root: { child: "nested" } },
      global: {},
      system: {},
      loop: {},
    });
  });

  it("returns empty local context when no dependencies", () => {
    const context = service.createContext([]);

    expect(context).toEqual({ local: {}, global: {}, system: {}, loop: {} });
  });

  it("namespace includes numbers", () => {
    variableStore.set({ name: "button_text", type: "local" }, "Click Here");

    const context = service.createContext([
      { name: "parameter_loop.2.options_loop.0.button_text", type: "local" },
    ]);

    expect(context).toEqual({
      local: { parameter_loop: { 2: { options_loop: { 0: { button_text: "Click Here" } } } } },
      global: {},
      system: {},
      loop: {},
    });
  });

  it("falls back to root-scope variable when scoped path segments are non-numeric", () => {
    variableStore.set({ name: "button_text", type: "local" }, "Click Here");

    const context = service.createContext([
      { name: "parameter_loop.index2.options_loop.index0.button_text", type: "local" },
    ]);

    expect(context).toEqual({
      local: {
        parameter_loop: { index2: { options_loop: { index0: { button_text: "Click Here" } } } },
      },
      global: {},
      system: {},
      loop: {},
    });
  });

  it("creates loop context from namespace", () => {
    variableStore.set({ name: "items", type: "local" }, [
      { name: "Alpha", value: 10 },
      { name: "Beta", value: 20 },
    ]);

    rowRegistry.register({
      name: () => "items",
      value: () => undefined,
      setExpression: () => {},
      params: { index: new Parameter("index", null) },
      row: () => ({ name: "items", value: "", type: "loop", rows: [], _nested_name: "items" }),
    });

    const context = service.createContext([], "items.1");

    expect(context.loop).toEqual({
      name: "Beta",
      value: 20,
      item: { name: "Beta", value: 20 },
      index: "1",
      count: 2,
      first: { name: "Alpha", value: 10 },
      last: { name: "Beta", value: 20 },
      is_first: false,
      is_last: true,
    });
  });

  it("creates loop context using custom index", () => {
    variableStore.set({ name: "items", type: "local" }, [
      { name: "Alpha", value: 10 },
      { name: "Beta", value: 20 },
    ]);

    rowRegistry.register({
      name: () => "items",
      value: () => undefined,
      setExpression: () => {},
      params: { index: new Parameter("index", "name") },
      row: () => ({ name: "items", value: "", type: "loop", rows: [], _nested_name: "items" }),
    });

    const context = service.createContext([], "items.Beta");

    expect(context.loop).toEqual({
      name: "Beta",
      value: 20,
      item: { name: "Beta", value: 20 },
      index: "Beta",
      count: 2,
      first: { name: "Alpha", value: 10 },
      last: { name: "Beta", value: 20 },
      is_first: false,
      is_last: true,
    });
  });
});
