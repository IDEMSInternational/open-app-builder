import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, Subscription } from 'rxjs';
import { ChatMessage } from '../chat-msg.model';
import { ChatTrigger } from '../chat.triggers';
import { Capacitor } from "@capacitor/core";
import { convertFromRapidProMsg } from '../message.converter';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ToolboxService } from 'src/app/shared/services/toolbox/toolbox.service';

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

}
