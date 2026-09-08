import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export const STORE_TYPES = ["local", "global", "system"] as const;
export type StoreType = (typeof STORE_TYPES)[number];
export type VariableReferenceType = StoreType | "loop";

export interface VariableReference {
  type: VariableReferenceType;
  name: string;
}

export interface IStore {
  set(ref: VariableReference, value: any): void;
  get(ref: VariableReference): any;
  asSignal(ref: VariableReference): Signal<any>;
  watch(ref: VariableReference): Observable<any>;
  watchMultiple(refs: VariableReference[]): Observable<{ [key: string]: any }>;
  watchMultipleSignal(refs: Signal<VariableReference[]>): Signal<{ [key: string]: any }>;
  has(ref: VariableReference): boolean;
  clear(): void;
  /**
   * Resolves a value merged with any "descendant" keys stored under it (e.g. "foo.bar" values
   * nested onto "foo"), so dynamic property/index access (e.g. `foo[someId]`) works naturally.
   */
  getWithDescendants(ref: VariableReference): any;
  /** Reactive counterpart of `getWithDescendants`; re-evaluates whenever any store value changes. */
  watchWithDescendants(ref: VariableReference): Observable<any>;
}

/**
 * Merges `exactValue` with any entries whose key is a dot-path descendant of `name`
 * (e.g. "name.child.grandchild"), assigning each onto a shallow clone at its relative path.
 * Returns `exactValue` unchanged when there are no descendants.
 */
export function mergeDescendants(
  exactValue: unknown,
  name: string,
  entries: Iterable<[string, unknown]>
): unknown {
  const prefix = `${name}.`;
  let container: any;

  for (const [key, value] of entries) {
    if (!key.startsWith(prefix)) continue;

    if (!container) {
      container = Array.isArray(exactValue)
        ? [...exactValue]
        : exactValue && typeof exactValue === "object"
          ? { ...exactValue }
          : {};
    }

    assignNestedPath(container, key.slice(prefix.length).split("."), value);
  }

  return container ?? exactValue;
}

function assignNestedPath(target: any, segments: string[], value: unknown): void {
  let cursor = target;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      cursor[segment] = value;
      return;
    }

    if (!cursor[segment] || typeof cursor[segment] !== "object") {
      cursor[segment] = {};
    }

    cursor = cursor[segment];
  });
}
