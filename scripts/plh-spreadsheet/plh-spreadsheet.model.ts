import { RapidProFlowExport } from 'src/app/feature/chat/chat-service/offline/rapid-pro-export.model';

export interface ContentIndexRow {
    //Removed these as adapting to the format used by Ohad.
    //Sheet_Name: string,
    //Content_Type: "Conversation" | "Toolbox",
    Flow_Type: "Conversation" | "Toolbox" | "Tips",
    Module?: string,
    Flow_Name: string,
    Character?: "Friend" | "Guide",
    Second_Character?: string,
    Entry_Condition?: string,
    Output?: string,
    Comment_Suggestion?: string,
    Topic_Id?: string
}

export interface ToolboxExcelSheet {
    sheetName: string,
    topicId: string,
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
    Row_ID?: string,
    Type: 'Start_new_flow' | 'Send_message' | 'Story_message' | 'Go_to',
    From?: string,
    Condition?: string,
    Condition_Var?: string,
    Character?: string,
    MessageText: string,
    Media?: string,
    Choose_multi?: boolean,
    Default_Choice?: string,
    Save_name?: string,
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
    Choice_11?: string,
    Choice_12?: string,
    Condition_Type?: RapidProFlowExport.RouterCaseType,
    // This is the UUID of the Node first created for this row, which is used to set how nodes go into this node.
    // This is set once.
    NodeUUIDForExit?: string,
    // This is the node to refer to when this row is mentioned as a from in another row.
    // This is updated e.g. when looping through from nodes.
    _rapidProNode?: RapidProFlowExport.Node
}