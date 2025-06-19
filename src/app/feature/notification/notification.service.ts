import { effect, Injectable, signal } from "@angular/core";
import { Capacitor, PermissionState } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { firstValueFrom } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { IDBNotification, INotification, INotificationInternal } from "./notification.types";

// Notification ids must be integer +/- 2^31-1 as per capacitor docs
const NOTIFICATION_ID_MAX = 2147483647;

type IPermissionStatus = PermissionState | "unsupported";

@Injectable({ providedIn: "root" })
export class NotificationService {
  private permissionStatus = signal<IPermissionStatus | undefined>(undefined);

  /** Hack - proxy to native LocalNotification api for easier test mocking */
  private api = LocalNotifications;

  constructor(
    private localStorageService: LocalStorageService,
    private appConfigService: AppConfigService,
    private dynamicDataService: DynamicDataService
  ) {
    // Setup listeners immediately to ensure events are not dropped
    this.addNotificationListeners();

    // Ensure permission status reflected to protected field
    effect(async () => {
      const permissionStatus = this.permissionStatus();
      if (permissionStatus === "granted") {
        await this.recheckScheduledNotifications();
        await this.markDismissedNotifications();
      }
    });
    // Check permissions on initial load
    this.checkPermissions();
  }

  public async requestPermission() {
    const { display } = await this.api.requestPermissions();
    this.permissionStatus.set(display);
    return display;
  }

  public async scheduleNotification(notification: INotification) {
    const { valid, msg } = await this.validateNotification(notification);
    if (!valid) {
      console.warn("[Notification]", msg, "cannot create");
      return;
    }

    const existingNotification = await this.getNotificationById(notification.id);
    if (existingNotification) {
      await this.cancelNotification(existingNotification.id);
    }
    // update default values
    const { NOTIFICATION_DEFAULTS } = this.appConfigService.appConfig();
    notification.title ??= NOTIFICATION_DEFAULTS.title;
    notification.text ??= NOTIFICATION_DEFAULTS.text;

    const internalNotification = this.generateInternalNotification(notification);
    try {
      // Res typically only returns array of ids, so not useful to keep
      await this.api.schedule({ notifications: [internalNotification] });

      // Store to dynamic data
      const dbNotification: IDBNotification = {
        ...notification,
        _internal_id: internalNotification.id,
        status: "pending",
      };
      await this.setDBNotification(dbNotification);
    } catch (error) {
      // In case of scheduling issues try to rollback
      console.error(`[Notification]`, error);
      return this.cancelNotification(notification.id);
    }
  }

  private async setDBNotification(dbNotification: IDBNotification) {
    return this.dynamicDataService.upsert("data_list", "_notifications", dbNotification);
  }

  public async cancelNotification(id: string) {
    const dbNotification = await this.getNotificationById(id);
    if (dbNotification) {
      await this.api.cancel({
        notifications: [{ id: dbNotification._internal_id }],
      });
      await this.dynamicDataService.remove("data_list", "_notifications", [id]);
    }
  }

  public async cancelAll() {
    const { notifications } = await this.api.getPending();
    await this.api.cancel({ notifications }); // Cancels all
    await this.dynamicDataService.resetFlow("data_list", "_notifications");
  }

  /** Convert authored notification to schema required by capacitor */
  private generateInternalNotification(notification: INotification) {
    // Create random integer ID compatible with capacitor
    const internalId = Math.floor(Math.random() * NOTIFICATION_ID_MAX);

    const { id, schedule_at, text, title } = notification;
    const internalNotification: INotificationInternal = {
      title,
      body: text,
      schedule: { at: new Date(schedule_at) },
      // replace string id with randomly generated integer and store original id in extra
      id: internalId,
      extra: { id, source: "action" },
    };
    return internalNotification;
  }

  private async getNotificationById(id: string) {
    const query = this.dynamicDataService.query$<IDBNotification>("data_list", "_notifications", {
      selector: { id },
    });
    const [notification] = await firstValueFrom(query);
    return notification;
  }

  private async checkPermissions() {
    // If running in browser first check to ensure notification api exists
    if (!Capacitor.isNativePlatform()) {
      if (!window.Notification) {
        this.permissionStatus.set("unsupported");
        return;
      }
    }
    const { display } = await this.api.checkPermissions();
    // Store to localstorage and signal
    this.localStorageService.setProtected("NOTIFICATION_PERMISSION_STATUS", display);
    this.permissionStatus.set(display);
  }

  /**
   * Capacitor does not persist notifications on web platform, so manually check
   * db for listed notifications and reschedule as required
   */
  private async recheckScheduledNotifications() {
    if (!Capacitor.isNativePlatform()) {
      // On web pending notifications dropped on refresh, so reschedule
      const pendingNotifications = await this.listDBPendingNotifications();
      const schedulePromises = pendingNotifications.map((notification) =>
        this.scheduleNotification(notification)
      );
      await Promise.allSettled(schedulePromises);
    }
  }

  private async markDismissedNotifications() {
    // notification schedule_at will not be indexed so retrieve all notifications and filter after
    const query = this.dynamicDataService.query$<IDBNotification>("data_list", "_notifications");
    const allNotifications = await firstValueFrom(query);
    const now = new Date().getTime();
    // Assume any notifications scheduled in past that haven't been interacted with must have been dismissed
    const dismissed = allNotifications
      .filter((n) => n.status === "pending" && new Date(n.schedule_at).getTime() < now)
      .map((n) => {
        n.status = "dismissed";
        return n;
      });
    await this.dynamicDataService.bulkUpsert("data_list", "_notifications", dismissed);
  }

  /** List notifications from DB scheduled in the future */
  private async listDBPendingNotifications() {
    // notification schedule_at will not be indexed so retrieve all notifications and filter after
    const query = this.dynamicDataService.query$<IDBNotification>("data_list", "_notifications");
    const allNotifications = await firstValueFrom(query);
    const now = new Date().getTime();
    return allNotifications.filter((v) => new Date(v.schedule_at).getTime() > now);
  }

  private addNotificationListeners() {
    // Subscribe to notification action events and update the DB when notification interacted with
    LocalNotifications.addListener("localNotificationActionPerformed", async (n) => {
      const { extra } = n.notification as INotificationInternal;
      if (extra?.id && extra?.source === "action") {
        const dbNotification = await this.getNotificationById(n.notification.extra.id);
        const update: IDBNotification = {
          ...dbNotification,
          status: "interacted",
          action_performed: {
            timestamp: getLocalISOString(),
            id: n.actionId,
          },
        };
        await this.setDBNotification(update);
      }
    });
    // Whenever any notification received use as prompt to mark notifications as dismissed
    // This may be replaced in the future if the above action is triggered
    LocalNotifications.addListener("localNotificationReceived", async () => {
      await this.markDismissedNotifications();
    });
  }

  /** Check for potential scheduling issues and return any errors */
  private async validateNotification(notification: Partial<INotification> = {}) {
    const { id, schedule_at } = notification;
    // Check for notification permission - request if not already granted
    if (this.permissionStatus() === "unsupported") {
      return { valid: false, msg: "unsupported on device" };
    }
    if (this.permissionStatus() !== "granted") {
      const request = await this.requestPermission();
      if (request === "denied") {
        return { valid: false, msg: "denied by user permission" };
      }
    }
    if (!id) {
      return { valid: false, msg: "id not specified" };
    }
    if (!schedule_at) {
      return { valid: false, msg: "schedule_at not specified" };
    }
    if (new Date(schedule_at).getTime() <= new Date().getTime()) {
      return { valid: false, msg: "schedule_at in past" };
    }
    return { valid: true };
  }
}

/**
 * Utility method to generate a string in the format of an isoString,
 * but using users local timezone.
 *  */
function getLocalISOString() {
  const now = new Date();
  // Get components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  // Format as "YYYY-MM-DDTHH:mm:ss"
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
