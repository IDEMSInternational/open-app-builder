import { Injectable, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, combineLatest, of } from "rxjs";
import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { IStore, VariableReference } from "./store";

/**
 * A reactive store for global variables.
 */
@Injectable({
  providedIn: "root",
})
export class GlobalVariableStore implements IStore {
  private readonly state = new Map<string, BehaviorSubject<any>>();
  private readonly stateChanged$ = new Subject<void>();
  private allSignal: Signal<{ [name: string]: any }> | undefined;

  constructor(private injector: Injector) {}

  public set(ref: VariableReference, value: any): void {
    const name = ref.name;
    const subject = this.state.get(name);

    if (!subject) {
      this.state.set(name, new BehaviorSubject<any>(value));
      this.stateChanged$.next();
    } else if (!isEqual(value, subject.value)) {
      subject.next(value);
      this.stateChanged$.next();
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
    this.stateChanged$.next();
  }

  private getStoredValue(name: string): any {
    const key = `global-${name}`;
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
    const key = `global-${name}`;

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
