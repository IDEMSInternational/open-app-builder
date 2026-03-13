import { Injectable, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, combineLatest, of } from "rxjs";
import { distinctUntilChanged, filter, map, startWith, switchMap } from "rxjs/operators";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { IStore, VariableReference } from "./store";

export interface VariablePointer {
  /** Stable identifier used as the key in aggregated watch results. */
  id: string;
  /** Ordered list of fully-qualified variable names to try, from most-specific to least-specific scope. */
  candidates: string[];
}

/**
 * Reactive store for template/local variables with built-in scope fallback resolution.
 *
 * Key capabilities:
 * - Stores variables as 'BehaviorSubject's for replayable reactive reads.
 * - Resolves names using nearest-scope fallback by default for 'get' and 'watch'.
 * - Supports pointer-based watching so dependencies can bind even when targets are created later.
 * - Exposes aggregate snapshots/signals for debugging and reactive tooling.
 */
@Injectable({
  providedIn: "root",
})
export class LocalVariableStore implements IStore {
  private readonly state = new Map<string, BehaviorSubject<any>>();
  private readonly stateChanged$ = new Subject<void>();
  private readonly stateStructureChanged$ = new Subject<string | undefined>();
  private allSignal: Signal<{ [name: string]: any }> | undefined;

  /**
   * Initializes the store.
   */
  constructor(private injector: Injector) {}

  /**
   * Sets or updates a variable value.
   *
   * Behavior:
   * - Creates a new variable if it does not exist.
   * - Emits structural-change events when a new key is added.
   * - Emits value-change events only when the value actually changed (deep-equality aware).
   */
  public set(ref: VariableReference, value: any): void {
    const currentState = this.state.get(ref.name);

    if (!currentState) {
      this.state.set(ref.name, new BehaviorSubject<any>(value));
      this.stateStructureChanged$.next(ref.name);
      this.stateChanged$.next();
    } else {
      if (!isEqual(value, currentState.value)) {
        currentState.next(value);
        this.stateChanged$.next();
      }
    }
  }

  /**
   * Gets the current value for a variable name using scope fallback resolution.
   * Returns 'undefined' when no candidate key currently exists.
   */
  public get(ref: VariableReference): any {
    const resolvedName = this.resolveWithScopeFallback(ref);

    if (!resolvedName) {
      return undefined;
    }

    return this.getExact({ ...ref, name: resolvedName });
  }

  /**
   * Returns an Angular 'Signal' view of 'watch(name)' with deep-equality deduplication.
   */
  public asSignal(ref: VariableReference): Signal<any> {
    return toSignal(this.watch(ref), { equal: isEqual, injector: this.injector });
  }

  /**
   * Watches a variable reactively using scope fallback resolution.
   *
   * The subscription automatically rebinds when structure changes make a better
   * candidate available (for example, a more specific scoped key appears later).
   */
  public watch(ref: VariableReference): Observable<any> {
    const pointer = this.createScopeFallbackPointer(ref);

    return this.watchPointer(pointer).pipe(
      map((result) => result.value),
      distinctUntilChanged((previous, current) => isEqual(previous, current))
    );
  }

  /**
   * Watches multiple dependency names (each with scope fallback) and emits a map
   * '{ dependencyName: value }' whenever any resolved dependency changes.
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

  /**
   * Signal-based variant of 'watchMultiple' for reactive Angular consumers.
   * Rebuilds the combined watcher when the dependency-name list changes.
   */
  public watchMultipleSignal(names: Signal<VariableReference[]>): Signal<{ [key: string]: any }> {
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

  /**
   * Returns 'true' if an exact key currently exists in the internal state map.
   *
   * Note: this checks exact key presence, not fallback resolution.
   */
  public has(ref: VariableReference): boolean {
    return this.state.has(ref.name);
  }

  /**
   * Returns a plain-object snapshot of all currently tracked keys and values.
   * Useful for debugging or diagnostics.
   */
  public getAll(): { [name: string]: any } {
    const result: { [name: string]: any } = Object.create(null);
    this.state.forEach((state, name) => {
      result[name] = state.value;
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
   * Returns a sorted list snapshot of all keys and values.
   * Primarily intended for debug UIs.
   */
  public getAllList(): { name: string; value: any }[] {
    return Array.from(this.state.entries())
      .map(([name, state]) => ({ name, value: state.value }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Clears all variables and completes all per-key subjects.
   * Emits both structure and state change events so subscribers can re-evaluate cleanly.
   */
  public clear(): void {
    this.state.forEach((state) => {
      state.complete();
    });
    this.state.clear();
    this.stateStructureChanged$.next(undefined);
    this.stateChanged$.next();
  }

  /**
   * Gets the current value for an exact key without fallback logic.
   */
  private getExact(ref: VariableReference): any {
    return this.state.get(ref.name)?.value;
  }

  /**
   * Watches one exact key without applying scope fallback.
   *
   * If the key does not exist yet, returns an observable that emits 'undefined'.
   */
  private watchExact(name: string): Observable<any> {
    const state = this.state.get(name);
    return state ? state.asObservable() : of(undefined);
  }

  /**
   * Watches a pointer and emits both the resolved concrete key and its current value.
   *
   * Re-evaluates pointer resolution whenever store structure changes, then switches
   * to the matching exact-key stream.
   */
  private watchPointer(
    pointer: VariablePointer
  ): Observable<{ resolvedName: string | undefined; value: any }> {
    const pointerCandidates = new Set(pointer.candidates);

    return this.stateStructureChanged$.pipe(
      startWith(undefined),
      filter((changedName) => changedName === undefined || pointerCandidates.has(changedName)),
      map(() => this.resolvePointer(pointer)),
      distinctUntilChanged(),
      switchMap((resolvedName) => {
        if (!resolvedName) {
          return of({ resolvedName: undefined, value: undefined });
        }

        return this.watchExact(resolvedName).pipe(map((value) => ({ resolvedName, value })));
      })
    );
  }

  /**
   * Resolves a pointer to the first currently defined candidate key.
   */
  private resolvePointer(pointer: VariablePointer): string | undefined {
    const fallbackCandidates = pointer.candidates;

    for (const candidate of fallbackCandidates) {
      if (this.state.has(candidate)) {
        return candidate;
      }
    }

    return undefined;
  }

  /**
   * Convenience resolver for a dependency name using default fallback candidates.
   */
  private resolveWithScopeFallback(ref: VariableReference): string | undefined {
    return this.resolvePointer(this.createScopeFallbackPointer(ref));
  }

  /**
   * Creates a pointer descriptor for a dependency name using default scope-fallback candidates.
   */
  private createScopeFallbackPointer(ref: VariableReference): VariablePointer {
    return {
      id: ref.name,
      candidates: this.getScopeFallbackCandidates(ref.name),
    };
  }

  /**
   * Builds fallback candidates for a dotted dependency name.
   *
   * Example:
   * - input: 'a.b.c.value'
   * - output: ['a.b.c.value', 'a.b.value', 'a.value', 'value']
   */
  private getScopeFallbackCandidates(name: string): string[] {
    const segments = name.split(".");
    if (segments.length <= 1) {
      return [name];
    }

    const variableName = segments[segments.length - 1];
    const scopes = segments.slice(0, -1);
    const candidates: string[] = [];

    for (let scopeCount = scopes.length; scopeCount >= 0; scopeCount -= 1) {
      const candidate = [...scopes.slice(0, scopeCount), variableName].join(".");
      candidates.push(candidate);
    }

    return candidates;
  }
}
