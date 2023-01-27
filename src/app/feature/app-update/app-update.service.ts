import { Injectable } from "@angular/core";
import { AppUpdate, AppUpdateInfo } from "@capawesome/capacitor-app-update";

@Injectable({
  providedIn: "root",
})
export class AppUpdateService {
  constructor() {}

  async getAppUpdateInfo() {
    return (await AppUpdate.getAppUpdateInfo()) as AppUpdateInfo;
  }

  async performImmediateUpdate(): Promise<void> {
    await AppUpdate.performImmediateUpdate();
  }

  async startFlexibleUpdate(): Promise<void> {
    await AppUpdate.startFlexibleUpdate();
  }

  async completeFlexibleUpdate(): Promise<void> {
    await AppUpdate.completeFlexibleUpdate();
  }
}
