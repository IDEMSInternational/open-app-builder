export type UserSettingId = "CHAT_DELAY" | "USE_MODAL_FOR_CHAT_RESPONSES" | "USE_BUTTON_HOME_SCREEN" | "USE_OFFLINE_CHAT"
    | "SHOW_FLOW_NAME";

export interface UserSetting {
    id: UserSettingId,
    name: string,
    type: "boolean" | "string" | "number",
    value: string,
    options?: UserSettingOption[]
    nativeOnly?: boolean,
    devOnly?: boolean,
    /* Route to go to when button clicked */
}

export interface UserSettingOption {
    name: string,
    value: string
}

export const BASE_USER_SETTINGS: UserSetting[] = [
    {
        id: "CHAT_DELAY",
        name: "Chat Message Delay",
        type: "number",
        value: "1000",
        options: [
            {
                name: "Slow",
                value: "5000"
            },
            {
                name: "Medium",
                value: "3000"
            },
            {
                name: "Fast",
                value: "1000"
            }
        ]
    },
    {
        id: "USE_MODAL_FOR_CHAT_RESPONSES",
        name: "Use Modal For Chat Responses",
        type: "boolean",
        value: "false",
        devOnly: true,
    },
    {
        id: "SHOW_FLOW_NAME",
        name: "Show Flow Name",
        type: "boolean",
        value: "false",
        devOnly: true
    }
    // 2020-11-25 - Online chat disabled here and in settings until tested working
    // {
    //     id: "USE_OFFLINE_CHAT",
    //     name: "Use Offline Chat",
    //     type: "boolean",
    //     value: "true",
    //     nativeOnly: true
    // }
];