export enum ChatActionType {
    UNLOCK_TOOLBOX_TOPIC = "UNLOCK_TOOLBOX_TOPIC",
    NAVIGATE = "NAVIGATE",
    FINISH_WELCOME = "FINISH_WELCOME",
    CREATE_REMINDER = "CREATE_REMINDER"
}

export interface ChatAction {
    type: ChatActionType;
    params: { [key: string ]: string };
    executed: boolean;
}