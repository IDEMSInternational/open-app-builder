import { TestBed } from "@angular/core/testing";
import { GlobalVariableStore } from "./global-variable-store";
import { LocalVariableStore } from "./local-variable-store";
import { VariableStore } from "./variable-store";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/stores/variable-store.spec.ts
 */
describe("VariableStore", () => {
  let store: VariableStore;
  let localStore: LocalVariableStore;
  let globalStore: GlobalVariableStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(VariableStore);
    localStore = TestBed.inject(LocalVariableStore);
    globalStore = TestBed.inject(GlobalVariableStore);

    localStorage.clear();
    localStore.clear();
    globalStore.clear();
  });

  it("returns an empty object stream for watchMultiple([])", () => {
    const emissions: Array<{ [key: string]: any }> = [];
    const subscription = store.watchMultiple([]).subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([{}]);

    subscription.unsubscribe();
  });

  it("watches mixed local/global refs and merges updates", () => {
    const localRef = { name: "mixedLocal", type: "local" as const };
    const globalRef = { name: "mixedGlobal", type: "global" as const };
    const emissions: Array<{ [key: string]: any }> = [];

    const subscription = store.watchMultiple([localRef, globalRef]).subscribe((value) => {
      emissions.push(value);
    });

    expect(emissions).toEqual([{ mixedLocal: undefined, mixedGlobal: undefined }]);

    store.set(localRef, "local-value");
    store.set(globalRef, "global-value");

    expect(emissions).toEqual([
      { mixedLocal: undefined, mixedGlobal: undefined },
      { mixedLocal: "local-value", mixedGlobal: undefined },
      { mixedLocal: "local-value", mixedGlobal: "global-value" },
    ]);

    subscription.unsubscribe();
  });

  it("delegates clear() to both local and global stores", () => {
    const localClearSpy = spyOn(localStore, "clear").and.callThrough();
    const globalClearSpy = spyOn(globalStore, "clear").and.callThrough();

    store.clear();

    expect(globalClearSpy).toHaveBeenCalledTimes(1);
    expect(localClearSpy).toHaveBeenCalledTimes(1);
  });
});
