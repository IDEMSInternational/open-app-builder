import { signal, WritableSignal } from "@angular/core";

export function defineParameters<T extends Record<string, Parameter<any>>>(p: T) {
  return p;
}

export type Parameters = Record<string, Parameter<any>>;

export class Parameter<T> {
  public name: string;
  public value: WritableSignal<T>;

  constructor(name: string, defaultValue: T) {
    this.name = name;
    this.value = signal(defaultValue);
  }

  public setValue(value: T) {
    this.value.set(this.cast(value));
  }

  private cast(value: any): T {
    const type = typeof this.value;
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
