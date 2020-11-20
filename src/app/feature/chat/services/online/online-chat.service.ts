import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from, of, Subscription, Subject } from "rxjs";
import { ChatMessage, IChatService } from "../../models";
import { Capacitor } from "@capacitor/core";
import { NotificationService } from "src/app/shared/services/notification/notification.service";
import { takeWhile } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OnlineChatService implements IChatService {
  type = "online";
  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);
  subscription: Subscription;

  private ready$ = new BehaviorSubject<boolean>(false);

  constructor(private notificationService: NotificationService) {
    this.init();
  }

  /** Provide a promise that can be used to notify components when initialisation has been completed */
  async ready() {
    return this.ready$.pipe(takeWhile((isReady) => isReady === false)).toPromise();
  }

  private async init() {
    if (Capacitor.isNative) {
      await this.notificationService.init();
      this.ready$.next(true);
    }
  }

  public startFlowByName(flowName: string) {
    // TODO
  }

  // public runTrigger(trigger: ChatTrigger): Observable<BehaviorSubject<ChatMessage[]>> {
  //   this.messages$.complete();
  //   this.messages$ = new BehaviorSubject([]);
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  //   this.subscription = this.notificationService.messages$.subscribe(
  //     (rpMsg) => {
  //       convertFromRapidProMsg(rpMsg).then((chatMessage) => {
  //         this.messages$.next(this.messages$.getValue().concat([chatMessage]));
  //       });
  //     },
  //     (err) => {
  //       this.messages$.error(err);
  //     }
  //   );
  //   return from(
  //     this.notificationService.sendRapidproMessage(trigger.phrase).then(() => {
  //       return this.messages$;
  //     })
  //   );
  // }

  public sendMessage(message: ChatMessage): Observable<any> {
    return from(this.notificationService.sendRapidproMessage(message.text));
  }
}
