import { Injectable } from "@angular/core";
import { LocalNotificationScheduleResult, Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: "root",
})
/**
 * https://capacitorjs.com/docs/apis/local-notifications
 * NOTE - custom icons
 * These need to be registered in advance as android assets (see link above)
 *
 */
export class LocalNotificationService {
  enabled = false;
  constructor() {
    this.init();
    this._addListeners();
  }
  async init() {
    const { granted } = await LocalNotifications.requestPermission();
    if (granted) {
      this.enabled = true;
      this._addListeners();
    } else {
      // can still add listeners locally
    }
  }

  async scheduleNotification(
    callback = (notifications: LocalNotificationScheduleResult) => null
  ) {
    const result = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: "Body",
          id: 1,
          // see full scheduling options in type interface
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null,
        },
      ],
    });
    callback(result);
    console.log("scheduled notifications", result);
    return result;
  }

  async _addListeners() {
    LocalNotifications.removeAllListeners();
    LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (action) => console.log("action", action)
      // TODO emit event for action to other listeners?
      // good to have default as can only ever have 1 listener for each type
    );
    LocalNotifications.addListener(
      "localNotificationReceived",
      (notification) => console.log("notification", notification)
    );
  }
}
