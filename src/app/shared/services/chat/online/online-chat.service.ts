import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { IRapidProMessage, NotificationService } from '../../notification/notification.service';
import { ToolboxService } from '../../toolbox/toolbox.service';
import { ChatMessage } from '../chat-msg.model';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineChatService implements ChatService {

  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);

  constructor(private notificationService: NotificationService, private toolboxService: ToolboxService) {
    this.notificationService.messages$.subscribe((messages) => {
      let lastMessage = messages[messages.length - 1];
      if (!this.isVisibleMessage(lastMessage)) {
        this.executeControlMessage(lastMessage);
      }
      let chatMessages = messages
        .filter(this.isVisibleMessage)
        .map(this.convertFromRapidProMsg);
      this.messages$.next(chatMessages);
    },
    (err) => {
      this.messages$.error(err);
    });
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    return from(this.notificationService.sendRapidproMessage(message.text));
  }

  private isVisibleMessage(rpMsg: IRapidProMessage): boolean {
    return rpMsg.message.indexOf("UNLOCK_TOPIC,") < -1;
  }

  private executeControlMessage(rpMsg: IRapidProMessage) {
    if (rpMsg.message.indexOf("UNLOCK_TOPIC,") < -1) {
      let topicTypeString = rpMsg.message.split(",")[1];
      this.toolboxService.getTopicMetadatas().subscribe((topicMetadatas) => {
        let topicMetadata = topicMetadatas.find((tmd) => tmd.type === topicTypeString);
        if (topicMetadata) {
          this.toolboxService.unlockTopic(topicMetadata.type);
        }
      });
    }
  }

  private convertFromRapidProMsg(rpMsg: IRapidProMessage): ChatMessage {
    let quickReplies: string[] = [];
    if (Array.isArray(rpMsg.quick_replies)) {
      quickReplies = rpMsg.quick_replies
    } else {
      try {
        quickReplies = JSON.parse(rpMsg.quick_replies);
      } catch (ex) {
        quickReplies = [];
      }
    }
    return {
      text: rpMsg.message,
      sender: "bot",
      dateReceived: new Date(),
      responseOptions: quickReplies.map((choice) => ({ text: choice }))
    };
  }

}
