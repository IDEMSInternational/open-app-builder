import { Signal, signal, WritableSignal } from "@angular/core";
import { ValueType } from "./row-base.component";

export function defineParameters<T extends Record<string, Parameter<any>>>(p: T) {
  return p;
}

export type Parameters = Record<string, Parameter<any>>;

export class Parameter<T> {
  private _value: WritableSignal<T>;
  public value: Signal<T>;
  public name: string;
  public valueType: ValueType;

  constructor(name: string, defaultValue: T, valueType: ValueType = "string") {
    this.name = name;
    this._value = signal(defaultValue);
    this.value = this._value.asReadonly();
    this.valueType = valueType;
  }

  public setValue(value: T) {
    this._value.set(this.cast(value));
  }

  private cast(value: any): T {
    const type = typeof this.value();
    switch (type) {
      case "boolean":
        return (value === "true" || value === true) as T;
      case "number":
        return Number(value) as T;
      case "string":
        return String(value) as T;
      default:
        return value as T;
    }
  }
}
