import { Observable } from "rxjs";
import { ChatMessage } from "./chat-msg.model";

/**
 * Common set of methods used by online and offline chat services
 */
export interface IChatService {
  /** simple online/offline label */
  type: string;

  ready(): Promise<boolean>;

  startFlowByName(flowName: string): any;

  sendMessage(message: ChatMessage): Observable<any>;
}
