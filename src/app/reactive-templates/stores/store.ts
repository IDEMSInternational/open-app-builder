import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export type StoreType = "local" | "global";

export interface VariableReference {
  type: StoreType;
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
}
