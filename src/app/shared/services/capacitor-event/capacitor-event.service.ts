import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import {
  ActionPerformed,
  LocalNotifications,
  LocalNotificationSchema,
} from "@capacitor/local-notifications";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { Platform } from "@ionic/angular";

/**
 * Hard limit on the number of events to keep in memory for new subscribers
 * This is to avoid memory overhead if large number of events are triggered
 * (assume that most event subscribers will have been initialised reasonably early)
 */
const BUFFER_SIZE = 20;

@Injectable({ providedIn: "root" })
/**
 * Proxy service used to replay events captured within Capacitor APIs
 * to subscribers
 *
 * This enables features to lazily initialise but still process events
 * that are emitted eagerly
 */
export class CapacitorEventService extends SyncServiceBase {
  constructor(platform: Platform) {
    super("Capacitor Events");
    // use platform ready await to immediately register the listeners once ready to do so
    platform.ready().then(() => {
      this.setupListeners();
    });
  }

  public localNotificationActionPerformed = new ReplaySubject<ActionPerformed>(BUFFER_SIZE);

  public localNotificationReceived = new ReplaySubject<LocalNotificationSchema>(BUFFER_SIZE);

  private setupListeners() {
    LocalNotifications.addListener("localNotificationActionPerformed", (e) => {
      // console.log("[Capacitor Event] localNotificationActionPerformed", e);
      this.localNotificationActionPerformed.next(e);
    });
    LocalNotifications.addListener("localNotificationReceived", (e) => {
      // console.log("[Capacitor Event] localNotificationReceived", e);
      this.localNotificationReceived.next(e);
    });
  }
}
