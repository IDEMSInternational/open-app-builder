import { inject, Injectable, Injector, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";

/**
 * A reactive global store for all local variables.
 */
@Injectable({
  providedIn: "root",
})
export class VariableStore {
  private readonly state: { [key: string]: BehaviorSubject<any> } = {};

  private injector = inject(Injector);

  public set(name: string, value: any): void {
    if (!this.state[name]) {
      this.state[name] = new BehaviorSubject<any>(value);
    } else {
      this.state[name].next(value);
    }
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

  public has(name: string): boolean {
    return this.state.hasOwnProperty(name);
  }

  /**
   * Not used but might be useful to snapshot the current state for debug reasons.
   */
  public getAll(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    Object.keys(this.state).forEach((key) => {
      result[key] = this.state[key].value;
    });
    return result;
  }

  /**
   * Clear all variables in the store.
   * todo: we will need to clear variables when changing the main template.
   */
  public clear(): void {
    Object.keys(this.state).forEach((key) => {
      this.state[key].complete();
    });
    Object.keys(this.state).forEach((key) => {
      delete this.state[key];
    });
  }
}
