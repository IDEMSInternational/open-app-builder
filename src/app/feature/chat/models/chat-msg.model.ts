import { ChatAction } from "./chat-actions.model";

export interface IRapidProMessage {
  message: string;
  message_id: string;
  title: string;
  type: string;
  wasTapped?: boolean; // informs whether message received in app foreground or background
  quick_replies?: string; // string with JSON array. e.g "["English","Malay"]"
  attachments?: string[];
}

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  dateReceived?: Date;
  actions?: ChatAction[];
  responseOptions?: ChatResponseOption[];
  attachments?: ChatAttachment[];

  showTextInput?: boolean;

  // Configurable by /chat/msg-info
  isStory?: boolean;
  character?: CharacterId;
  choiceMediaDisplay?: boolean;
}

export type CharacterId = "guide" | "neighbour";
export const characterIds = ["guide", "neighbour"];

export const appCustomFields: {
  key: keyof ChatMessage;
  type: "string" | "boolean" | "float" | "integer";
}[] = [
  {
    key: "character",
    type: "string",
  },
  {
    key: "isStory",
    type: "boolean",
  },
  {
    key: "choiceMediaDisplay",
    type: "boolean"
  }
];

export interface ChatAttachment {
  type: "image" | "video" | "audio" | "other";
  url?: string;
}

export interface ChatResponseOption {
  text: string;
  customAction?: ResponseCustomAction;
  imageUrl?: string;
}

export type ResponseCustomAction =
  | "bot-leave"
  | "goto-home-screen"
  | "bot-walk-back"
  | "bot-run-back";
