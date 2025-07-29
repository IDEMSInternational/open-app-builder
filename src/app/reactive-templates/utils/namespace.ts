export class Namespace {
  public static get(namespace: string, name: string): string {
    return namespace ? `${namespace}.${name}` : name;
  }
}
