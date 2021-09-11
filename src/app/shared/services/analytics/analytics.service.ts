import { Injectable } from "@angular/core";
import { Device } from "@capacitor/core";
import { MatomoTracker } from "@ngx-matomo/tracker";

@Injectable({ providedIn: "root" })
export class AnalyticsService {
  constructor(private readonly matomoTracker: MatomoTracker) {}

  public async init() {
    const device_info = await Device.getInfo();
    const app_user_id = device_info.uuid;
    this.matomoTracker.enableCrossDomainLinking();
    this.matomoTracker.setUserId(app_user_id);
    this.matomoTracker.setDocumentTitle("ngxMatomo Test");
    this.trackEvent("test");
    // this.matomoTracker.setDocumentTitle("ngxMatomo Test");
    //
  }

  public trackEvent(name: string, value = null, category = "default", action = "default") {
    return this.matomoTracker.trackEvent(category, action, name, value);
  }
}
