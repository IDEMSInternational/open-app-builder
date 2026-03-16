import { effect, Injectable, signal } from "@angular/core";
import { Capacitor, PermissionState } from "@capacitor/core";
import type { FlowTypes } from "data-models";
import { LocalNotifications } from "@capacitor/local-notifications";
import { firstValueFrom } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { IDBNotification, INotification, INotificationInternal } from "./notification.types";
import { App } from "@capacitor/app";
import { CapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.service";
import { _wait } from "packages/shared/src/utils/async-utils";
import { NotificationActionFactory } from "./notification.actions";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";

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
    private dynamicDataService: DynamicDataService,
    private capacitorEventService: CapacitorEventService,
    private actionRegistry: TemplateActionRegistry
  ) {
    // Register action handlers
    const { notification } = new NotificationActionFactory(this);
    actionRegistry.register({ notification });

    // Setup listeners immediately to ensure events are not dropped
    this.addNotificationListeners();

    // Ensure permission status reflected to protected field
    effect(async () => {
      const permissionStatus = this.permissionStatus();
      if (permissionStatus === "granted") {
        await this.recheckScheduledNotifications();
        await this.checkIgnoredNotifications();
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
      console.log("[Notification] scheduled", dbNotification);
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
    if (notifications.length > 0) {
      await this.api.cancel({ notifications });
    }
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
    if (notification) {
      return notification;
    }
    return null;
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

  /**
   * Check through list of all db notifications and infer ignored status on any
   * pending notifications where the schedule time is in the past
   *
   * This method is called during the following events to try and ensure status kept updates
   * 1. Service init (initial template views should have correct data)
   * 2. App resumes from minimised app state (check again to ensure UI updated)
   *
   * This is more reliable than depending on app timers (e.g. setTimeout, setInterval) as these timers
   * are suspended while the app is minimised and do not catch up
   *
   * If notifications received while app in foreground they handled via native listener callback
   */
  private async checkIgnoredNotifications() {
    // HACK - ensure check performed after any pending db writes related to actions processed
    await _wait(1000);
    // notification schedule_at will not be indexed so retrieve all notifications and filter after
    const query = this.dynamicDataService.query$<IDBNotification>("data_list", "_notifications");
    const allNotifications = await firstValueFrom(query);
    const now = new Date().getTime();
    // Assume any notifications scheduled in past that haven't been interacted with must have been ignored
    const ignored = allNotifications
      .filter((n) => n.status === "pending" && new Date(n.schedule_at).getTime() < now)
      .map((n) => {
        n.status = "ignored";
        return n;
      });
    if (ignored.length > 0) {
      console.log("[Notification] Mark Ignored", ignored);
      await this.dynamicDataService.bulkUpsert("data_list", "_notifications", ignored);
      // Ensure any received actions also processed
      for (const notification of ignored) {
        await this.triggerNotificationActions(notification.action_list, "notification_received");
      }
    }
  }

  /** List notifications from DB scheduled in the future */
  private async listDBPendingNotifications() {
    // notification schedule_at will not be indexed so retrieve all notifications and filter after
    const query = this.dynamicDataService.query$<IDBNotification>("data_list", "_notifications");
    const allNotifications = await firstValueFrom(query);
    const now = new Date().getTime();
    return allNotifications.filter((v) => new Date(v.schedule_at).getTime() > now);
  }

  private async addNotificationListeners() {
    // Subscribe to notification action events and update the DB when notification interacted with
    // Use proxy CapacitorEventService to capture any events emitted before this service ready
    this.capacitorEventService.localNotificationActionPerformed.subscribe((action) => {
      const notification = action.notification as INotificationInternal;
      // Only trigger actions for notifications also created by same service
      if (notification.extra?.id && notification.extra?.source === "action") {
        console.log("[Notification] Action", action);
        this.handleNotificationInteracted(action.actionId, notification);
      }
    });
    // Whenever any notification received use as prompt to mark notifications as ignored
    // This may be replaced in the future if the above action is triggered
    this.capacitorEventService.localNotificationReceived.subscribe(
      (notification: INotificationInternal) => {
        if (notification.extra?.id && notification.extra?.source === "action") {
          console.log("[Notification] Received", notification);
          this.handleNotificationReceived(notification);
        }
      }
    );
    // Additionally listen to app resume events to also trigger processing to make sure
    // DB up-to-date if a user has minimised the app and returns after notifications ignored
    App.addListener("resume", () => this.checkIgnoredNotifications());
  }

  /** When notification interacted with update the db accordingly */
  private async handleNotificationInteracted(
    actionId: string,
    notification: INotificationInternal
  ) {
    // If notification tap opened app from closed state will need to wait for services to be ready
    await this.dynamicDataService.ready();
    const dbNotification = await this.getNotificationById(notification.extra.id);
    if (dbNotification) {
      const update: IDBNotification = {
        ...dbNotification,
        status: "interacted",
        action_performed: {
          timestamp: getLocalISOString(),
          id: actionId,
        },
      };
      await this.setDBNotification(update);
      await this.triggerNotificationActions(dbNotification.action_list, "notification_interacted");
    } else {
      console.warn("Failed to find db notification:", notification.extra.id);
    }
  }

  /** If notification received while app in foreground use as trigger to mark ignored notifications */
  private async handleNotificationReceived(notification: INotificationInternal) {
    const dbNotification = await this.getNotificationById(notification.extra.id);
    if (dbNotification) {
      const update: IDBNotification = { ...dbNotification, status: "ignored" };
      await this.setDBNotification(update);
      await this.triggerNotificationActions(dbNotification.action_list, "notification_received");
    }
  }

  private async triggerNotificationActions(
    action_list: FlowTypes.TemplateRowAction[] = [],
    trigger: FlowTypes.TemplateRowActionTrigger
  ) {
    for (const action of action_list.filter((v) => v.trigger === trigger)) {
      await this.actionRegistry.trigger(action);
    }
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
      return { valid: false, msg: "schedule_at in past: " + schedule_at };
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
