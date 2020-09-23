import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { ChatMessage } from '../chat-msg.model';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineChatServiceService implements ChatService {

  constructor() { }

  public sendMessage(message: ChatMessage): Observable<any> {
    return throwError("Not implemented yet");
  }
  
  public messages$: Subject<ChatMessage>;
}
