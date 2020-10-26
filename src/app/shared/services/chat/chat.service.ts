import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, forkJoin, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from './chat-msg.model';
import { ChatTrigger } from './chat.triggers';
import { OfflineChatService } from './offline/offline-chat.service';
import { OnlineChatService } from './online/online-chat.service';

@Injectable({
    providedIn: "root"
})
export class ChatService {

    private offline = true;
    private offlineInitialized = false;
    private onlineInitialized = false;

    constructor(private offlineChatService: OfflineChatService, private onlineChatService: OnlineChatService) {

    }

    /* Used to setup and to switch between online and offline chat */
    public init(offline = true): Observable<any> {
        this.offline = offline;
        if (offline) {
            if (this.offlineInitialized) {
                return of({});
            } else {
                return this.offlineChatService.init().pipe(map(() => {
                    this.offlineInitialized = true;
                    return {};
                }));
            }
        } else {
            if (this.onlineInitialized) {
                return of({});
            } else {
                return from(this.onlineChatService.init()).pipe(map(() => {
                    this.onlineInitialized = true;
                    return;
                }));
            }
        }
    }

    public runTrigger(trigger: ChatTrigger): Observable<BehaviorSubject<ChatMessage[]>> {
        if (this.offline) {
            return this.offlineChatService.runTrigger(trigger)
        } else {
            return this.onlineChatService.runTrigger(trigger);
        }
    }

    public sendMessage(message: ChatMessage): Observable<any> {
        if (this.offline) {
            return this.offlineChatService.sendMessage(message)
        } else {
            return this.onlineChatService.sendMessage(message);
        }
    }

    public isUsingOffline(): boolean {
        return this.offline;
    }

    

}