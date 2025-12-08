import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NamespaceService {
  constructor() {}

  public getFullName(namespace: string, name: string): string {
    return namespace ? `${namespace}.${name}` : name;
  }
}
