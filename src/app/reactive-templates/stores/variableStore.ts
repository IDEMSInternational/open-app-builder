import { inject, Injectable, Signal } from "@angular/core";
import { IStore, VariableReference } from "./store";
import { Observable } from "rxjs";
import { LocalVariableStore } from "./local-variable-store";
import { GlobalVariableStore } from "./global-variable-store";

@Injectable({
  providedIn: "root",
})
export class VariableStore implements IStore {
  private localStore = inject(LocalVariableStore);
  private globalStore = inject(GlobalVariableStore);

  private readonly storeMap = new Map<string, IStore>([
    ["local", this.localStore],
    ["global", this.globalStore],
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

  watchMultiple(refs: VariableReference[]): Observable<{ [key: string]: any }> {
    return this.getStore(refs[0]).watchMultiple(refs);
  }

  watchMultipleSignal(refs: Signal<VariableReference[]>): Signal<{ [key: string]: any }> {
    return this.getStore(refs[0]).watchMultipleSignal(refs);
  }

  has(ref: VariableReference): boolean {
    return this.getStore(ref).has(ref);
  }

  clear(): void {
    return this.getStore({ name: "", type: "global" }).clear();
  }

  private getStore(ref: VariableReference): IStore {
    if (!this.storeMap.has(ref.type)) {
      console.warn(`Unknown variable reference type: ${ref.type}. Defaulting to local store.`);
      return this.localStore;
      // // throw new Error(`Unknown variable reference type: ${ref.type}`);
    }

    return this.storeMap.get(ref.type);
  }
}
