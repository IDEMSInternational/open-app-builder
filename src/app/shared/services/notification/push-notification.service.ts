import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Subject } from "rxjs";

import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from "@capacitor/push-notifications";

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  initalized = false;
  initializing = false;
  public token: string;
  public messages$ = new Subject<any>();
  constructor(public device: Device, public http: HTTP) {}

  /**
   * Initialisation is called from app.component.ts after platform ready
   * (currently only when running on device/cordova)
   * Obtain push notification token and provide to RapidPro for messaging.
   * Subscribe to messages.
   */
  public async init() {
    if (!this.initalized && !this.initializing) {
      this.initializing = true;
      let granted = await PushNotifications.requestPermissions();
      if (granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
      PushNotifications.addListener("registration", (token: Token) => {
        this.token = token.value;
        console.log(`The token is ${token.value}`);
      });

      PushNotifications.addListener("registrationError", (error: any) => {
        console.error("Error on registration: " + JSON.stringify(error));
      });

      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotificationSchema) => {
          console.log("Push received: " + JSON.stringify(notification));
          this.handleNotification(notification.data);
        }
      );

      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (action: ActionPerformed) => {
          alert("Push action performed: " + JSON.stringify(action));
        }
      );
      this.initializing = false;
      this.initalized = true;
    }
  }

  handleNotification<T>(message: T) {
    console.log("message received", message);
    this.messages$.next(message);
  }
}
