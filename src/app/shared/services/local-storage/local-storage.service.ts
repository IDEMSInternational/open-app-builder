import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getString(key: string): string {
    return localStorage.getItem(key);
  }

  setString(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getJSON(key: string): any {
    let jsonString = localStorage.getItem(key);
    try {
      return JSON.parse(jsonString);
    } catch (ex) {
      return null;
    }
  }

  setJSON(key: string, value: any): any {
    try {
      let jsonString = JSON.stringify(value);
      localStorage.setItem(key, jsonString);
    } catch (ex) {
      return null;
    }
  }
}
