import { RapidProFlowExport } from "../../../../../src/app/feature/chat/models";
export { RapidProFlowExport };

export interface ContentIndexRow {
  flow_type: "conversation";
  module?: string;
  flow_name: string;
  character?: "friend" | "guide";
  second_character?: string;
  entry_condition?: string;
  output?: string;
  comment_suggestion?: string;
  topic_id?: string;
  status?: "released" | "draft";
}

export interface ConversationExcelSheet {
  sheet_name: string;
  rows: ConversationExcelRow[];
}

export interface ConversationExcelRow {
  row_id?: string | number;
  type: "start_new_flow" | "send_message" | "story_message" | "go_to" | "save_value" | "exit";
  from?: string | number;
  condition?: string | number;
  condition_var?: string;
  character?: string;
  message_text: string;
  media?: string;
  choose_multi?: boolean;
  display_as_tick?: boolean;
  ticked_by_default?: boolean;
  default_choice?: string;
  save_name?: string;
  choice_media_display?: "both" | "media" | "text";
  choice_1?: string;
  choice_1_Media?: string;
  choice_2?: string;
  choice_2_Media?: string;
  choice_3?: string;
  choice_3_Media?: string;
  choice_4?: string;
  choice_4_Media?: string;
  choice_5?: string;
  choice_5_Media?: string;
  choice_6?: string;
  choice_6_Media?: string;
  choice_7?: string;
  choice_7_Media?: string;
  choice_8?: string;
  choice_8_Media?: string;
  choice_9?: string;
  choice_9_Media?: string;
  choice_10?: string;
  choice_10_Media?: string;
  choice_11?: string;
  choice_11_Media?: string;
  choice_12?: string;
  choice_12_Media?: string;
  condition_type?: RapidProFlowExport.RouterCaseType;
  // This is the UUID of the Node first created for this row, which is used to set how nodes go into this node.
  // This is set once.
  nodeUUIDForExit?: string;
  // This is the node to refer to when this row is mentioned as a from in another row.
  // This is updated e.g. when looping through from nodes.
  _rapidProNode?: RapidProFlowExport.Node;
}
