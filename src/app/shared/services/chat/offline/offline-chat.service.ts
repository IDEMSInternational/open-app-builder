import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { ChatMessage } from '../chat-msg.model';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineChatService implements ChatService {

  constructor() { }

  public sendMessage(message: ChatMessage): Observable<any> {
    return throwError("Not yet implemented!");
  }
  public messages$: Subject<ChatMessage>;
}
