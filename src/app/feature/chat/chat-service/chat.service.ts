import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatFlow, RapidProOfflineFlow } from './chat.flow';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ChatService {

  public messageSubject: Subject<IRapidProMessage> = new Subject();

  private currentFlow: ChatFlow;

  private flowFileURLByTrigger: { [triggerWord: string]: string } = {
    "start_demo": "/assets/rapid-pro-flow-exports/PLH-Welcome-Initial_registration.json"
  };

  constructor(protected http: HttpClient) {
    
  }

  private getMatchingFlowURL(msg: string): string | null {
    let matchingTriggers = Object.keys(this.flowFileURLByTrigger).filter((triggerWord) => {
      return msg.toLowerCase().indexOf(triggerWord.toLowerCase()) > -1;
    });
    if (matchingTriggers.length > 0) {
      return this.flowFileURLByTrigger[matchingTriggers[0]];
    }
    return null;
  }

  public sendRapidproMessage(msgText: string) {
    if (!this.currentFlow) {
      let matchingURL = this.getMatchingFlowURL(msgText);
      if (matchingURL) {
        this.http.get(matchingURL).subscribe((response) => {
          this.currentFlow = new RapidProOfflineFlow(this.messageSubject, response as RapidProFlowExport.RootObject);
        },
        (error) => {
          console.error("Some error! ", error);
        });
      } else {
        this.respondToUserWithMessage(MOCK_RAPIDPRO_MESSAGE);
      }
    } else {
      this.currentFlow.sendMessage(msgText);
    }
  }

  private respondToUserWithMessage(msg: IRapidProMessage) {
    setTimeout(() => {
      this.messageSubject.next(msg);
    }, 1000);
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
