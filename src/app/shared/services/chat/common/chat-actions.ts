export enum ChatActionType {
    UNLOCK_TOOLBOX_TOPIC = "UNLOCK_TOOLBOX_TOPIC",
    NAVIGATE = "NAVIGATE"
}

export interface ChatAction {
    type: ChatActionType;
    params: { [key: string ]: string };
    executed: boolean;
}