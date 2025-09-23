import { Signal } from "@angular/core";
import { Observable } from "rxjs";

export interface IStore {
  set(name: string, value: any): void;
  get(name: string): any;
  asSignal(name: string): Signal<any>;
  watch(name: string): Observable<any>;
  has(name: string): boolean;
  getAll(): { [name: string]: any };
  clear(): void;
}
