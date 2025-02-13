import { Injectable } from "@angular/core";
import { IProtectedFieldName, getProtectedFieldName, isPrivateFieldName } from "data-models";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService extends SyncServiceBase {
  /** Prefix applied to all localStorage entries */
  public prefix = "rp-contact-field";

  constructor() {
    super("LocalStorage");
  }

  private get(key: string): string | null {
    if (!key) return null;
    if (!key.startsWith(this.prefix)) {
      key = `${this.prefix}.${key}`;
    }
    return localStorage.getItem(key);
  }

  private set(key: string, value: string, allowProtected = false) {
    if (!key) return;
    if (!allowProtected && this.isProtected(key)) {
      console.warn(`[DEPRECATED] - set local-storage with protected name: ${key}`);
    }
    if (!key.startsWith(this.prefix)) {
      key = `${this.prefix}.${key}`;
    }
    return localStorage.setItem(key, value);
  }

  private remove(key: string) {
    if (!key) return;
    if (!key.startsWith(this.prefix)) {
      key = `${this.prefix}.${key}`;
    }
    return localStorage.removeItem(key);
  }

  getString(key: string) {
    return this.get(key);
  }

  setString(key: string, value: string) {
    return this.set(key, value);
  }

  getJSON(key: string): any {
    let jsonString = this.get(key);
    if (jsonString) {
      try {
        return JSON.parse(jsonString);
      } catch (ex) {}
    }
    return null;
  }

  setJSON(key: string, value: any): any {
    try {
      let jsonString = JSON.stringify(value);
      this.set(key, jsonString);
    } catch (ex) {
      return null;
    }
  }

  /** Retrieve all key-values pairs that have been stored by app to localStorage, excluding private */
  getAll() {
    const values = {};
    Object.keys(localStorage)
      .filter((k) => k.startsWith(this.prefix))
      .filter((k) => !this.isPrivate(k))
      .forEach((k) => (values[k] = localStorage.getItem(k)));
    return values;
  }

  clear() {
    localStorage.clear();
  }

  setProtected(field: IProtectedFieldName, value: string) {
    const fieldName = getProtectedFieldName(field);
    return this.set(fieldName, value, true);
  }
  getProtected(field: IProtectedFieldName) {
    const fieldName = getProtectedFieldName(field);
    return this.get(fieldName);
  }
  removeProtected(field: IProtectedFieldName) {
    const fieldName = getProtectedFieldName(field);
    return this.remove(fieldName);
  }
  /** Check if a field name is protected (starts with underscore prefixed or non-prefixed) */
  isProtected(key: string) {
    if (key.startsWith(this.prefix)) {
      key = key.replace(`${this.prefix}.`, "");
    }
    return key.startsWith("_");
  }

  /** Check if a field name has been marked as private */
  isPrivate(key: string) {
    if (key.startsWith(this.prefix)) {
      key = key.replace(`${this.prefix}._`, "");
    }
    return isPrivateFieldName(key);
  }
}
