import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError, of } from 'rxjs';
import { IRapidProMessage, NotificationService } from '../../notification/notification.service';
import { ToolboxService } from '../../toolbox/toolbox.service';
import { ChatMessage } from '../chat-msg.model';
import { ChatService } from '../chat.service';
import { ChatTrigger } from '../chat.triggers';
import { Capacitor } from "@capacitor/core";
import { convertFromRapidProMsg } from '../message.converter';

@Injectable({
  providedIn: 'root'
})
export class OnlineChatService implements ChatService {

  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);

  constructor(private notificationService: NotificationService, private toolboxService: ToolboxService) {
    this.notificationService.messages$.subscribe((messages) => {
      if (messages.length > 0) {
        let lastMessage = messages[messages.length - 1];
        if (this.isControlMessage(lastMessage)) {
          this.executeControlMessage(lastMessage);
        } else {
          let chatMessages = messages
            .filter((rpMsg) => !this.isControlMessage(rpMsg))
            .map(convertFromRapidProMsg);
          this.messages$.next(chatMessages);
        }
      }
    },
      (err) => {
        this.messages$.error(err);
      });
  }

  public init(): Observable<any> {
    if (Capacitor.isNative) {
      return of(this.notificationService.init());
    } else {
      return of({});
    }
  }

  public runTrigger(trigger: ChatTrigger): Observable<any> {
    return from(this.notificationService.sendRapidproMessage(trigger.phrase));
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    return from(this.notificationService.sendRapidproMessage(message.text));
  }

  private isControlMessage(rpMsg: IRapidProMessage): boolean {
    return rpMsg.message.indexOf("UNLOCK_TOPIC,") > -1;
  }

  private executeControlMessage(rpMsg: IRapidProMessage) {
    if (rpMsg.message.indexOf("UNLOCK_TOPIC,") > -1) {
      let topicTypeString = rpMsg.message.split(",")[1];
      this.toolboxService.getTopicMetadatas().subscribe((topicMetadatas) => {
        let topicMetadata = topicMetadatas.find((tmd) => tmd.type === topicTypeString);
        if (topicMetadata) {
          this.toolboxService.unlockTopic(topicMetadata.type);
        }
      });
    }
  }

}
