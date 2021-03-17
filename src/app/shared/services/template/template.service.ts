import { Injectable } from '@angular/core';
import { TEMPLATE } from '../data/data.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private localStorageService: LocalStorageService) {
    this.initialiseGlobals();
  }

  initialiseGlobals() {
    TEMPLATE.forEach((template) => {
      template.rows?.forEach((row) => {
        if (row.type === "set_global") {
          this.setGlobal(row.name, row.value);
        }
      });
    });
  }

  getGlobal(key: string): string {
    return this.localStorageService.getString("template_global." + key);
  }

  setGlobal(key: string, value: string) {
    this.localStorageService.setString("template_global." + key, value);
  }
}
