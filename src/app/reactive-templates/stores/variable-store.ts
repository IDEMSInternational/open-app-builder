import { Injectable, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, combineLatest, of } from "rxjs";
import { distinctUntilChanged, filter, map, startWith, switchMap } from "rxjs/operators";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { IStore } from "./store";

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
export class VariableStore implements IStore {
  private readonly state: { [key: string]: BehaviorSubject<any> } = {};
  private readonly definedNames = new Set<string>();
  private readonly leafIndex = new Map<string, Set<string>>();
  private readonly stateChanged$ = new Subject<void>();
  private readonly stateStructureChanged$ = new Subject<string | undefined>();
  private readonly allSignal: Signal<{ [name: string]: any }>;

  /**
   * Builds a live signal of all currently stored values, updated whenever state changes.
   */
  constructor(private injector: Injector) {
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

  /**
   * Sets or updates a variable value.
   *
   * Behavior:
   * - Creates a new variable if it does not exist.
   * - Marks first defined values for keys that were previously only placeholder subscriptions.
   * - Emits structural-change events when a key becomes defined.
   * - Emits value-change events only when the value actually changed (deep-equality aware),
   *   except first-definition which always emits.
   */
  public set(name: string, value: any): void {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(value);
      this.definedNames.add(name);
      const leafKey = this.addToLeafIndex(name);
      this.stateStructureChanged$.next(leafKey);
      this.stateChanged$.next();
    } else {
      const isFirstDefinedValue = !this.definedNames.has(name);

      if (isFirstDefinedValue) {
        this.definedNames.add(name);
        const leafKey = this.addToLeafIndex(name);
        this.stateStructureChanged$.next(leafKey);
      }

      if (isFirstDefinedValue || !isEqual(value, this.state[name].value)) {
        this.state[name].next(value);
        this.stateChanged$.next();
      }
    }
  }

  /**
   * Gets the current value for a variable name using scope fallback resolution.
   * Returns 'undefined' when no candidate key currently exists.
   */
  public get(name: string): any {
    const resolvedName = this.resolveWithScopeFallback(name);

    if (!resolvedName) {
      return undefined;
    }

    return this.getExact(resolvedName);
  }

  /**
   * Returns an Angular 'Signal' view of 'watch(name)' with deep-equality deduplication.
   */
  public asSignal(name: string): Signal<any> {
    return toSignal(this.watch(name), { equal: isEqual, injector: this.injector });
  }

  /**
   * Watches a variable reactively using scope fallback resolution.
   *
   * The subscription automatically rebinds when structure changes make a better
   * candidate available (for example, a more specific scoped key appears later).
   */
  public watch(name: string): Observable<any> {
    const pointer = this.createScopeFallbackPointer(name);

    return this.watchPointer(pointer).pipe(
      map((result) => result.value),
      distinctUntilChanged((previous, current) => isEqual(previous, current))
    );
  }

  /**
   * Watches multiple dependency names (each with scope fallback) and emits a map
   * '{ dependencyName: value }' whenever any resolved dependency changes.
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

  /**
   * Signal-based variant of 'watchMultiple' for reactive Angular consumers.
   * Rebuilds the combined watcher when the dependency-name list changes.
   */
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

  /**
   * Returns 'true' if an exact key currently exists in the internal state map.
   *
   * Note: this checks exact key presence, not fallback resolution.
   */
  public has(name: string): boolean {
    return this.state.hasOwnProperty(name);
  }

  /**
   * Returns a plain-object snapshot of all currently tracked keys and values.
   * Useful for debugging or diagnostics.
   */
  public getAll(): { [name: string]: any } {
    const result: { [name: string]: any } = {};
    Object.keys(this.state).forEach((name) => {
      result[name] = this.state[name].value;
    });
    return result;
  }

  /**
   * Returns a live signal of the entire store snapshot.
   */
  public getAllSignal(): Signal<{ [name: string]: any }> {
    return this.allSignal;
  }

  /**
   * Returns a sorted list snapshot of all keys and values.
   * Primarily intended for debug UIs.
   */
  public getAllList(): { name: string; value: any }[] {
    return Object.keys(this.state)
      .sort()
      .map((name) => ({ name, value: this.state[name].value }));
  }

  /**
   * Clears all variables, completes all per-key subjects, and resets resolution indexes.
   * Emits both structure and state change events so subscribers can re-evaluate cleanly.
   */
  public clear(): void {
    Object.keys(this.state).forEach((name) => {
      this.state[name].complete();
      delete this.state[name];
    });
    this.definedNames.clear();
    this.leafIndex.clear();
    this.stateStructureChanged$.next(undefined);
    this.stateChanged$.next();
  }

  /**
   * Gets the current value for an exact key without fallback logic.
   */
  private getExact(name: string): any {
    if (!this.state[name]) {
      return undefined;
    }

    return this.state[name].value;
  }

  /**
   * Watches one exact key without applying scope fallback.
   *
   * If the key does not exist yet, a placeholder 'BehaviorSubject(undefined)' is created
   * so callers can still subscribe immediately.
   */
  private watchExact(name: string): Observable<any> {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(undefined);
    }
    return this.state[name].asObservable();
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
    const pointerLeafKeys = this.getPointerLeafKeys(pointer);

    return this.stateStructureChanged$.pipe(
      startWith(undefined),
      filter((changedLeaf) => changedLeaf === undefined || pointerLeafKeys.has(changedLeaf)),
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
      const leafKey = this.getLeafKey(candidate);
      const candidatesByLeaf = this.leafIndex.get(leafKey);

      if (candidatesByLeaf?.has(candidate) || this.definedNames.has(candidate)) {
        return candidate;
      }
    }

    return undefined;
  }

  /**
   * Convenience resolver for a dependency name using default fallback candidates.
   */
  private resolveWithScopeFallback(name: string): string | undefined {
    return this.resolvePointer(this.createScopeFallbackPointer(name));
  }

  /**
   * Creates a pointer descriptor for a dependency name using default scope-fallback candidates.
   */
  private createScopeFallbackPointer(name: string): VariablePointer {
    return {
      id: name,
      candidates: this.getScopeFallbackCandidates(name),
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

      if (!candidates.includes(candidate)) {
        candidates.push(candidate);
      }
    }

    return candidates;
  }

  /**
   * Adds a defined key to the leaf index used for debugging/introspection.
   */
  private addToLeafIndex(name: string): string {
    const leafKey = this.getLeafKey(name);
    const existingLeafSet = this.leafIndex.get(leafKey) ?? new Set<string>();
    existingLeafSet.add(name);
    this.leafIndex.set(leafKey, existingLeafSet);

    return leafKey;
  }

  /**
   * Returns all leaf keys that can affect pointer resolution for this pointer.
   */
  private getPointerLeafKeys(pointer: VariablePointer): Set<string> {
    const pointerLeafKeys = new Set<string>();

    pointer.candidates.forEach((candidate) => {
      pointerLeafKeys.add(this.getLeafKey(candidate));
    });

    return pointerLeafKeys;
  }

  /**
   * Returns the leaf segment (last token) of a dotted key.
   */
  private getLeafKey(name: string): string {
    const segments = name.split(".");
    return segments[segments.length - 1] ?? name;
  }
}
