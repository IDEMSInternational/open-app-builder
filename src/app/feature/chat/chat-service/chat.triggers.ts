export interface ChatTrigger {
    phrase?: ChatTriggerPhrase;
    flowNameToStart?: string
}

export enum ChatTriggerPhrase {
    GUIDE_START = "guide",
    EGG_CHARACTER_START = "chat",
    WELCOME = "welcome"
}

export const triggersByPhrase: Map<ChatTriggerPhrase, ChatTrigger> = new Map();
triggersByPhrase.set(ChatTriggerPhrase.GUIDE_START, {
    phrase: ChatTriggerPhrase.GUIDE_START,
    flowNameToStart: "PLH App Welcome"
});

triggersByPhrase.set(ChatTriggerPhrase.EGG_CHARACTER_START, {
    phrase: ChatTriggerPhrase.EGG_CHARACTER_START,
    flowNameToStart: "Praise_Intro"
});

triggersByPhrase.set(ChatTriggerPhrase.WELCOME, {
    phrase: ChatTriggerPhrase.EGG_CHARACTER_START,
    flowNameToStart: "welcome"
});