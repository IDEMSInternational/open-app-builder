export interface IRapidProMessage {
    message: string;
    message_id: string;
    title: string;
    type: string;
    wasTapped: boolean; // informs whether message received in app foreground or background
    quick_replies?: string; // string with JSON array. e.g "["English","Malay"]"
    attachments?: string[];
}

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
    dateReceived?: Date;
    responseOptions?: ChatResponseOption[];
    attachments?: ChatAttachment[];
}

export interface ChatAttachment {
    type: "image" | "video" | "audio" | "other",
    url?: string,
}

export interface ChatResponseOption {
    text: string;
    customAction?: ResponseCustomAction;
  }
  
  export type ResponseCustomAction =
    | "bot-leave"
    | "goto-home-screen"
    | "bot-walk-back"
    | "bot-run-back";