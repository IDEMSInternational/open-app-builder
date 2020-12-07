/* tslint:disable:class-name */
import { RapidProFlowExport } from "src/app/feature/chat/models";
export { RapidProFlowExport } from "src/app/feature/chat/models";
import { TipRow } from "src/app/feature/toolbox/models/toolbox.model";

/*********************************************************************************************
 *  Base flow types
 ********************************************************************************************/

export namespace FlowTypes {
  export type FlowType =
    | "completions"
    | "conversation"
    | "goals"
    | "reminders"
    | "tasks"
    | "tips"
    | "module_list"
    | "module_page";

  // NOTE - most of these types are duplicated in src/data, should eventually refactor to common libs

  /** Core typings that appear in all flows, prior to data row merge */
  export interface FlowTypeBase {
    flow_type: FlowType;
    flow_name: string;
    /** Used to hide unfinished content from the app */
    status: "draft" | "released";
    module?: string;
  }

  /**
   * Content flows are the merged data from content list
   * and data corresponding to spreadsheet rows
   */
  export interface FlowTypeWithData extends FlowTypeBase {
    /** Specific flow data rows - these are usually defined from within specific flow type row typings */
    rows: any[];
  }

  /*********************************************************************************************
   *  Specific flow types
   ********************************************************************************************/
  export interface Completions extends FlowTypeWithData {}
  export interface Completions extends FlowTypeWithData {}
  export interface Goals extends FlowTypeWithData {}
  export interface Reminders extends FlowTypeWithData {}
  export interface Tasks extends FlowTypeWithData {}
  export interface Tips extends FlowTypeWithData {
    title: string;
    rows: TipRow[];
  }
  export interface Module_list extends FlowTypeWithData {
    flow_type: "module_list";
    rows: Module_listRow[];
  }
  export interface Module_page extends FlowTypeWithData {
    flow_type: "module_page";
    rows: Module_pageRow[];
  }

  export interface Conversation extends RapidProFlowExport.RootObject {}

  /*********************************************************************************************
   *  Specific flow row types
   ********************************************************************************************/

  export interface Module_listRow {
    module_number: number;
    id: string;
    title: string;
    description: string;
    module_page: string;
    icon?: string;
    main_image?: string;
  }
  export interface Module_pageRow {
    row_id?: string | number;
    type:
      | "main_image"
      | "title"
      | "button"
      | "description"
      | "step_group"
      | "step_intro"
      | "step_item";
    text?: string;
    media?: string;
    task_id?: string;
    /** Some groups may recursively nest other row objects */
    rows?: Module_pageRow[];
  }

  // To Sort - possibly these typings affect the input and not the output???

  /** Format of conversation rows prior to processing */
  export interface ConversationSheet extends FlowTypeWithData {
    flow_type: "conversation";
    rows: ConversationRow[];
  }
  /** Format of conversation rows post processing */
  export interface ConversationRow {
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
}
