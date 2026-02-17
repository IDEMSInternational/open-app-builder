import { Injectable, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, combineLatest } from "rxjs";
import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { IStore } from "./store";

/**
 * A reactive global store for all local variables.
 */
@Injectable({
  providedIn: "root",
})
export class VariableStore implements IStore {
  private readonly state: { [key: string]: BehaviorSubject<any> } = {};
  private readonly stateChanged$ = new Subject<void>();
  private readonly allSignal: Signal<{ [name: string]: any }>;

  constructor(private injector: Injector) {
    this.allSignal = toSignal(
      this.stateChanged$.pipe(
        startWith(undefined),
        map(() => this.getAll())
      ),
      {
        equal: isEqual,
        injector: this.injector,
      }
    );
  }

  public set(name: string, value: any): void {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(value);
      this.stateChanged$.next();
    } else {
      if (!isEqual(value, this.state[name].value)) {
        this.state[name].next(value);
        this.stateChanged$.next();
      }
    }
  }

  public get(name: string): any {
    if (!this.state[name]) {
      return undefined;
    }
    return this.state[name].value;
  }

  public asSignal(name: string): Signal<any> {
    return toSignal(this.watch(name), { equal: isEqual, injector: this.injector });
  }

  public watch(name: string): Observable<any> {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(undefined);
    }
    return this.state[name].asObservable();
  }

  /**
   * Watch multiple variables at once. Returns an observable that emits an object
   * with the current values of all specified variables whenever any of them change.
   * @param names Array of variable names to watch
   * @returns Observable that emits an object with variable names as keys and their values
   */
  public watchMultiple(names: string[]): Observable<{ [key: string]: any }> {
    if (names.length === 0) {
      return new BehaviorSubject<{ [key: string]: any }>({}).asObservable();
    }

    const observables = names.map((name) => this.watch(name));

    return combineLatest(observables).pipe(
      map((values) => {
        const result: { [key: string]: any } = {};
        names.forEach((name, index) => {
          result[name] = values[index];
        });
        return result;
      })
    );
  }

  public watchMultipleSignal(names: Signal<string[]>): Signal<{ [key: string]: any }> {
    return toSignal(
      toObservable(names, { injector: this.injector }).pipe(
        distinctUntilChanged((previous, current) => isEqual(previous, current)),
        switchMap((dependencyNames) => this.watchMultiple(dependencyNames))
      ),
      {
        initialValue: {},
        equal: isEqual,
        injector: this.injector,
      }
    );
  }

  public has(name: string): boolean {
    return this.state.hasOwnProperty(name);
  }

  /**
   * Not used but might be useful to snapshot the current state for debug reasons.
   */
  public getAll(): { [name: string]: any } {
    const result: { [name: string]: any } = {};
    Object.keys(this.state).forEach((name) => {
      result[name] = this.state[name].value;
    });
    return result;
  }

  /**
   * Provides a live signal of the entire variable store. Emits a new object with all variable values whenever any variable changes.
   */
  public getAllSignal(): Signal<{ [name: string]: any }> {
    return this.allSignal;
  }

  /**
   * Not used but might be useful to snapshot the current state for debug reasons.
   */
  public getAllList(): { name: string; value: any }[] {
    return Object.keys(this.state)
      .sort()
      .map((name) => ({ name, value: this.state[name].value }));
  }

  /**
   * Clear all variables in the store.
   * todo: we will need to clear variables when changing the main template.
   */
  public clear(): void {
    Object.keys(this.state).forEach((name) => {
      this.state[name].complete();
      delete this.state[name];
    });
    this.stateChanged$.next();
  }
}
