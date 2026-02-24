import { TestBed } from "@angular/core/testing";

import { VariableStore } from "./variable-store";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/stores/variable-store.spec.ts
 */
describe("VariableStore", () => {
  let store: VariableStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(VariableStore);
    store.clear();
  });

  it("falls back to higher scopes for get", () => {
    store.set("root.myVar", "root-value");

    expect(store.get("root.anotherScope.myVar")).toBe("root-value");
  });

  it("prioritises nearest scope candidate first", () => {
    store.set("myVar", "global");
    store.set("root.myVar", "root");
    store.set("root.section.myVar", "section");

    expect(store.get("root.section.sub.myVar")).toBe("section");
  });

  it("prefers exact scope over higher-scope fallback", () => {
    store.set("root.myVar", "root");
    store.set("root.anotherScope.myVar", "exact");

    expect(store.get("root.anotherScope.myVar")).toBe("exact");
  });

  it("never falls back to lower scopes", () => {
    store.set("root.myVar", "higher-scope");
    store.set("root.anotherScope.deep.myVar", "lower-scope");

    expect(store.get("root.anotherScope.myVar")).toBe("higher-scope");
  });

  it("watch rebinds to more specific scopes as they appear", () => {
    const emissions: any[] = [];
    const subscription = store.watch("root.section.sub.myVar").subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([undefined]);

    store.set("myVar", "global");
    store.set("root.myVar", "root");
    store.set("root.section.myVar", "section");
    store.set("root.section.sub.myVar", "exact");

    expect(emissions).toEqual([undefined, "global", "root", "section", "exact"]);

    subscription.unsubscribe();
  });

  it("watch ignores lower-scope keys when resolving fallback", () => {
    store.set("root.myVar", "higher");

    const emissions: any[] = [];
    const subscription = store.watch("root.anotherScope.myVar").subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual(["higher"]);

    store.set("root.anotherScope.deep.myVar", "lower");

    expect(emissions).toEqual(["higher"]);

    subscription.unsubscribe();
  });
});
