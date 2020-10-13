export interface IRapidProMessage {
    message: string;
    message_id: string;
    title: string;
    type: string;
    wasTapped: boolean; // informs whether message received in app foreground or background
    quick_replies?: string; // string with JSON array. e.g "["English","Malay"]"
}

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
    dateReceived?: Date;
    responseOptions?: ChatResponseOption[];
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