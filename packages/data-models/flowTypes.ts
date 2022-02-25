/* eslint-disable @typescript-eslint/naming-convention */
import APP_CONSTANTS from "./constants";
import { RapidProFlowExport } from "@idemsInternational/rapidpro-excel";
import { TipRow } from "./tips.model";

const { DYNAMIC_PREFIXES } = APP_CONSTANTS;

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
    comments?: string;
    /** if specified, template will override target template (e.g. A/B testing) */
    override_target?: string;
    /** condition to evaluate for applying override */
    override_condition?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    /** computed list of all other templates with override conditions that targetthis template */
    _overrides?: {
      [templatename: string]: any; // override condition
    };
    _xlsxPath?: string; // debug info
    process_on_start?: number; // priority order to process template variable setters on startup
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
  export interface Translation_strings {
    [sourceText: string]: string;
  }

  /*********************************************************************************************
   *  Specific flow row types
   ********************************************************************************************/

  export interface Row_with_translations {
    exclude_from_translation?: boolean | string;
    _translations?: {
      [field: string]: {
        [langCode: string]: boolean;
      };
    };
  }

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

  export interface CarePackage {
    id: string;
    label: string;
    description?: string;
    icon_asset?: string;
    main_image_asset?: string;
    habit_list: string[];
  }

  export interface Campaign_listRow extends RowWithActivationConditions {
    id: string;
    campaign_list: string[]; // ids of campaigns where to run
    priority?: number; // higher numbers will be given more priority
    // additional fields for current data_list but not required
    action_list?: TemplateRowAction[];
    icon?: string;
    text?: string;
    // placeholder for any extra fields to be added
    [field: string]: any;
  }
  export interface Campaign_Schedule extends RowWithActivationConditions {
    id: string;
    /** specified time for notification, e.g. 19:30 */
    time?: { minute: number; hour: number };
    /** delay until first notification, e.g. 7 day */
    delay?: { days?: string; hours?: string; minutes?: string };
    schedule?: {
      /** fixed dates for start of schedule */
      start_date?: string;
      /** fixed dates for end of schedule */
      end_date?: string;
      /** weekday number to schedule from (1-Monday, 7-Sunday etc.) */
      day_of_week?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      /** maximum of notifications to schedule at a given time for the campaign*/
      batch_size?: number;
    };
    /** computed list of campaign rows merged into campaign */
    _campaign_rows?: Campaign_listRow[];
    /** computed date for next notification as required by scheduling service */
    _schedule_at?: Date;
  }
  export interface DataEvaluationCondition {
    /** specific defined actions that have individual methods to determine completion */
    condition_type: "field_evaluation" | "db_lookup";
    /** Condition args change depending on type, hard to enforce typing switch so just include type mapping */
    condition_args: {
      db_lookup?: {
        // TODO CC 2021-07-09 - refactor to make type available
        table_id: string;
        // NOTE - where queries only support text or number
        // see: https://github.com/dfahlander/Dexie.js/issues/427
        // (non-sparse indexes)
        where: { [field: string]: string | number }; //  e.g. {name:reminder_1.sent, value:'true'} ;
        order?: "asc" | "desc";
        evaluate?: {
          operator: ">" | "<=";
          value: string | number | boolean;
          unit?: "day" | "app_day";
        };
      };
      field_evaluation?: {
        field: string;
        value: string;
      };
    };
    /** calculated after criteria has been evaluated */
    _satisfied?: boolean;
    /** debug info  */
    _raw?: string;
    _cleaned?: string;
    _parsed?: string[][];
  }
  export interface RowWithActivationConditions {
    /** evaluated statements for activating campaign */
    activation_condition_list?: DataEvaluationCondition[];
    /** evaluated statements for deactivating campaign */
    deactivation_condition_list?: DataEvaluationCondition[];
    /** all activation criteria satisfied (stored for debugging)*/
    _activated?: boolean; //
    /** any deactivation criteria satisfied (stored for debugging)*/
    _deactivated?: boolean;
    /** all activation criteria satisfied and not any deactivation criteria satisfied */
    _active?: boolean;
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

  export interface TourStep extends Row_with_translations {
    type: "step";
    message_text?: string;
    message_template?: string;
    title?: string;
    template_component_name?: string;
    element?: string;
    route?: string;
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
    | "accordion"
    | "image"
    | "title"
    | "subtitle"
    | "text"
    | "animated_section"
    | "accordion_section"
    | "advanced_dashed_box"
    | "parent_point_counter"
    | "help_icon"
    | "workshops_accordion"
    | "form"
    | "toggle_bar"
    | "animated_section_group"
    | "display_group"
    | "set_variable"
    | "set_theme"
    // TODO - requires global implementation (and possibly rename to set_field_default as value does not override)
    | "set_field"
    | "set_local"
    | "set_field"
    | "update_action_list" // update own action list
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
    | "square_button"
    | "nav_group"
    | "nav_section"
    | "simple_checkbox"
    | "set_default"
    | "text_box"
    | "text_area"
    | "radio_group"
    | "tile_component"
    | "combo_box"
    | "icon_banner"
    | "dashed_box"
    | "lottie_animation"
    | "parent_point_box"
    | "debug_toggle"
    | "items"
    | "select_text"
    | "html";

  export interface TemplateRow extends Row_with_translations {
    type: TemplateRowType;
    name: string;
    value?: any; // TODO - incoming data will be string, so components should handle own parsing
    action_list?: TemplateRowAction[];
    style_list?: string[];
    parameter_list?: { [param: string]: string };
    hidden?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    rows?: TemplateRow[];
    disabled?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    condition?: string | boolean; // dynamic references will be strings, but converted to boolean during evaluation
    is_override_target?: boolean; // prevent template being overridden when calling self via override_target (prevent infinite loops)
    _debug_name?: string; // some components may optionally provide a different name for debugging purposes
    _nested_name: string; // track full path to row when nested in a template (e.g. contentBox1.row2.title)

    /**
     * track fields above where dynamic expressions have been used in field evaluation
     * they will be nested in the same way the template itself is (e.g. parameter_list.paramNam.someVal)
     * */
    _dynamicFields?: IDynamicField;
    /** Keep a list of dynamic dependencies used within a template, by reference (e.g. {@local.var1 : ["text_1"]}) */
    _dynamicDependencies?: { [reference: string]: string[] };
    _translatedFields?: { [field: string]: any };
    _evalContext?: { itemContext: any }; // force specific context variables when calculating eval statements (such as loop items)
    __EMPTY?: any; // empty cells (can be removed after pr 679 merged)
  }
  export type IDynamicField = { [key: string]: TemplateRowDynamicEvaluator[] | IDynamicField };

  type IDynamicPrefix = typeof DYNAMIC_PREFIXES[number];

  /** Data passed back from regex match, e.g. expression @local.someField => type:local, fieldName: someField */
  export interface TemplateRowDynamicEvaluator {
    fullExpression: string;
    matchedExpression: string;
    // TODO CC 2021-05-15 - 'campaign' should be handled as a special case of data in the parser
    // i.e. @data.campaign_list | evaluate_conditions | first (or similar)
    type: IDynamicPrefix;
    fieldName: string;
    // computed properties
    parsedValue?: any;
    parsedExpression?: string;
  }

  export type TemplateRowActionTrigger =
    | "click"
    | "completed"
    | "uncompleted"
    | "changed"
    | "audio_play"
    | "audio_pause"
    | "audio_end"
    | "audio_first_start"
    | "nav_resume" // return to template after navigation or popup close;
    | "sent"; // notification sent

  export interface TemplateRowAction {
    /** actions have an associated trigger */
    trigger: TemplateRowActionTrigger;
    // TODO - 2021-03-11 - most of list needs reconsideration/implementation
    action_id:
      | "" // TODO document this property for stop propogation
      | "reset_app"
      | "set_field"
      | "set_local"
      | "emit"
      | "feedback"
      | "changed"
      // note - to keep target nav within component stack go_to is actually just a special case of pop_up
      | "go_to"
      | "go_to_url"
      | "pop_up"
      | "audio_end"
      | "audio_play"
      | "style"
      | "close_pop_up"
      | "set_theme"
      | "start_tour"
      | "trigger_actions"
      | "track_event"
      | "process_template";
    args: any[]; // should be string | boolean, but breaks type-checking for templates;
    _triggeredBy?: TemplateRow; // tracking the component that triggered the action for logging;
    /**
     * most actions are specified from a parent template (begin_template statement) and are executed
     * within parent context. However actions specified by own update_action_list statement require self handling
     */
    _self_triggered?: boolean;
    // debug info
    _raw?: string;
    _cleaned?: string;
  }

  export interface Global extends FlowTypeBase {
    flow_type: "global";
    rows: GlobalRow[];
  }

  export interface GlobalRow extends Row_with_translations {
    type: "declare_global_constant" | "declare_field_default";
    name: string;
    value: any;
    comments?: string;
    __EMPTY?: string;
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
