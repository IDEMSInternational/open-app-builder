import { RapidProFlowExport } from 'src/app/shared/services/chat/offline/rapid-pro-export.model';

export interface ContentIndexRow {
    Sheet_Name: string,
    Content_Type: "Conversation" | "Toolbox",
    Character?: "Friend" | "Guide",
    Entry_Condition?: string
}

export interface ToolboxExcelSheet {
    sheetName: string,
    rows: ToolboxExcelRow[]
}

export interface ToolboxExcelRow {
    Type: 'Title' | 'Text' | 'Core_tip' | 'List_intro' | 'List_item' | 'End_list'
    MessageText: string,
    Media?: string
}

export interface ConversationExcelSheet {
    sheetName: string;
    rows: ConversationExcelRow[];
}

export interface ConversationExcelRow {
    Type: 'Start_new_flow' | 'Send_message',
    From?: number | string,
    Condition?: string,
    Condition_Var?: string,
    MessageText: string,
    Media?: string,
    Default_Choice?: string,
    Choice_1?: string,
    Choice_2?: string,
    Choice_3?: string,
    Choice_4?: string,
    Choice_5?: string,
    Choice_6?: string,
    Choice_7?: string,
    Choice_8?: string,
    Choice_9?: string,
    Choice_10?: string,
    NodeUUID?: string,
    _rapidProNode?: RapidProFlowExport.Node
}