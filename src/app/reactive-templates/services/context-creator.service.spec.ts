import { TestBed } from "@angular/core/testing";

import { ContextCreatorService } from "./context-creator.service";
import { VariableStore } from "../stores/variable-store";

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
    variableStore.set("simple", 123);

    const context = service.createContext(["simple"]);

    expect(context).toEqual({ local: { simple: 123 } });
  });

  it("creates nested context from dot paths", () => {
    variableStore.set("outer.inner.value", "ok");

    const context = service.createContext(["outer.inner.value"]);

    expect(context).toEqual({ local: { outer: { inner: { value: "ok" } } } });
  });

  it("merges shared prefixes", () => {
    variableStore.set("root.left", "L");
    variableStore.set("root.right", "R");

    const context = service.createContext(["root.left", "root.right"]);

    expect(context).toEqual({ local: { root: { left: "L", right: "R" } } });
  });

  it("replaces non-object segments to allow nesting", () => {
    variableStore.set("root", "leaf");
    variableStore.set("root.child", "nested");

    const context = service.createContext(["root", "root.child"]);

    expect(context).toEqual({ local: { root: { child: "nested" } } });
  });

  it("returns empty local context when no dependencies", () => {
    const context = service.createContext([]);

    expect(context).toEqual({ local: {} });
  });

  it("dependency includes numbers", () => {
    variableStore.set("button_text", "Click Here");

    const context = service.createContext(["parameter_loop.2.options_loop.0.button_text"]);

    expect(context).toEqual({
      local: { parameter_loop: { 2: { options_loop: { 0: { button_text: "Click Here" } } } } },
    });
  });

  it("dependency is at root namespace", () => {
    variableStore.set("button_text", "Click Here");

    const context = service.createContext([
      "parameter_loop.index2.options_loop.index0.button_text",
    ]);

    expect(context).toEqual({
      local: {
        parameter_loop: { index2: { options_loop: { index0: { button_text: "Click Here" } } } },
      },
    });
  });
});
