import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { MatomoTracker } from "@ngx-matomo/tracker";

@Injectable({ providedIn: "root" })
export class AnalyticsService {
  constructor(private readonly matomoTracker: MatomoTracker) {}

  public async init() {
    // analytics are hosted on different url to site so allow cookies cross-origin
    this.matomoTracker.setCookieSameSite("Lax");

    // set user id
    const { uuid } = await Device.getId();
    this.matomoTracker.setUserId(uuid);
  }

  public trackEvent(name: string, value = null, category = "default", action = "default") {
    console.log("[Analytics] track", { category, action, name, value });
    return this.matomoTracker.trackEvent(category, action, name, value);
  }
}

// Additional options that may require future configuration (tbc)
// this.matomoTracker.setConsentGiven();
// this.matomoTracker.rememberConsentGiven();
