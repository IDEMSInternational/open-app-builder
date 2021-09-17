import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PushNotificationService } from "./push-notification.service";

@Injectable({ providedIn: "root" })
/**
 *
 * NOTE - CC 2021-09-08 - Refactored service to tidy push-notification.service although methods untested
 * so will require checking next time planning to implement
 */
export class RapidproNotificationService {
  public token: string;
  constructor(public pushNotificationService: PushNotificationService) {
    this.init();
  }

  async init() {
    await this.pushNotificationService.init();
    this.registerRapidproToken(this.pushNotificationService.token);
  }

  /**
   * When device starts inform rapidpro of device id token for
   * receiving push notifications. Link to an ID unique to the device
   * so that token updates do not create new rapidpro contacts
   */
  async registerRapidproToken(token: string) {
    this.token = token;
    const { device, http } = this.pushNotificationService;
    const { contactRegisterUrl } = environment.rapidPro;
    const urn = device.uuid;
    const name = `app-${urn}`;
    const data: IRapidProRegistrationData = {
      urn,
      fcm_token: token,
      name,
    };
    try {
      const res = await http.post(contactRegisterUrl, data, {});
      console.log("token registered", res);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Send a message to rapidpro servers
   */
  public async sendRapidproMessage(msg: string) {
    const { receiveUrl } = environment.rapidPro;
    const { device, token, http } = this.pushNotificationService;
    const from = device.uuid;
    const data: IRapidProMessageData = { msg, token, from };
    try {
      const res = await http.post(receiveUrl, data, {});
      console.log("message sent", res);
    } catch (error) {
      console.error(error);
    }
  }
}

interface IRapidProRegistrationData {
  urn: string; // rapidpro contact identifier
  fcm_token: string;
  name?: string;
}

interface IRapidProMessageData {
  msg: string;
  token: string;
  from: string;
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
