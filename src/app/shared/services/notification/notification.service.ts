import { Injectable } from "@angular/core";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  token: string;
  public messages$: Subject<IRapidProMessage> = new Subject();
  constructor(
    private firebase: FirebaseX,
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
  public init() {
    this.firebase
      .getToken()
      .then((token) => {
        this.token = token;
        console.log(`The token is ${token}`);
        this.registerRapidproToken(token);
      }) // save the token server-side and use it to push notifications to this device
      .catch((error) => console.error("Error getting token", error));
    this.firebase
      .onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  handleNotification(message: IRapidProMessage) {
    console.log("message received", message);
    // alert(`Message Received: ${message.message}`);
    setTimeout(() => {
      if (message) {
        this.messages$.next(message);
      }
    });
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
    const data: IRapidProRegistrationData = { urn, token, name };
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
  token: string;
  name?: string;
}

export interface IRapidProMessage {
  body: string;
  message: string;
  message_id: string;
  title: string;
  type: string;
  wasTapped: boolean; // informs whether message received in app foreground or background
  quick_replies?: string; // string with JSON array. e.g "["English","Malay"]"
}

export const MOCK_RAPIDPRO_MESSAGE: IRapidProMessage = {
  body: "Hello from Rapidpro",
  message: "Hello from Rapidpro",
  message_id: "5",
  title: "Firebase Cloud Messaging - Tips Demo App",
  type: "rapidpro",
  wasTapped: false,
};
