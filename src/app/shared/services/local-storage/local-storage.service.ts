import { Injectable } from "@angular/core";
import { IProtectedFieldName, PROTECTED_FIELDS } from "data-models";
import { SyncServiceBase } from "../syncService.base";

const STORAGE_PREFIX = "rp-contact-field";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService extends SyncServiceBase {
  constructor() {
    super("LocalStorage");
  }

  private get(key: string): string | null {
    if (!key.startsWith(STORAGE_PREFIX)) {
      key = `${STORAGE_PREFIX}.${key}`;
    }
    return localStorage.getItem(key);
  }

  private set(key: string, value: string, allowProtected = false) {
    if (!allowProtected && this.isProtected(key)) {
      throw new Error(`Cannot set protected field: ${key}`);
    }
    if (!key.startsWith(STORAGE_PREFIX)) {
      key = `${STORAGE_PREFIX}.${key}`;
    }
    return localStorage.setItem(key, value);
  }

  private remove(key: string) {
    if (!key.startsWith(STORAGE_PREFIX)) {
      key = `${STORAGE_PREFIX}.${key}`;
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

  getAll() {
    const values = {};
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => (values[k] = localStorage.getItem(k)));
    return values;
  }

  clear() {
    localStorage.clear();
  }

  setProtected(field: IProtectedFieldName, value: string) {
    const fieldName = PROTECTED_FIELDS[field];
    return this.set(`_${fieldName}`, value, true);
  }
  getProtected(field: IProtectedFieldName) {
    const fieldName = PROTECTED_FIELDS[field];
    return this.get(`_${fieldName}`);
  }
  removeProtected(field: IProtectedFieldName) {
    const fieldName = PROTECTED_FIELDS[field];
    return this.remove(fieldName);
  }
  /** Check if a field name is protected (starts with underscore prefixed or non-prefixed) */
  isProtected(key: string) {
    if (key.startsWith(STORAGE_PREFIX)) {
      key = key.replace(`${STORAGE_PREFIX}.`, "");
    }
    return key.startsWith("_");
  }
}
