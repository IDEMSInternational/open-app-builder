import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from './chat-msg.model';
import { ChatTrigger } from './chat.triggers';

export abstract class ChatService {

    public abstract init(): Observable<any>;

    public abstract runTrigger(trigger: ChatTrigger): Observable<any>;

    public abstract sendMessage(message: ChatMessage): Observable<any>;

    public abstract messages$: BehaviorSubject<ChatMessage[]>;

}