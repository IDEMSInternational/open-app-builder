/* eslint-disable @typescript-eslint/naming-convention */
import { RapidProFlowExport } from "src/app/feature/chat/models";
export { RapidProFlowExport } from "src/app/feature/chat/models";
import { TipRow } from "src/app/feature/tips/models/tips.model";
import { IDBTable } from "../services/db/db.service";

/*********************************************************************************************
 *  Base flow types
 ********************************************************************************************/

export namespace FlowTypes {
  export type FlowType =
    | "conversation"
    | "tips"
    | "completion_list"
    | "goal_list"
    | "habit_list"
    | "task_list"
    | "module_list"
    | "module_page"
    | "care_package_list"
    | "tour"
    | "habit_ideas"
    | "template"
    | "component_defaults"
    // global data provides data to other modules, without namespacing (all top-level)
    | "global"
    | "home_page"
    // data_lists are a general catch for any data that will be used throughout the app, but
    // without defined typings (such as habit_list).
    | "data_list";

  // NOTE - most of these types are duplicated in src/data, should eventually refactor to common libs

  /** Core typings that appear in all flows, prior to data row merge */
  export interface FlowTypeBase {
    flow_type: FlowType;
    flow_name: string;
    /** allows further level of grouping within flows */
    flow_subtype?: string;
    /** Used to hide unfinished content from the app */
    status: "draft" | "released";
    /** Events triggered from the flow that would ordinarily write to the db (e.g. emit completed) will be ignored */
    db_ignore_events?: boolean;
    /** By default data will be removed following server-sync. Specify if instead should be retained locally also */
    db_persist_events?: boolean;
    module?: string;
    /** if specified, row data will be made accessible via the `@data` accessor within the provided namespace */
    data_list_name?: string;
    _xlsxPath?: string; // debug info
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
  // 2021-04-07 - TODO - implementing common data lists but need to review what is now deprecated
  // and what other list types also want to be refactored
  export interface Completion_list extends FlowTypeWithData {}
  export interface Goal_list extends FlowTypeWithData {}
  export interface Habit_list extends FlowTypeWithData {
    flow_type: "habit_list";
    rows: Habit_listRow[];
  }
  export interface Task_list extends FlowTypeWithData {
    flow_type: "task_list";
    rows: Task_listRow[];
  }
  export interface Tips extends FlowTypeWithData {
    flow_type: "tips";
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
  export interface Care_package_list extends FlowTypeWithData {
    flow_type: "care_package_list";
    rows: CarePackage[];
  }
  export interface Data_list extends FlowTypeWithData {
    flow_type: "data_list";
    rows: Data_listRow[];
  }

  export interface Conversation extends RapidProFlowExport.RootObject {}

  /*********************************************************************************************
   *  Specific flow row types
   ********************************************************************************************/

  export interface Module_listRow {
    module_number: number;
    id: string;
    /** Main title displayed at top of module page */
    title: string;
    /** Title to show with abridged icon */
    title_short: string;
    description?: string;
    /** Route to navigate to for page (if omitted not yet authored) */
    module_page?: string;
    /** Used in module-select circle */
    icon_asset?: string;
    main_image_asset?: string;
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
    task_id?: string;
    media_asset?: string;
    /** Some groups may recursively nest other row objects */
    rows?: Module_pageRow[];
  }
  /** all data_list type must provide a unique id for each row to allow */
  export type Data_listRow<T = any> = { id: string } & T;
  export interface Habit_listRow extends Data_listRow {
    title: string;
    description: string;
    task_id: string;
    icon_asset: string;
    main_image_asset: string;
    aim_button_text: string;
    aim_action: string;
    set_aim_button_text?: string;
    suggestion_button_text?: string;
    launch_flow_type?: string;
    launch_flow_name?: string;
    suggestion_flow_type?: string;
    suggestion_flow_name?: string;

    _complete?: boolean;
    _count?: number;
    _animating_on_add?: boolean;
    _animate_timeout_ref?: any;
  }
  export interface Task_listRow {
    id: string;
    start_action?: Start_action;
    /** when tasks launch flows specify the type and name of flow. Only specific types are currently handled, as listed here */
    flow_type?: "template" | "conversation" | "tips";
    /** when tasks launch flows specify the type and name of flow */
    flow_name?: string;
    /** when tasks require additional paremeters, such as the name of a reward, provide here */
    start_action_args?: string;
    groups_list?: string[];
    label?: string;
    requires_list?: string[];
  }
  /** As not all tasks will launch flows, use actions to specify different ways to handle a task  */
  export type Start_action = "start_new_flow" | "give_award" | "open_app";

  // To Sort - possibly these typings affect the input and not the output???

  /** Format of conversation rows prior to processing */
  export interface ConversationSheet extends FlowTypeWithData {
    flow_type: "conversation";
    rows: ConversationRow[];
  }
  /** Format of conversation rows post processing */
  export interface ConversationRow {
    row_id?: string | number;
    type:
      | "start_new_flow"
      | "send_message"
      | "story_slide"
      | "go_to"
      | "save_value"
      | "exit"
      | "mark_as_completed"
      | "split_random";
    from?: string | number;
    condition?: string | number;
    condition_var?: string;
    character?: string;
    message_text: string;
    media?: string;
    icon?: string;
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

  export interface CarePackage {
    id: string;
    label: string;
    description?: string;
    icon_asset?: string;
    main_image_asset?: string;
    habit_list: string[];
  }

  export interface Campaign_listRow {
    _id: string;
    activation_condition_list: DataEvaluationCondition[];
    deactivation_condition_list: DataEvaluationCondition[];
    campaign_list: string[]; // ids of campaigns where to run
    priority?: number; // higher numbers will be given more priority
    notification_schedule?: NotificationSchedule;
    _active?: boolean; // calculated from activation and deactivation conditions

    // additional fields for current data_list but not required
    click_action_list?: TemplateRowAction[];
    icon?: string;
    text?: string;

    // placeholder for any extra fields to be added
    [field: string]: any;
  }
  export interface NotificationSchedule {
    text?: string;
    title?: string;
    time?: { minute?: string; hour?: string }; // specified time for notification, e.g. 19:30
    delay?: { days?: string; hours?: string; minutes?: string }; // delay until first notification, e.g. 7 day

    _schedule_at?: Date; // calculated from above info
  }
  export interface DataEvaluationCondition {
    /** specific defined actions that have individual methods to determine completion */
    condition_type: "field_evaluation" | "db_lookup";
    /** Condition args change depending on type, hard to enforce typing switch so just include type mapping */
    condition_args: {
      db_lookup?: {
        table_id: IDBTable;
        filter: { field: string; value: string }; // filter value is misleading, e.g. field:event_id, value:app_launch ;
        order?: "asc" | "desc";
        evaluate?: {
          operator: ">" | "<=";
          value: string | number;
          unit?: "day" | "app_day";
        };
      };
      field_evaluation?: {
        evaluate: string;
      };
    };
    /** calculated after criteria has been evaluated */
    _satisfied?: boolean;
    /** debug info  */
    _raw?: string;
    _cleaned?: string;
    _parsed?: string[][];
  }

  export interface Habit_ideas extends FlowTypeWithData {
    flow_type: "habit_ideas";
    flow_name: string;
    title: string;
    suggestion_list_title: string;
    personal_list_title: string;
    personal_list_title_short: string;
    add_button: string;
    publish_button: string;
    edit_button: string;
    rows: Habit_ideasRow[];
  }

  export interface Habit_ideasRow {
    type: "list_item";
    message_text: string;
  }

  export interface Tour extends FlowTypeBase {
    flow_type: "tour";
    rows: TourStep[];
  }

  export interface TourStep {
    type: "step";
    message_text?: string;
    title?: string;
    template_component_name?: string;
    element?: string;
    route?: string;
    exclude_from_translation?: boolean | string;
  }

  export interface Home_page extends FlowTypeBase {
    flow_type: "home_page";
    rows: Home_pageRow[];
  }

  export interface Home_pageRow {
    type: "button";
    id?: "workshops" | "parent_points" | "parent_center";
    text: string;
    visible?: boolean;
    enabled?: boolean;
    route?: string;
    left_image?: string;
  }

  export interface Template extends FlowTypeBase {
    flow_type: "template";
    rows: TemplateRow[];
    comments?: string;
  }

  export type TemplateRowType =
    | "image"
    | "title"
    | "subtitle"
    | "text"
    | "animated_section"
    | "accordion_section"
    | "advanced_dashed_box"
    | "parent_point_counter"
    | "workshops_accordion"
    | "form"
    | "toggle_bar"
    | "animated_section_group"
    | "display_group"
    | "set_variable"
    | "set_theme"
    | "icon"
    // TODO - requires global implementation (and possibly rename to set_field_default as value does not override)
    | "set_field"
    | "set_global"
    | "set_local"
    | "set_field"
    | "nested_properties"
    | "button"
    | "image"
    | "audio"
    | "video"
    | "display_theme"
    | "template"
    | "timer"
    | "slider"
    | "number_selector"
    | "round_button"
    | "nav_group"
    | "nav_section"
    | "simple_checkbox"
    | "set_default"
    | "text_box"
    | "text_area"
    | "radio_group"
    | "tile_component"
    | "css_anim"
    | "combo_box"
    | "icon_banner"
    | "dashed_box"
    | "lottie_animation"
    | "parent_point_box";

  export interface TemplateRow {
    type: TemplateRowType;
    name: string;
    value?: any; // TODO - incoming data will be string, so components should handle own parsing
    action_list?: TemplateRowAction[];
    style_list?: string[];
    parameter_list?: { [param: string]: string };
    exclude_from_translation?: boolean | string;
    hidden?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    rows?: TemplateRow[];
    disabled?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    condition?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation

    _debug_name?: string; // some components may optionally provide a different name for debugging purposes
    _nested_name: string; // track full path to row when nested in a template (e.g. contentBox1.row2.title)

    /**
     * track fields above where dynamic expressions have been used in field evaluation
     * they will be nested in the same way the template itself is (e.g. parameter_list.paramNam.someVal)
     * */
    _dynamicFields?: IDynamicField;
    /** Keep a list of dynamic dependencies used within a template, by reference (e.g. {@local.var1 : ["text_1"]}) */
    _dynamicDependencies?: { [reference: string]: string[] };
    __EMPTY?: any; // empty cells (can be removed after pr 679 merged)
  }
  type IDynamicField = { [key: string]: TemplateRowDynamicEvaluator[] | IDynamicField };

  /** Data passed back from regex match, e.g. expression @local.someField => type:local, fieldName: someField */
  export interface TemplateRowDynamicEvaluator {
    fullExpression: string;
    matchedExpression: string;
    // TODO CC 2021-05-15 - 'campaign' should be handled as a special case of data in the parser
    // i.e. @data.campaign_list | evaluate_conditions | first (or similar)
    type: "local" | "field" | "fields" | "global" | "data" | "campaign";
    fieldName: string;
  }

  export type TemplateRowActionTrigger =
    | "click"
    | "completed"
    | "uncompleted"
    | "changed"
    | "audio_play"
    | "audio_pause"
    | "audio_end"
    | "audio_first_start";

  export interface TemplateRowAction {
    /** actions have an associated trigger */
    trigger: TemplateRowActionTrigger;
    // TODO - 2021-03-11 - most of list needs reconsideration/implementation
    action_id:
      | "" // TODO document this property for stop propogation
      | "set_field"
      | "set_local"
      | "set_global"
      | "emit"
      | "changed"
      // note - to keep target nav within component stack go_to is actually just a special case of pop_up
      | "go_to"
      | "pop_up"
      | "audio_end"
      | "audio_play"
      | "style"
      | "close_pop_up"
      | "set_theme"
      | "start_tour"
      | "trigger_actions";
    args: any[]; // should be string | boolean, but breaks type-checking for templates;
    /** field populated for tracking the component that triggered the action */
    _triggeredBy?: TemplateRow;
    // debug info
    _raw?: string;
    _cleaned?: string;
  }

  export interface Global extends FlowTypeBase {
    flow_type: "global";
    rows: GlobalRow[];
  }

  export interface GlobalRow {
    type: "declare_global_constant" | "declare_field_default";
    name: string;
    value: any;
    comments?: string;
    __EMPTY?: string;
    exclude_from_translation?: boolean | string;
  }

  /* Used for setting default parameters for template components */
  export interface Component_defaults extends FlowTypeBase {
    flow_type: "component_defaults";
    rows: Component_defaultsRow[];
  }

  export interface Component_defaultsRow {
    parameter: string;
    default_value?: string | number | boolean;
    comments?: string /* Used for authoring comments. Not used in code */;
  }
}
