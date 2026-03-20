import { inject, Injectable, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { IStore, StoreType, VariableReference } from "./store";
import { Observable, combineLatest, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { LocalVariableStore } from "./local-variable-store";
import { GlobalVariableStore } from "./global-variable-store";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { SystemVariableStore } from "./system-variable-store";

@Injectable({
  providedIn: "root",
})
export class VariableStore implements IStore {
  private localStore = inject(LocalVariableStore);
  private globalStore = inject(GlobalVariableStore);
  private systemStore = inject(SystemVariableStore);

  private readonly storeMap = new Map<StoreType, IStore>([
    ["local", this.localStore],
    ["global", this.globalStore],
    ["system", this.systemStore],
  ]);

  set(ref: VariableReference, value: any): void {
    this.getStore(ref).set(ref, value);
  }

  get(ref: VariableReference) {
    return this.getStore(ref).get(ref);
  }

  asSignal(ref: VariableReference): Signal<any> {
    return this.getStore(ref).asSignal(ref);
  }

  watch(ref: VariableReference): Observable<any> {
    return this.getStore(ref).watch(ref);
  }

  /**
   * Watches multiple variable references across local/global/system stores.
   * Returns an empty object stream when no refs are provided, otherwise groups
   * refs by store type, watches each group in its underlying store, and merges
   * the latest results into a single object.
   */
  watchMultiple(refs: VariableReference[]): Observable<{ [key: string]: any }> {
    if (refs.length === 0) {
      return of({});
    }

    const refsByType = refs.reduce(
      (groupedRefs, ref) => {
        groupedRefs[ref.type].push(ref);
        return groupedRefs;
      },
      {
        local: [] as VariableReference[],
        global: [] as VariableReference[],
        system: [] as VariableReference[],
      }
    );

    const groupedObservables = (Object.keys(refsByType) as StoreType[])
      .filter((type) => refsByType[type].length > 0)
      .map((type) => this.storeMap.get(type)!.watchMultiple(refsByType[type]));

    if (groupedObservables.length === 1) {
      return groupedObservables[0];
    }

    return combineLatest(groupedObservables).pipe(map((results) => Object.assign({}, ...results)));
  }

  watchMultipleSignal(refs: Signal<VariableReference[]>): Signal<{ [key: string]: any }> {
    return toSignal(
      toObservable(refs).pipe(
        distinctUntilChanged((previous, current) => isEqual(previous, current)),
        switchMap((dependencyRefs) => this.watchMultiple(dependencyRefs))
      ),
      {
        initialValue: {},
        equal: isEqual,
      }
    );
  }

  has(ref: VariableReference): boolean {
    return this.getStore(ref).has(ref);
  }

  clear(): void {
    this.localStore.clear();
    this.globalStore.clear();
    this.systemStore.clear();
  }

  private getStore(ref: VariableReference): IStore {
    const store = this.storeMap.get(ref.type);

    if (!store) {
      throw new Error(`Missing store configuration for variable reference type: ${ref.type}`);
    }

    return store;
  }
}
