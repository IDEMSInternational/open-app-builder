import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  LocalNotification,
  LocalNotificationAction,
  Plugins,
  Capacitor,
  LocalNotificationPendingList,
} from "@capacitor/core";
const { LocalNotifications } = Plugins;

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
  constructor(private router: Router) {
    this.init();
    this._addListeners();
  }
  async init() {
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

  /**
   * Schedule a local notification
   * @param options - Supports full notification options,
   * with a minimum of schedule required and a named action type
   * see full scheduling options in type interface
   * see named actions below for configurations
   */
  async scheduleNotification(
    options: Partial<LocalNotification> & {
      schedule: LocalNotification["schedule"];
    }
  ) {
    const result = await LocalNotifications.schedule({
      notifications: [
        {
          ...NOTIFICATION_DEFAULTS,
          ...options,
        },
      ],
    });
    console.log("scheduled notifications", result);
    return result;
  }

  /**
   *
   * @example this.removeNotifications({notifications:[{id:"103"}]})
   */
  removeNotifications(notifications: LocalNotificationPendingList) {
    return LocalNotifications.cancel(notifications);
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
    LocalNotifications.addListener(
      "localNotificationReceived",
      (notification) => console.log(["NOTIFICATION RECEIVED"], notification)
    );
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
