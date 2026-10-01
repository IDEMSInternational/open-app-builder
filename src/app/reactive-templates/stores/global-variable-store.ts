import { Injectable, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, combineLatest, of } from "rxjs";
import { distinctUntilChanged, filter, map, startWith, switchMap } from "rxjs/operators";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { IStore, mergeDescendants, VariableReference } from "./store";

/**
 * A reactive store for global variables.
 */
@Injectable({
  providedIn: "root",
})
export class GlobalVariableStore implements IStore {
  private readonly state = new Map<string, BehaviorSubject<any>>();
  /** Emits the changed key, or 'undefined' when the whole store changed (e.g. 'clear'). */
  private readonly stateChanged$ = new Subject<string | undefined>();
  private allSignal: Signal<{ [name: string]: any }> | undefined;
  /** Root names whose persisted descendant keys have already been loaded into 'state'. */
  private readonly hydratedDescendantRoots = new Set<string>();

  protected storageKeyPrefix: string = "global-";

  constructor(private injector: Injector) {}

  public set(ref: VariableReference, value: any): void {
    const name = ref.name;
    const subject = this.state.get(name);

    if (!subject) {
      this.state.set(name, new BehaviorSubject<any>(value));
      this.stateChanged$.next(name);
    } else if (!isEqual(value, subject.value)) {
      subject.next(value);
      this.stateChanged$.next(name);
    }

    this.setStoredValue(name, value);
  }

  public get(ref: VariableReference): any {
    const name = ref.name;
    if (!this.state.has(name)) {
      const storedValue = this.getStoredValue(name);

      if (storedValue !== undefined) {
        this.state.set(name, new BehaviorSubject<any>(storedValue));
      } else {
        return undefined;
      }
    }

    return this.state.get(name)!.value;
  }

  /**
   * Resolves a value merged with any descendant keys nested onto it
   * (e.g. "foo.bar" values nested onto "foo").
   */
  public getWithDescendants(ref: VariableReference): any {
    const prefix = ref.name + ".";
    this.hydrateDescendants(ref.name);

    // Only include keys that match the root or its descendants
    const relevantEntries = Array.from(this.state, ([key, subject]) => {
      if (key === ref.name || key.startsWith(prefix)) {
        return [key, subject.value];
      }
      return null;
    }).filter(Boolean) as [string, any][];

    return mergeDescendants(
      this.get(ref), // the root value
      ref.name, // the root key
      relevantEntries // only the keys that belong under that root
    );
  }

  /**
   * Reactive counterpart of 'getWithDescendants'. Re-derives the merged snapshot whenever 'ref'
   * or any of its descendant keys changes.
   *
   * Deliberately does NOT use 'distinctUntilChanged'/'isEqual' here: 'isEqual' only compares
   * arrays by numeric index/length, so it's blind to the extra string-keyed descendant
   * properties 'mergeDescendants' attaches onto an array clone - deduping would silently drop
   * real descendant changes.
   */
  public watchWithDescendants(ref: VariableReference): Observable<any> {
    const prefix = `${ref.name}.`;

    return this.stateChanged$.pipe(
      filter(
        (changedName) =>
          changedName === undefined || changedName === ref.name || changedName.startsWith(prefix)
      ),
      startWith(undefined),
      map(() => this.getWithDescendants(ref))
    );
  }

  public asSignal(ref: VariableReference): Signal<any> {
    return toSignal(this.watch(ref), { equal: isEqual, injector: this.injector });
  }

  public watch(ref: VariableReference): Observable<any> {
    const name = ref.name;

    if (!this.state.has(name)) {
      const initialValue = this.getStoredValue(name);
      this.state.set(name, new BehaviorSubject<any>(initialValue));
    }

    return this.state.get(name)!.asObservable();
  }

  /**
   * Watch multiple variables at once. Returns an observable that emits an object
   * with the current values of all specified variables whenever any of them change.
   * @param names Array of variable names to watch
   * @returns Observable that emits an object with variable names as keys and their values
   */
  public watchMultiple(refs: VariableReference[]): Observable<{ [key: string]: any }> {
    if (refs.length === 0) {
      return of({});
    }

    const observables = refs.map((ref) => this.watch(ref));

    return combineLatest(observables).pipe(
      map((values) => {
        const result: { [key: string]: any } = {};
        refs.forEach((ref, index) => {
          result[ref.name] = values[index];
        });
        return result;
      })
    );
  }

  public watchMultipleSignal(refs: Signal<VariableReference[]>): Signal<{ [key: string]: any }> {
    return toSignal(
      toObservable(refs, { injector: this.injector }).pipe(
        distinctUntilChanged((previous, current) => isEqual(previous, current)),
        switchMap((dependencyRefs) => this.watchMultiple(dependencyRefs))
      ),
      {
        initialValue: {},
        equal: isEqual,
        injector: this.injector,
      }
    );
  }

  public has(ref: VariableReference): boolean {
    const name = ref.name;
    const has = this.state.has(name);

    if (!has) {
      const storedValue = this.getStoredValue(name);

      if (storedValue !== undefined) {
        this.state.set(name, new BehaviorSubject<any>(storedValue));
        return true;
      }
    }

    return has;
  }

  /**
   * Not used but might be useful to snapshot the current state for debug reasons.
   */
  public getAll(): { [name: string]: any } {
    const result: { [name: string]: any } = {};
    this.state.forEach((value, name) => {
      result[name] = value.value;
    });
    return result;
  }

  /**
   * Returns a live signal of the entire store snapshot.
   * The signal is created lazily on first access.
   */
  public getAllSignal(): Signal<{ [name: string]: any }> {
    if (!this.allSignal) {
      this.allSignal = toSignal(
        this.stateChanged$.pipe(
          startWith(undefined),
          map(() => this.getAll())
        ),
        {
          injector: this.injector,
        }
      );
    }

    return this.allSignal;
  }

  /**
   * Not used but might be useful to snapshot the current state for debug reasons.
   */
  public getAllList(): { name: string; value: any }[] {
    return Array.from(this.state.entries())
      .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
      .map(([name, value]) => ({ name, value: value.value }));
  }

  /**
   * Clear all variables in the store.
   */
  public clear(): void {
    this.state.forEach((value) => {
      value.complete();
    });
    this.state.clear();
    this.hydratedDescendantRoots.clear();
    this.stateChanged$.next(undefined);
  }

  private hydrateDescendants(name: string): void {
    if (this.hydratedDescendantRoots.has(name)) {
      return;
    }

    const storagePrefix = `${this.storageKeyPrefix}${name}.`;
    const persistedNames: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(storagePrefix)) {
        persistedNames.push(key.slice(this.storageKeyPrefix.length));
      }
    }

    persistedNames
      .filter((persistedName) => !this.state.has(persistedName))
      .forEach((persistedName) => this.has({ name: persistedName, type: "global" }));

    this.hydratedDescendantRoots.add(name);
  }

  private getStoredValue(name: string): any {
    const key = `${this.storageKeyPrefix}${name}`;
    const storedValue = localStorage.getItem(key);

    if (storedValue === null || storedValue === "undefined") {
      return undefined;
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return undefined;
    }
  }

  private setStoredValue(name: string, value: any): void {
    const key = `${this.storageKeyPrefix}${name}`;

    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    const serializedValue = JSON.stringify(value);

    if (serializedValue === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, serializedValue);
  }
}
