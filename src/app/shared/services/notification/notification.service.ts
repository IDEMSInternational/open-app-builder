import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Subject, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  initalized = false;
  initializing = false;
  token: string;
  public messages$: Subject<IRapidProMessage> = new Subject();
  constructor(
    private device: Device,
    private http: HTTP
  ) {
    console.log("hello notification service");
  }

  /**
   * Initialisation is called from app.component.ts after platform ready
   * (currently only when running on device/cordova)
   * Obtain push notification token and provide to RapidPro for messaging.
   * Subscribe to messages.
   */
  public async init() {
    if (!this.initalized && !this.initializing) {
      this.initializing = true;
      let result = await PushNotifications.requestPermission();
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
      PushNotifications.addListener(
        "registration",
        (token: PushNotificationToken) => {
          this.token = token.value;
          console.log(`The token is ${token.value}`);
          this.registerRapidproToken(token.value);
        }
      );

      PushNotifications.addListener("registrationError", (error: any) => {
        console.error("Error on registration: " + JSON.stringify(error));
      });

      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotification) => {
          console.log("Push received: " + JSON.stringify(notification));
          this.handleNotification(notification.data);
        }
      );

      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: PushNotificationActionPerformed) => {
          alert("Push action performed: " + JSON.stringify(notification));
        }
      );
      this.initializing = false;
      this.initalized = true;
    }
  }

  handleNotification(message: IRapidProMessage) {
    console.log("message received", message);
    this.messages$.next(message);
  }
  /**
   * Send a message to rapidpro servers
   */
  async sendRapidproMessage(msg: string) {
    const { receiveUrl } = environment.rapidPro;
    const from = this.device.uuid;
    const token = this.token;
    const data: IRapidProMessageData = { msg, token, from };
    try {
      const res = await this.http.post(receiveUrl, data, {});
      console.log("message sent", res);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * When device starts inform rapidpro of device id token for
   * receiving push notifications. Link to an ID unique to the device
   * so that token updates do not create new rapidpro contacts
   */
  async registerRapidproToken(token: string) {
    this.token = token;
    const { contactRegisterUrl } = environment.rapidPro;
    const urn = this.device.uuid;
    const name = `app-${urn}`;
    const data: IRapidProRegistrationData = {
      urn,
      fcm_token: token,
      name,
    };
    try {
      const res = await this.http.post(contactRegisterUrl, data, {});
      console.log("token registered", res);
    } catch (error) {
      console.error(error);
    }
  }
}

interface IRapidProMessageData {
  msg: string;
  token: string;
  from: string;
}

interface IRapidProRegistrationData {
  urn: string; // rapidpro contact identifier
  fcm_token: string;
  name?: string;
}

export interface IRapidProMessage {
  body: string;
  message: string;
  message_id: string;
  title: string;
  type: string;
  wasTapped?: boolean; // informs whether message received in app foreground or background
  quick_replies?: string; // string with JSON array. e.g "["English","Malay"]"
  attachments?: string[];
}

export const MOCK_RAPIDPRO_MESSAGE: IRapidProMessage = {
  body: "Hello from Rapidpro",
  message: "Hello from Rapidpro",
  message_id: "5",
  title: "Firebase Cloud Messaging - Tips Demo App",
  type: "rapidpro",
  wasTapped: false,
};
