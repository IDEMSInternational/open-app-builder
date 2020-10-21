export interface ChatTrigger {
    phrase?: ChatTriggerPhrase;
    flowNameToStart?: string
}

export enum ChatTriggerPhrase {
    GUIDE_START = "guide",
    EGG_CHARACTER_START = "chat"
}

export const triggersByPhrase: Map<ChatTriggerPhrase, ChatTrigger> = new Map();
triggersByPhrase.set(ChatTriggerPhrase.GUIDE_START, {
    phrase: ChatTriggerPhrase.GUIDE_START,
    flowNameToStart: "welcome"
});