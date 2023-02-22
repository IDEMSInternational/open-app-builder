import { Injectable } from "@angular/core";
import { AppUpdate, AppUpdateInfo, AppUpdateAvailability } from "@capawesome/capacitor-app-update";

@Injectable({
  providedIn: "root",
})
export class AppUpdateService {
  constructor() {}

  async checkForUpdatesAndAttemptImmediateUpdate() {
    try {
      const result = await AppUpdate.getAppUpdateInfo();
      if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
        return;
      }
      if (result.immediateUpdateAllowed) {
        return await AppUpdate.performImmediateUpdate();
      }
    } catch (error) {
      console.error("[App Update]", error);
    }
  }

  async getAppUpdateInfo() {
    return (await AppUpdate.getAppUpdateInfo()) as AppUpdateInfo;
  }

  async performImmediateUpdate() {
    await AppUpdate.performImmediateUpdate();
  }

  async startFlexibleUpdate() {
    await AppUpdate.startFlexibleUpdate();
  }

  async completeFlexibleUpdate() {
    await AppUpdate.completeFlexibleUpdate();
  }
}
