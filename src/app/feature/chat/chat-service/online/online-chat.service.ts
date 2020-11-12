import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError, of, Subscription } from 'rxjs';
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
export class OnlineChatService {

  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);
  subscription: Subscription;

  constructor(private notificationService: NotificationService, private toolboxService: ToolboxService) {
  }

  public async init(): Promise<any> {
    if (Capacitor.isNative) {
      await this.notificationService.init();
    } else {
      return of({});
    }
  }

  public runTrigger(trigger: ChatTrigger): Observable<BehaviorSubject<ChatMessage[]>> {
    this.messages$.complete();
    this.messages$ = new BehaviorSubject([]);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.notificationService.messages$.subscribe((rpMsg) => {
      convertFromRapidProMsg(rpMsg).then((chatMessage) => {
        this.messages$.next(this.messages$.getValue().concat([chatMessage]))
      })
    }, (err) => {
      this.messages$.error(err);
    });
    return from(this.notificationService.sendRapidproMessage(trigger.phrase).then(() => {
      return this.messages$;
    }));
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
