import { RapidProFlowExport } from 'src/app/feature/chat/services/offline/rapid-pro-export.model';

export interface ContentIndexRow {
    //Removed these as adapting to the format used by Ohad.
    //Sheet_Name: string,
    //Content_Type: "Conversation" | "Toolbox",
    flow_type: "conversation" | "toolbox" | "tips",
    module?: string,
    flow_name: string,
    character?: string,
    second_character?: string,
    entry_condition?: string,
    output?: string,
    comment?: string,
    topic_id?: string,
    status?: "released" | "draft"
}

export interface ToolboxExcelSheet {
    sheet_name: string,
    topic_id: string,
    rows: ToolboxExcelRow[]
}

export interface ToolboxExcelRow {
    type: 'title' | 'text' | 'core_tip' | 'list_intro' | 'list_item' | 'end_list'
    message_text: string,
    media?: string
}

export interface ConversationExcelSheet {
    sheet_name: string;
    rows: ConversationExcelRow[];
}

export interface ConversationExcelRow {
    row_id?: string,
    type: 'start_new_flow' | 'send_message' | 'story_message' | 'go_to' | 'save_value' | 'exit',
    from?: string,
    condition?: string,
    condition_var?: string,
    character?: string,
    message_text: string,
    media?: string,
    choose_multi?: boolean,
    display_as_tick?: boolean,
    ticked_by_default?: boolean,
    default_choice?: string,
    save_name?: string,
    choice_media_display?: "both" | "media" | "text",
    choice_1?: string,
    choice_1_media?: string,
    choice_2?: string,
    choice_2_media?: string,
    choice_3?: string,
    choice_3_media?: string,
    choice_4?: string,
    choice_4_media?: string,
    choice_5?: string,
    choice_5_media?: string,
    choice_6?: string,
    choice_6_media?: string,
    choice_7?: string,
    choice_7_media?: string,
    choice_8?: string,
    choice_8_media?: string,
    choice_9?: string,
    choice_9_media?: string,
    choice_10?: string,
    choice_10_media?: string,
    choice_11?: string,
    choice_11_media?: string,
    choice_12?: string,
    choice_12_media?: string,
    condition_type?: RapidProFlowExport.RouterCaseType,
    // This is the UUID of the Node first created for this row, which is used to set how nodes go into this node.
    // This is set once.
    NodeUUIDForExit?: string,
    // This is the node to refer to when this row is mentioned as a from in another row.
    // This is updated e.g. when looping through from nodes.
    _rapidProNode?: RapidProFlowExport.Node
}