import { BehaviorSubject, Observable } from "rxjs";
import { ChatMessage } from "./chat-msg.model";

/**
 * Common set of methods used by online and offline chat services
 */
export interface IChatService {
  /** simple online/offline label */
  type: string;

  /** Main stream of chat messages */
  messages$: BehaviorSubject<ChatMessage[]>;

  /** promise that resolves once all initialisation logic has been completed */
  ready(): Promise<boolean>;

  startFlowByName(flowName: string): void;

  sendMessage(message: ChatMessage): Observable<any>;
}
