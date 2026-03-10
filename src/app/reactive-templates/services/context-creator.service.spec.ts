import { TestBed } from "@angular/core/testing";
import { ContextCreatorService } from "./context-creator.service";
import { VariableStore } from "../stores/variableStore";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/context-creator.service.spec.ts
 */
describe("ContextCreatorService", () => {
  let service: ContextCreatorService;
  let variableStore: VariableStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextCreatorService);
    variableStore = TestBed.inject(VariableStore);
    variableStore.clear();
  });

  it("creates context for flat dependency", () => {
    variableStore.set({ name: "simple", type: "local" }, 123);

    const context = service.createContext([{ name: "simple", type: "local" }]);

    expect(context).toEqual({ local: { simple: 123 }, global: {} });
  });

  it("creates nested context from dot paths", () => {
    variableStore.set({ name: "outer.inner.value", type: "local" }, "ok");

    const context = service.createContext([{ name: "outer.inner.value", type: "local" }]);

    expect(context).toEqual({ local: { outer: { inner: { value: "ok" } } }, global: {} });
  });

  it("merges shared prefixes", () => {
    variableStore.set({ name: "root.left", type: "local" }, "L");
    variableStore.set({ name: "root.right", type: "local" }, "R");

    const context = service.createContext([
      { name: "root.left", type: "local" },
      { name: "root.right", type: "local" },
    ]);

    expect(context).toEqual({ local: { root: { left: "L", right: "R" } }, global: {} });
  });

  it("replaces non-object segments to allow nesting", () => {
    variableStore.set({ name: "root", type: "local" }, "leaf");
    variableStore.set({ name: "root.child", type: "local" }, "nested");

    const context = service.createContext([
      { name: "root", type: "local" },
      { name: "root.child", type: "local" },
    ]);

    expect(context).toEqual({ local: { root: { child: "nested" } }, global: {} });
  });

  it("returns empty local context when no dependencies", () => {
    const context = service.createContext([]);

    expect(context).toEqual({ local: {}, global: {} });
  });

  it("namespace includes numbers", () => {
    variableStore.set({ name: "button_text", type: "local" }, "Click Here");

    const context = service.createContext([
      { name: "parameter_loop.2.options_loop.0.button_text", type: "local" },
    ]);

    expect(context).toEqual({
      local: { parameter_loop: { 2: { options_loop: { 0: { button_text: "Click Here" } } } } },
      global: {},
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
    });
  });
});
