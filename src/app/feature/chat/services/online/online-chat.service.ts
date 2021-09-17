import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from as observableFrom, Subscription } from "rxjs";
import { ChatMessage, IChatService } from "../../models";
import { Capacitor } from "@capacitor/core";
import { PushNotificationService } from "src/app/shared/services/notification/push-notification.service";
import { takeWhile } from "rxjs/operators";
import { convertFromRapidProMsg } from "../../utils/message.converter";
import { RapidproNotificationService } from "src/app/shared/services/notification/rapidpro-notification.service";

@Injectable({
  providedIn: "root",
})
export class OnlineChatService implements IChatService {
  type: "online" = "online";
  public messages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);
  subscription: Subscription;

  private ready$ = new BehaviorSubject<boolean>(false);

  constructor(
    private rapidproNotificationService: RapidproNotificationService,
    private pushNotificationService: PushNotificationService
  ) {
    this.init();
  }

  /** Provide a promise that can be used to notify components when initialisation has been completed */
  async ready() {
    return this.ready$.pipe(takeWhile((isReady) => isReady === false)).toPromise();
  }

  private async init() {
    if (Capacitor.isNative) {
      await this.rapidproNotificationService.init();
      this.ready$.next(true);
    }
  }

  public async startFlowByName(flowName: string) {
    this.messages$.complete();
    this.messages$ = new BehaviorSubject([]);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // TODO - filter out only rapidpro push notifications (in case other notifications added since first implementation)
    // TODO - refactor to only rely on rapidpro notifications service (not generic push)
    this.subscription = this.pushNotificationService.messages$.subscribe(
      (rpMsg) => {
        convertFromRapidProMsg(rpMsg).then((chatMessage) => {
          this.messages$.next(this.messages$.getValue().concat([chatMessage]));
        });
      },
      (err) => {
        this.messages$.error(err);
      }
    );
    // TODO - can we send generic start message or do we need to manually track trigger phrases
    // (as had been done previously)
    await this.rapidproNotificationService.sendRapidproMessage(flowName);
    return this.messages$;
  }

  public sendMessage(message: ChatMessage): Observable<any> {
    return observableFrom(this.rapidproNotificationService.sendRapidproMessage(message.text));
  }
}
