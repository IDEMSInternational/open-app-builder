import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NamespaceService {
  constructor() {}

  public get(namespace: string, name: string): string {
    return namespace ? `${namespace}.${name}` : name;
  }

  public isNamespaced(name: string): boolean {
    return name.includes(".");
  }
}
