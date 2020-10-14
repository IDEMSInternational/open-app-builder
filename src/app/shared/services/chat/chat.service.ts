import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from './chat-msg.model';

export abstract class ChatService {

    public abstract sendMessage(message: ChatMessage): Observable<any>;

    public abstract messages$: BehaviorSubject<ChatMessage[]>;

}