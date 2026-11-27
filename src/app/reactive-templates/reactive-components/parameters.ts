import { Signal, signal, WritableSignal } from "@angular/core";
import { ValueType } from "./row-base.component";

export function defineParameters<T extends Record<string, Parameter<any>>>(p: T) {
  return p;
}

export type Parameters = Record<string, Parameter<any>>;

const BOOLEAN_TEXT = /^\s*(true|false)\s*$/i;

export class Parameter<T> {
  private _value: WritableSignal<T>;
  private defaultValue: T;
  /** Values are cast to the type of the default; a null or undefined default takes any value */
  private readonly type: string;
  private allowedValues?: readonly T[];
  public value: Signal<T>;
  public name: string;
  public valueType: ValueType;

  constructor(name: string, defaultValue: T, valueType: ValueType = "string") {
    this.name = name;
    this.defaultValue = defaultValue;
    this.type = typeof defaultValue;
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

  /** Whether the expression is boolean text such as `TRUE`, to be read as text rather than script */
  public isBooleanText(expression: unknown): expression is string {
    return (
      this.type === "boolean" && typeof expression === "string" && BOOLEAN_TEXT.test(expression)
    );
  }

  /**
   * A boolean parameter is `true` only for `true` or the text "true" in any case, so an unset value
   * is `false`. Other parameters use the default for an unset value. A number parameter also uses
   * the default for a value that `Number()` can't read, or that is neither a number nor text.
   */
  private cast(value: any): T {
    if (this.type === "boolean") {
      return (value === true ||
        (typeof value === "string" && value.trim().toLowerCase() === "true")) as T;
    }
    if (value === undefined || value === null) return this.defaultValue;

    switch (this.type) {
      case "number": {
        if (typeof value !== "number" && typeof value !== "string") return this.defaultValue;
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
