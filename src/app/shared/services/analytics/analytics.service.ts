import { Injectable } from "@angular/core";
import { Device } from "@capacitor/core";
import { MatomoTracker } from "@ngx-matomo/tracker";

@Injectable({ providedIn: "root" })
export class AnalyticsService {
  constructor(private readonly matomoTracker: MatomoTracker) {}

  public async init() {
    // analytics are hosted on different url to site so allow cookies cross-origin
    this.matomoTracker.setCookieSameSite("Lax");

    // set user id
    const device_info = await Device.getInfo();
    const app_user_id = device_info.uuid;
    this.matomoTracker.setUserId(app_user_id);
  }

  public trackEvent(name: string, value = null, category = "default", action = "default") {
    console.log("[Analytics] track", { category, action, name, value });
    return this.matomoTracker.trackEvent(category, action, name, value);
  }
}

// Additional options that may require future configuration (tbc)
// this.matomoTracker.setConsentGiven();
// this.matomoTracker.rememberConsentGiven();
