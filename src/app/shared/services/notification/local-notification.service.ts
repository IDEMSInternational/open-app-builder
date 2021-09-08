import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  LocalNotification,
  LocalNotificationAction,
  Plugins,
  Capacitor,
  LocalNotificationPendingList,
  App,
} from "@capacitor/core";
import { addSeconds } from "date-fns";
import { Subject } from "rxjs";
const { LocalNotifications } = Plugins;

const LOCAL_STORAGE_KEY = "local_notifications";
export type ILocalNotificationStorage = { [id: string]: Partial<LocalNotification> };

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
 */
export class LocalNotificationService {
  enabled = false;

  public notifications$ = new Subject<any>();

  public notificationsList: LocalNotification[] = [];
  public notificationsHash: ILocalNotificationStorage = {};

  constructor(private router: Router) {
    this.init();
    this._addListeners();
  }
  async init() {
    await this.requestPermission();
    const { granted } = await LocalNotifications.requestPermission();
    if (granted) {
      this.enabled = true;
      if (Capacitor.isNative) {
        await LocalNotifications.registerActionTypes({
          types: Object.values(NOTIFICATION_ACTIONS),
        });
      }
      console.log("notifications are enabled");
      this._addListeners();
    } else {
      this._addListeners();
      // can still add listeners locally
    }
  }

  public requestPermission() {
    return new Promise((resolve) => {
      LocalNotifications.requestPermissions()
        .then(({ results }) => {
          const permissionState = results[0];
          resolve(permissionState === "granted" ? true : false);
        })
        .catch((err) => {
          if (err === "default") {
            // user dismissed request;
          }
          if (err === "denied") {
            // user or browser blocked request;
          }
          console.error(err);
          resolve(false);
        });
    });
  }

  /**
   * Retrieve a list of pending notification IDs from
   */
  public async loadNotifications() {
    const { notifications } = await LocalNotifications.getPending();
    const pendingNotificationIds = Object.values(notifications).map((n) => n.id);
    const localNotifications = this.getLocalStorageNotifications();
    // remove local notifications no longer listed in pending
    Object.keys(localNotifications).forEach((k) => {
      if (!pendingNotificationIds.includes(k)) {
        delete localNotifications[k];
      }
    });
    // check for pending notifications with no local data stored (simply log error)
    pendingNotificationIds.forEach((id) => {
      if (!localNotifications.hasOwnProperty(id)) {
        console.error("No local notification meta saved for id", id);
      }
    });
    this.setLocalStorageNotifications(localNotifications);
    // store variables
    this.notificationsHash = localNotifications;
    const list = Object.values(localNotifications) as LocalNotification[];
    this.notificationsList = list.sort((a, b) => (a.schedule.at > b.schedule.at ? -1 : 1));
    return localNotifications;
  }

  /**
   * Schedule a local notification
   * @param options - Supports full notification options,
   * with a minimum of schedule required and a named action type
   * see full scheduling options in type interface
   * see named actions below for configurations
   */
  public async scheduleNotification(
    options: Partial<LocalNotification> & {
      schedule: LocalNotification["schedule"];
    }
  ) {
    const notifications = [{ ...NOTIFICATION_DEFAULTS, ...options }];
    const result = await LocalNotifications.schedule({ notifications });
    const { id } = options;
    // when retrieved the numeric id has been converted back to string (for some reason)
    if (result?.notifications?.[0].id === `${id}`) {
      this.storeNotificationDetail(id, options);
    }
    return this.loadNotifications();
  }

  /**
   *
   */
  public async removeNotification(notification: Partial<LocalNotification>) {
    const { id } = notification;
    const list: LocalNotificationPendingList = { notifications: [{ id: `${id}` }] };
    await LocalNotifications.cancel(list);
    return this.loadNotifications();
  }

  /**
   *
   * @param notification
   * @param delay - number of seconds to delay sending notification (default 3s)
   * @param forceBackground - WiP - minimise the app to show notification when app in background
   */
  public async previewNotification(
    notification: LocalNotification,
    delay = 3,
    forceBackground = true
  ) {
    const notificationDeliveryTime = addSeconds(new Date(), delay);
    const preview = {
      ...notification,
      id: notificationDeliveryTime.getTime(),
      schedule: { at: notificationDeliveryTime },
    };
    // create a duplicate notification to fire after short delay
    this.scheduleNotification(preview);
    if (Capacitor.isNative && forceBackground) {
      // Ideally we want to minimise the app to see response when app is in background,
      // although the method appears inconsistent. Alternative minimiseApp proposed:
      // https://github.com/ionic-team/capacitor-plugins/issues/130
      // https://github.com/ionic-team/capacitor/issues?q=exitapp
      // App.exitApp();
    }
    return preview;
  }

  /**
   *
   * NOTE - requires secure context and limited browser support (https://developer.mozilla.org/en-US/docs/Web/API/notification)
   * @returns
   */
  private async requestWebNotificationPermission() {
    if ("Notification" in window) {
      if (window.Notification.permission === "granted") {
        return true;
      } else {
        const permission = await window.Notification.requestPermission();
        console.log("[Notification Permission]", permission);
        return permission === "granted";
      }
    } else {
      console.error("Notification API not available");
      return false;
    }
  }

  /**
   * When notifications are scheduled only the ID number (as string) is returned when querying
   * Store full details in localstorage for future retrieval
   */
  private storeNotificationDetail(id: number, notification: Partial<LocalNotification>) {
    const localNotifications = this.getLocalStorageNotifications();
    localNotifications[`${id}`] = notification;
    this.setLocalStorageNotifications(localNotifications);
  }
  private getLocalStorageNotifications() {
    const storedNotifications = localStorage.getItem(LOCAL_STORAGE_KEY);
    const notificationsByKey: ILocalNotificationStorage = JSON.parse(storedNotifications || "{}");
    return notificationsByKey;
  }
  private setLocalStorageNotifications(localNotifications: ILocalNotificationStorage) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localNotifications));
  }

  async _addListeners() {
    // LocalNotifications.removeAllListeners();
    LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (action) => {
        console.log("[NOTIFICATION ACTION]", action);
        if (action.notification.extra && action.notification.extra.openPath) {
          this.router.navigateByUrl(action.notification.extra.openPath);
        }
      }
      // TODO emit event for action to other listeners?
      // good to have default as can only ever have 1 listener for each type
    );
    // Note - currently not working: https://github.com/ionic-team/capacitor/issues/2352
    LocalNotifications.addListener("localNotificationReceived", (notification) => {
      console.log(["NOTIFICATION RECEIVED"], notification);
      this.notifications$.next(notification);
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
  [key in IActionTypeId]: LocalNotificationAction;
} = {
  action_1: {
    title: "Test 1",
    id: "action_1",
    requiresAuthentication: false,
    foreground: true,
    destructive: true,
    input: true,
    inputButtonTitle: "input",
    inputPlaceholder: "some text",
  },
  action_2: {
    title: "Test 1",
    id: "action_1",
    requiresAuthentication: false,
    foreground: false,
    destructive: false,
    input: false,
    inputButtonTitle: "input",
    inputPlaceholder: "some text",
  },
};

/**
 * Default settings used where otherwise not specified
 */
const NOTIFICATION_DEFAULTS: LocalNotification & {
  actionTypeId: IActionTypeId;
} = {
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
