export class Parameter<T> {
  public name: string;
  public value: T;

  constructor(name: string, value: T) {
    this.name = name;
    this.value = value;
  }

  /**
   * Casts the value to the type of this parameter.
   * @param value The value to cast.
   * @returns The casted value.
   * TODO: define a set of possible types so that we
   * can extend this to convert complex types?
   * This could be moved to a params.service.ts to improve extensibility
   */
  public cast(value: any): T {
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

export class Parameters {
  [key: string]: Parameter<any>;
}
