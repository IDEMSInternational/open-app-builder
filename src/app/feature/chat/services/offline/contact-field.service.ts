import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ContactFieldService {
  constructor(private localStorageService: LocalStorageService) {}

  async getContactField(key: string): Promise<string> {
    return this.localStorageService.getString("rp-contact-field." + key);
  }

  async setContactField(key: string, value: string): Promise<any> {
    return this.localStorageService.setString("rp-contact-field." + key, value);
  }
}
