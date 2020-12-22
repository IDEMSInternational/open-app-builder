import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface IPCChannel  {
  subject: Subject<any>;
  broadcastChannel?: BroadcastChannel;
}

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private channels: { [channel: string]: IPCChannel } = {};

  private usingBroadcastChannel = false;

  constructor() { }

  /* Broadcast Channel Implementation not working */

  public send(channelName: string, message: any): void {
    this.createChannelIfNeeded(channelName);
    this.channels[channelName].subject.next(message);
    if (window.BroadcastChannel) {
      this.channels[channelName].broadcastChannel.postMessage(JSON.parse(JSON.stringify(message)));
    }
  }

  public listen(channelName: string): Observable<any> {
    this.createChannelIfNeeded(channelName);
    return this.channels[channelName].subject.asObservable();
  }

  private createChannelIfNeeded(channelName: string) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = { 
        subject: new Subject()
      };
      if (window.BroadcastChannel) {
        this.channels[channelName].broadcastChannel = new BroadcastChannel(channelName);
        this.channels[channelName].broadcastChannel.addEventListener("message", (event) => {
          this.channels[channelName].subject.next(event.data);
        });
      }
    }
  }

}
