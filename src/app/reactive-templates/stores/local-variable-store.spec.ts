import { TestBed } from "@angular/core/testing";
import { LocalVariableStore } from "./local-variable-store";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/stores/local-variable-store.spec.ts
 */
describe("LocalVariableStore", () => {
  let store: LocalVariableStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(LocalVariableStore);
    store.clear();
  });

  it("reads properties from stored objects without requiring separate leaf keys", () => {
    store.set({ name: "page_details", type: "local" }, { value: "Page text" });

    expect(store.get({ name: "page_details.value", type: "local" })).toBe("Page text");
    expect(store.get({ name: "page_details.missing", type: "local" })).toBeUndefined();
    expect(store.get({ name: "page_details.toString", type: "local" })).toBeUndefined();
  });

  it("preserves explicit leaf values over properties of stored parent objects", () => {
    store.set({ name: "page_details", type: "local" }, { value: "Parent text" });
    store.set({ name: "page_details.value", type: "local" }, undefined);

    expect(store.get({ name: "page_details.value", type: "local" })).toBeUndefined();
  });

  it("preserves falsy properties and reads nested object and array properties", () => {
    store.set(
      { name: "page_details", type: "local" },
      { empty: "", enabled: false, count: 0, items: [{ value: "First" }] }
    );

    expect(store.get({ name: "page_details.empty", type: "local" })).toBe("");
    expect(store.get({ name: "page_details.enabled", type: "local" })).toBeFalse();
    expect(store.get({ name: "page_details.count", type: "local" })).toBe(0);
    expect(store.get({ name: "page_details.items.0.value", type: "local" })).toBe("First");
  });

  it("reads and watches object properties through descendant-aware access", () => {
    const ref = { name: "pages.0.page_details.value", type: "local" as const };
    const values: unknown[] = [];
    const subscription = store.watchWithDescendants(ref).subscribe((value) => values.push(value));

    store.set({ name: "pages.0.page_details", type: "local" }, { value: "First" });
    expect(store.getWithDescendants(ref)).toBe("First");
    store.set({ name: "pages.0.page_details", type: "local" }, { value: "Second" });

    expect(values).toEqual([undefined, "First", "Second"]);
    subscription.unsubscribe();
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

  it("getWithDescendants falls back to a higher scope that only has descendant keys (no exact own value)", () => {
    // "question_loop" itself was never `.set()` directly - only a descendant row was.
    store.set({ name: "question_loop.key_1.question", type: "local" }, "root-answer");

    const result = store.getWithDescendants({
      name: "answer_loop.key_1.question_loop",
      type: "local",
    });

    expect((result as any).key_1).toEqual({ question: "root-answer" });
  });

  it("watchWithDescendants re-emits when a descendant of an array value changes", () => {
    // isEqual only compares array elements by numeric index/length, so it can't see extra
    // string-keyed descendant properties mergeDescendants attaches onto an array's clone.
    store.set({ name: "items", type: "local" }, [{ key: "key_1" }]);

    const emissions: any[] = [];
    const subscription = store
      .watchWithDescendants({ name: "items", type: "local" })
      .subscribe((value) => emissions.push(value));

    store.set({ name: "items.key_1.question", type: "local" }, "Question 1");

    expect(emissions.length).toBe(2);
    expect((emissions[1] as any).key_1).toEqual({ question: "Question 1" });

    subscription.unsubscribe();
  });

  it("watchWithDescendants ignores changes to unrelated keys", () => {
    store.set({ name: "items", type: "local" }, [{ key: "key_1" }]);

    const emissions: any[] = [];
    const subscription = store
      .watchWithDescendants({ name: "page.items", type: "local" })
      .subscribe((value) => emissions.push(value));

    store.set({ name: "other", type: "local" }, 1);
    store.set({ name: "itemsExtra", type: "local" }, 1);
    store.set({ name: "page.other.items", type: "local" }, 1);
    expect(emissions.length).toBe(1);

    store.set({ name: "items.key_1.question", type: "local" }, "Q");
    store.set({ name: "page.items", type: "local" }, []);
    expect(emissions.length).toBe(3);

    subscription.unsubscribe();
  });

  it("getWithDescendants merges default-index loop children without mutating the stored value", () => {
    store.set({ name: "loop", type: "local" }, [{ id: "a" }, { id: "b" }]);
    store.set({ name: "loop.0.answer", type: "local" }, "X");

    const result = store.getWithDescendants({ name: "loop", type: "local" });

    expect(result[0]).toEqual({ id: "a", answer: "X" });
    expect(result[1]).toEqual({ id: "b" });
    expect(store.get({ name: "loop", type: "local" })).toEqual([{ id: "a" }, { id: "b" }]);
  });

  it("set does not emit after a getWithDescendants read when the loop value is unchanged", () => {
    store.set({ name: "loop", type: "local" }, [{ id: "a" }, { id: "b" }]);
    store.set({ name: "loop.0.answer", type: "local" }, "X");
    store.getWithDescendants({ name: "loop", type: "local" });

    const emissions: any[] = [];
    // watchWithDescendants emits on every store change, so it surfaces any spurious set() emission.
    const subscription = store
      .watchWithDescendants({ name: "loop", type: "local" })
      .subscribe((value) => emissions.push(value));

    store.set({ name: "loop", type: "local" }, [{ id: "a" }, { id: "b" }]);

    expect(emissions.length).toBe(1);

    subscription.unsubscribe();
  });
});
