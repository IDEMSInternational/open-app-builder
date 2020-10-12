import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { IRapidProMessage, NotificationService } from '../../notification/notification.service';
import { ChatMessage } from '../chat-msg.model';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineChatService implements ChatService {

  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);

  constructor(private notificationService: NotificationService) {
    this.notificationService.messages$.subscribe((messages) => {
      let chatMessages = messages.map(this.convertFromRapidProMsg);
      this.messages$.next(chatMessages);
    },
    (err) => {
      this.messages$.error(err);
    });
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    return from(this.notificationService.sendRapidproMessage(message.text));
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
