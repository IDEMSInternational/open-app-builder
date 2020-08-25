import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ChatService {

  public messageSubject: Subject<IRapidProMessage> = new Subject();

  constructor() {
    
  }

  public sendRapidproMessage(msg: string) {
    console.log("Sending message", msg);
    setTimeout(() => {
      this.messageSubject.next(MOCK_RAPIDPRO_MESSAGE);
    }, 3000);
  }
}


interface IRapidProMessageData {
  msg: string;
  fcm_token: string;
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
