import { TestBed } from "@angular/core/testing";
import { GlobalVariableStore } from "./global-variable-store";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/stores/global-variable-store.spec.ts
 */
describe("GlobalVariableStore", () => {
  let store: GlobalVariableStore;
  let storage: Map<string, string>;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;
  let removeItemSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(GlobalVariableStore);
    store.clear();

    storage = new Map<string, string>();

    getItemSpy = spyOn(localStorage, "getItem").and.callFake((key: string) => {
      return storage.has(key) ? storage.get(key)! : null;
    });

    setItemSpy = spyOn(localStorage, "setItem").and.callFake((key: string, value: string) => {
      storage.set(key, value);
    });

    removeItemSpy = spyOn(localStorage, "removeItem").and.callFake((key: string) => {
      storage.delete(key);
    });
  });

  it("persists values with set", () => {
    store.set({ name: "persisted", type: "global" }, { ok: true });

    expect(setItemSpy).toHaveBeenCalledWith("global-persisted", JSON.stringify({ ok: true }));
    expect(storage.get("global-persisted")).toBe(JSON.stringify({ ok: true }));
  });

  it("removes persisted key when set receives undefined", () => {
    storage.set("global-clearMe", JSON.stringify("value"));

    store.set({ name: "clearMe", type: "global" }, undefined);

    expect(removeItemSpy).toHaveBeenCalledWith("global-clearMe");
    expect(storage.has("global-clearMe")).toBeFalse();
  });

  it("lazy-hydrates value from localStorage on get", () => {
    storage.set("global-user", JSON.stringify({ name: "Ada" }));

    const value = store.get({ name: "user", type: "global" });

    expect(getItemSpy).toHaveBeenCalledWith("global-user");
    expect(value).toEqual({ name: "Ada" });
  });

  it("lazy-hydrates value from localStorage on has", () => {
    storage.set("global-feature", JSON.stringify(true));

    const has = store.has({ name: "feature", type: "global" });

    expect(getItemSpy).toHaveBeenCalledWith("global-feature");
    expect(has).toBeTrue();
    expect(store.get({ name: "feature", type: "global" })).toBeTrue();
  });

  it("watch emits stored value on first subscribe via lazy hydration", () => {
    storage.set("global-theme", JSON.stringify("dark"));
    const emissions: any[] = [];

    const subscription = store.watch({ name: "theme", type: "global" }).subscribe((value) => {
      emissions.push(value);
    });

    expect(getItemSpy).toHaveBeenCalledWith("global-theme");
    expect(emissions).toEqual(["dark"]);

    subscription.unsubscribe();
  });

  it("watch emits undefined for missing values then reacts to set", () => {
    const emissions: any[] = [];

    const subscription = store.watch({ name: "mode", type: "global" }).subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([undefined]);

    store.set({ name: "mode", type: "global" }, "expert");

    expect(emissions).toEqual([undefined, "expert"]);

    subscription.unsubscribe();
  });

  it("watchMultiple returns empty object stream for empty refs", () => {
    const emissions: Array<{ [key: string]: any }> = [];
    const subscription = store.watchMultiple([]).subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([{}]);

    subscription.unsubscribe();
  });

  it("watchMultiple emits merged values and updates when any dependency changes", () => {
    const refs = [
      { name: "a", type: "global" as const },
      { name: "b", type: "global" as const },
    ];
    const emissions: Array<{ [key: string]: any }> = [];

    const subscription = store.watchMultiple(refs).subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([{ a: undefined, b: undefined }]);

    store.set({ name: "a", type: "global" }, 1);
    store.set({ name: "b", type: "global" }, 2);

    expect(emissions).toEqual([
      { a: undefined, b: undefined },
      { a: 1, b: undefined },
      { a: 1, b: 2 },
    ]);

    subscription.unsubscribe();
  });

  it("returns undefined for malformed persisted JSON without throwing", () => {
    storage.set("global-bad", "not-json");

    expect(() => store.get({ name: "bad", type: "global" })).not.toThrow();
    expect(store.get({ name: "bad", type: "global" })).toBeUndefined();
  });
});
