import { Signal, signal, WritableSignal } from "@angular/core";
import { ValueType } from "./row-base.component";

export function defineParameters<T extends Record<string, Parameter<any>>>(p: T) {
  return p;
}

export type Parameters = Record<string, Parameter<any>>;

export class Parameter<T> {
  private _value: WritableSignal<T>;
  private defaultValue: T;
  private allowedValues?: readonly T[];
  public value: Signal<T>;
  public name: string;
  public valueType: ValueType;

  constructor(name: string, defaultValue: T, valueType: ValueType = "string") {
    this.name = name;
    this.defaultValue = defaultValue;
    this._value = signal(defaultValue);
    this.value = this._value.asReadonly();
    this.valueType = valueType;
  }

  /** A string parameter that only accepts the given values */
  public static oneOf<const V extends readonly string[]>(
    name: string,
    values: V,
    defaultValue: V[number]
  ): Parameter<V[number]> {
    const parameter = new Parameter<V[number]>(name, defaultValue);
    parameter.allowedValues = values;
    return parameter;
  }

  public setValue(value: T) {
    this._value.set(this.cast(value));
  }

  /** As in legacy parameter lists, an unset or invalid value falls back to the default */
  private cast(value: any): T {
    if (value === undefined || value === null) return this.defaultValue;

    switch (typeof this.value()) {
      case "boolean":
        if (typeof value === "boolean") return value as T;
        return (String(value).trim().toLowerCase() === "true") as T;
      case "number": {
        const number = Number(value);
        return (isNaN(number) ? this.defaultValue : number) as T;
      }
      case "string":
        return this.castString(String(value));
      default:
        return value as T;
    }
  }

  private castString(value: string): T {
    if (!this.allowedValues || this.allowedValues.includes(value as T)) return value as T;
    if (value) {
      console.warn("[Parameter List] invalid value", {
        name: this.name,
        value,
        allowed: this.allowedValues,
        default: this.defaultValue,
      });
    }
    return this.defaultValue;
  }
}
