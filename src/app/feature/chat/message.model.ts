export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  dateReceived?: Date;
  responseOptions?: ChatResponseOption[];
}

export type MockChatMessage = { delay: number } & ChatMessage;

export interface ChatResponseOption {
  text: string;
  customAction?: ResponseCustomAction;
}

export type ResponseCustomAction =
  | "bot-leave"
  | "goto-home-screen"
  | "bot-walk-back"
  | "bot-run-back";

export function mockMessageGenerator(callback: (msg: ChatMessage) => void) {
  let mockMessages: MockChatMessage[] = [
    {
      delay: 3000,
      sender: "bot",
      text: "Hello! How can I help you today?",
      responseOptions: [
        { text: "Advice" },
        { text: "Fun Activities" },
        { text: "Other" },
      ],
    },
    {
      delay: 6000,
      sender: "user",
      text: "Advice",
    },
    {
      delay: 9000,
      sender: "bot",
      text: "What would you like advice about?",
      responseOptions: [
        { text: "Young Children" },
        { text: "Teens" },
        { text: "Teens2" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Teens3" },
        { text: "Other" },
      ],
    },
    {
      delay: 12000,
      sender: "user",
      text: "Teens",
    },
    {
      delay: 15000,
      sender: "bot",
      text:
        "Parenting teens can be tough. It can be tough to deal with people caught between being a child and an adult." +
        "Do you need any other help today?",
      responseOptions: [
        { text: "Yes" },
        { text: "No", customAction: "bot-leave" },
      ],
    },
    {
      delay: 18000,
      sender: "user",
      text: "No",
      responseOptions: [{ text: "No", customAction: "bot-leave" }],
    },
    {
      delay: 21000,
      sender: "bot",
      text: "Okay chat to you later!",
      responseOptions: [
        { text: "Need more help", customAction: "bot-run-back" },
        { text: "Go to Home Screen", customAction: "goto-home-screen" },
      ],
    },
    {
      delay: 24000,
      sender: "user",
      text: "Need more help",
      responseOptions: [
        { text: "Need more help", customAction: "bot-run-back" },
      ],
    },
  ];
  mockMessages.forEach((msg) => {
    setTimeout(() => {
      callback(msg);
    }, msg.delay);
  });
  return;
}
