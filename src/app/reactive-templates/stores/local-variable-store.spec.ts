import { TestBed } from "@angular/core/testing";
import { LocalVariableStore } from "./local-variable-store";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/stores/variable-store.spec.ts
 */
describe("LocalVariableStore", () => {
  let store: LocalVariableStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(LocalVariableStore);
    store.clear();
  });

  it("falls back to higher scopes for get", () => {
    store.set({ name: "root.myVar", type: "local" }, "root-value");

    expect(store.get({ name: "root.anotherScope.myVar", type: "local" })).toBe("root-value");
  });

  it("prioritises nearest scope candidate first", () => {
    store.set({ name: "myVar", type: "local" }, "global");
    store.set({ name: "root.myVar", type: "local" }, "root");
    store.set({ name: "root.section.myVar", type: "local" }, "section");

    expect(store.get({ name: "root.section.sub.myVar", type: "local" })).toBe("section");
  });

  it("prefers exact scope over higher-scope fallback", () => {
    store.set({ name: "root.myVar", type: "local" }, "root");
    store.set({ name: "root.anotherScope.myVar", type: "local" }, "exact");

    expect(store.get({ name: "root.anotherScope.myVar", type: "local" })).toBe("exact");
  });

  it("never falls back to lower scopes", () => {
    store.set({ name: "root.myVar", type: "local" }, "higher-scope");
    store.set({ name: "root.anotherScope.deep.myVar", type: "local" }, "lower-scope");

    expect(store.get({ name: "root.anotherScope.myVar", type: "local" })).toBe("higher-scope");
  });

  it("watch rebinds to more specific scopes as they appear", () => {
    const emissions: any[] = [];
    const subscription = store
      .watch({ name: "root.section.sub.myVar", type: "local" })
      .subscribe((value) => {
        emissions.push(value);
      });

    expect(emissions).toEqual([undefined]);

    store.set({ name: "myVar", type: "local" }, "global");
    store.set({ name: "root.myVar", type: "local" }, "root");
    store.set({ name: "root.section.myVar", type: "local" }, "section");
    store.set({ name: "root.section.sub.myVar", type: "local" }, "exact");

    expect(emissions).toEqual([undefined, "global", "root", "section", "exact"]);

    subscription.unsubscribe();
  });

  it("watch ignores lower-scope keys when resolving fallback", () => {
    store.set({ name: "root.myVar", type: "local" }, "higher");

    const emissions: any[] = [];
    const subscription = store
      .watch({ name: "root.anotherScope.myVar", type: "local" })
      .subscribe((value) => {
        emissions.push(value);
      });

    expect(emissions).toEqual(["higher"]);

    store.set({ name: "root.anotherScope.deep.myVar", type: "local" }, "lower");

    expect(emissions).toEqual(["higher"]);

    subscription.unsubscribe();
  });

  it("supports reserved object property names as variable keys", () => {
    store.set({ name: "__proto__", type: "local" }, "proto-value");
    store.set({ name: "constructor", type: "local" }, "constructor-value");
    store.set({ name: "hasOwnProperty", type: "local" }, "has-own-property-value");

    expect(store.has({ name: "__proto__", type: "local" })).toBeTrue();
    expect(store.has({ name: "constructor", type: "local" })).toBeTrue();
    expect(store.has({ name: "hasOwnProperty", type: "local" })).toBeTrue();
    expect(store.get({ name: "__proto__", type: "local" })).toBe("proto-value");
    expect(store.get({ name: "constructor", type: "local" })).toBe("constructor-value");
    expect(store.get({ name: "hasOwnProperty", type: "local" })).toBe("has-own-property-value");
  });

  it("getAllSignal tracks defined keys only when watching unresolved dependencies", () => {
    const allSignal = store.getAllSignal();
    const emissions: any[] = [];
    const subscription = store
      .watch({ name: "root.scope.myVar", type: "local" })
      .subscribe((value) => {
        emissions.push(value);
      });

    expect(emissions).toEqual([undefined]);
    expect(allSignal()).toEqual({});

    store.set({ name: "root.scope.myVar", type: "local" }, 123);

    expect(allSignal()).toEqual({ "root.scope.myVar": 123 });

    subscription.unsubscribe();
  });
});
