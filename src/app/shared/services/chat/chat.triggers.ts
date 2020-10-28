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
    flowNameToStart: "Emo_check"
});

triggersByPhrase.set(ChatTriggerPhrase.EGG_CHARACTER_START, {
    phrase: ChatTriggerPhrase.EGG_CHARACTER_START,
    flowNameToStart: "Friend_calm"
});


triggersByPhrase.set(ChatTriggerPhrase.WELCOME, {
    phrase: ChatTriggerPhrase.EGG_CHARACTER_START,
    flowNameToStart: "welcome"
});