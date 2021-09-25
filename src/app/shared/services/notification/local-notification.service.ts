import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import {
  LocalNotifications,
  LocalNotificationSchema,
  ActionType,
} from "@capacitor/local-notifications";
import { addSeconds } from "date-fns";
import { BehaviorSubject } from "rxjs";
import { DbService } from "../db/db.service";

const LOCAL_STORAGE_KEY = "local_notifications_list";

/** Utility type to assert local notification has extra and schedule defined */
export interface ILocalNotification extends LocalNotificationSchema {
  schedule: LocalNotificationSchema["schedule"];
  extra: any;
}

@Injectable({
  providedIn: "root",
})
/**
 * https://capacitorjs.com/docs/apis/local-notifications
 * NOTE - custom icons
 * These need to be registered in advance as android assets (see link above)
 *
 * Note - local notificaitons always display in a banner (even in foreground mode)
 *
 * Note - complex system required to maintain copy of notifications in storage and calculate
 * which may have been triggered since last load as capacitor api only keeps notification ids (not meta)
 * and doesn't always trigger events based on notifications (e.g. web provides no listener bindings)
 *
 */
export class LocalNotificationService {
  /**
   * list of all notifications processed since app load for processing by services initialising after
   * Includes any notifications previously scheduled but no longer present (e.g dismissed while app closed)
   **/
  public triggeredNotifications: ILocalNotification[] = [];
  public pendingNotifications: ILocalNotification[] = [];
  /** oservable */
  public notificationsUpdated$ = new BehaviorSubject(new Date().getTime());
  public permissionGranted = false;

  constructor(private dbService: DbService) {}

  public async init() {
    this.permissionGranted = await this.requestPermission();
    if (this.permissionGranted) {
      if (Capacitor.isNative) {
        await LocalNotifications.registerActionTypes({
          types: Object.values(NOTIFICATION_ACTIONS),
        });
      }
    }
    this._addListeners();
    await this.loadNotifications();
  }

  public async requestPermission(): Promise<boolean> {
    const { display } = await LocalNotifications.requestPermissions();
    return display === "granted";
  }

  /**
   * Retrieve a list of pending notification IDs read from the notifications plugin
   * and compare against metadata saved in localstorage. Combine to determine list of notifications
   * that have since been sent (but not triggered in the app), and list of pending future notifications
   */
  private async loadNotifications() {
    console.group("[Notifications] load");
    const now = new Date();
    // handle rescheduling notifications if lost from capacitor (e.g. web refresh)
    const rescheduledNotifications = await this.getNotificationsRescheduled(now);
    if (rescheduledNotifications.length > 0) {
      for (const rescheduledNotification of rescheduledNotifications) {
        // convert schedule back to date object from string representation
        rescheduledNotification.schedule.at = new Date(rescheduledNotification.schedule.at);
        await this.scheduleNotification(rescheduledNotification as any, false);
      }
      console.groupEnd();
      return this.loadNotifications();
    }

    // use current timestamp to determine notifications triggered before now, or upcoming notifications
    const triggeredNotifications = await this.getNotificationsTriggered(now);
    this.triggeredNotifications = [...this.triggeredNotifications, ...triggeredNotifications];

    const pendingNotifications = await this.getNotificationsPending();
    this.pendingNotifications = pendingNotifications.sort((a, b) =>
      a.schedule.at > b.schedule.at ? 1 : -1
    );
    console.log("pending notifications", this.pendingNotifications);
    console.log("triggered notifications", this.triggeredNotifications);
    // now that triggered/pending have been handled update stored cached to remove triggered
    // and avoid reprocessing on a subsequent load
    this.setLocalStorageNotifications(pendingNotifications);
    console.groupEnd();

    // notify subscribers that data may have been updated
    this.notificationsUpdated$.next(new Date().getTime());
  }

  private async getNotificationsRescheduled(timeSince: Date) {
    const missingNotifications = await this.getNotificationsNotPending();
    // handle notification rescheduling (wiped from session in web app)
    return missingNotifications.filter((n) => (n.schedule.at as any) > timeSince.toISOString());
  }

  /** Retrieve list of notifications no longer scheduled that were previously scheduled and stored */
  private async getNotificationsTriggered(timeSince: Date) {
    const missingNotifications = await this.getNotificationsNotPending();
    return missingNotifications.filter((n) => (n.schedule.at as any) <= timeSince.toISOString());
  }

  /** Retrieve list of pending notifications */
  private async getNotificationsPending() {
    const { notifications } = await LocalNotifications.getPending();
    return notifications as ILocalNotification[];
  }

  /** Retrieve list of notifications that appear in storage but are not scheduled (e.g. cleared by capacitor wb) */
  private async getNotificationsNotPending() {
    const pending = await this.getNotificationsPending();
    const pendingIds = pending.map((n) => n.id);
    const storedNotificationMeta = this.getLocalStorageNotifications();
    return storedNotificationMeta.filter((n) => !pendingIds.includes(n.id));
  }

  /**
   * Schedule a local notification
   * @param options - Supports full notification options,
   * with a minimum of schedule required and a named action type
   * see full scheduling options in type interface
   * see named actions below for configurations
   */
  public async scheduleNotification(options: ILocalNotification, reloadNotifications = true) {
    options.extra = { ...options.extra };
    const notifications = [{ ...NOTIFICATION_DEFAULTS, ...options }];
    await LocalNotifications.schedule({ notifications });
    // ensure extra field populated (TODO - could make stronger requirement elsewhere)
    options.extra = { ...options.extra };
    this.addLocalStorageNotification(options as ILocalNotification);
    if (reloadNotifications) {
      await this.loadNotifications();
    }
  }

  /**
   *
   */
  public async removeNotification(id: number, reloadNotifications = true) {
    // remove from schedule
    const notifications = [{ id }];
    await LocalNotifications.cancel({ notifications });
    // remove from localStorage
    this.removeLocalStorageNotification(id);
    if (reloadNotifications) {
      await this.loadNotifications();
    }
  }

  /**
   * Debug method used to Schedule/Reschedule a notification to trigger after short delay
   * @param notification
   * @param delay - number of seconds to delay sending notification (default 3s)
   * @param forceBackground - WiP - minimise the app to show notification when app in background
   */
  public async scheduleImmediateNotification(
    notification: ILocalNotification,
    delay = 3,
    forceBackground = true
  ) {
    // remove any existing notificaiton and reschedule with a new id to allow action reprocessing
    await this.removeNotification(notification.id, false);
    const notificationDeliveryTime = addSeconds(new Date(), delay);
    const immediateNotification = {
      ...notification,
      schedule: { at: notificationDeliveryTime },
      id: new Date().getTime(),
    };
    await this.scheduleNotification(immediateNotification, false);
    if (Capacitor.isNative && forceBackground) {
      // Ideally we want to minimise the app to see response when app is in background,
      // although the method appears inconsistent. Alternative minimiseApp proposed:
      // https://github.com/ionic-team/capacitor-plugins/issues/130
      // https://github.com/ionic-team/capacitor/issues?q=exitapp
      // App.exitApp();
    }
    return immediateNotification;
  }

  /**
   * When notifications are scheduled only the ID number (as string) is returned when querying
   * Store full details in localstorage for future retrieval
   */
  private addLocalStorageNotification(notification: ILocalNotification) {
    // remove any duplicate id
    const localNotifications = this.getLocalStorageNotifications();
    const updatedNotifications = localNotifications.filter((n) => n.id !== notification.id);
    updatedNotifications.push(notification);
    this.setLocalStorageNotifications(updatedNotifications);
  }

  private removeLocalStorageNotification(id: number) {
    const localNotifications = this.getLocalStorageNotifications();
    const updatedNotifications = localNotifications.filter((n) => n.id !== id);
    this.setLocalStorageNotifications(updatedNotifications);
  }

  private getLocalStorageNotifications(): ILocalNotification[] {
    const storedNotifications = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  }
  private setLocalStorageNotifications(localNotifications: ILocalNotification[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localNotifications));
  }

  /**
   *
   * NOTE - CC 2021-09-23
   * As notifications contain custom extra data that needs to be handled by different services,
   * we actually don't want to do much directly when notification received. Instead we trigger
   * the load script which handled tracking notificaitons previously schedule but no longer existing
   * (to allow ). Also the triggers don't appear to be working on web
   *
   * TODO - handle removal/re-init methods to avoid memory leaks
   */
  async _addListeners() {
    // LocalNotifications.removeAllListeners();
    LocalNotifications.addListener(
      "localNotificationActionPerformed",
      async (action) => {
        console.log("[NOTIFICATION ACTION]", action);
        await this.loadNotifications();
      }
      // TODO emit event for action to other listeners?
      // good to have default as can only ever have 1 listener for each type
    );
    // Note - currently not working: https://github.com/ionic-team/capacitor/issues/2352
    LocalNotifications.addListener("localNotificationReceived", async (notification) => {
      console.log(["NOTIFICATION RECEIVED"], notification);
      await this.loadNotifications();
    });
  }
}

// Explicitly list actions here to enforce strict typing later
type IActionTypeId = "action_1" | "action_2";

/**
 * More fine-grained control to notifications can be set through the use of registered
 * actions.
 * Note, these might not be fully functional at the moment
 * https://forum.ionicframework.com/t/push-notifications-background-handler/188578
 * https://forum.ionicframework.com/t/android-capacitor-local-notification-clear-dismiss-button/184896/2
 * Could possibly consider: https://github.com/katzer/cordova-plugin-local-notifications
 */
const NOTIFICATION_ACTIONS: {
  [key in IActionTypeId]: ActionType;
} = {
  action_1: {
    id: "action_1",
    actions: [
      {
        title: "Test 1",
        id: "action_1",
        requiresAuthentication: false,
        foreground: true,
        destructive: true,
        input: true,
        inputButtonTitle: "input",
        inputPlaceholder: "some text",
      },
    ],
  },
  action_2: {
    id: "action_1",
    actions: [
      {
        title: "Test 1",
        id: "action_1",
        requiresAuthentication: false,
        foreground: false,
        destructive: false,
        input: false,
        inputButtonTitle: "input",
        inputPlaceholder: "some text",
      },
    ],
  },
};

/**
 * Default settings used where otherwise not specified
 */
const NOTIFICATION_DEFAULTS: LocalNotificationSchema = {
  id: new Date().getUTCMilliseconds(),
  title: "PLH Teens",
  body: "You have a new message waiting for you",
  sound: null,
  attachments: null,
  actionTypeId: "action_1",
  extra: null,
  // Note, we don't want android to remove notification as we will handle in db
  autoCancel: false,
};
