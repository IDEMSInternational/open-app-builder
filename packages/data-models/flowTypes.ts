import type { IDataPipeOperation } from "shared/src/models/dataPipe/types";
import type { IAppConfig } from "./appConfig";

/*********************************************************************************************
 *  Base flow types
 ********************************************************************************************/

export namespace FlowTypes {
  export type FlowType =
    | "tour"
    | "template"
    // global data provides data to other modules, without namespacing (all top-level)
    | "global"
    // data_lists are a general catch for any data that will be used throughout the app, but
    // without defined typings (such as habit_list).
    | "data_list"
    // data_pipes are used to modify or generate new data_lists via processing methods
    | "data_pipe";

  // NOTE - most of these types are duplicated in src/data, should eventually refactor to common libs

  /** Core typings that appear in all flows, prior to data row merge */
  export interface FlowTypeBase {
    flow_type: FlowType;
    flow_name: string;
    /** allows further level of grouping within flows */
    flow_subtype?: string;
    /** Used to hide unfinished content from the app */
    status?: "draft" | "released";
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
    /** Datalists populate rows as a hashmap instead to allow easier access to nested structures */
    rowsHashmap?: { [id: string]: any };
    /** Datapipes store output from operations in a temporary field to allow data-list population */
    _processed?: { [output_target: string]: any[] };
  }

  /*********************************************************************************************
   *  Specific flow types
   ********************************************************************************************/
  export interface Data_list extends FlowTypeWithData {
    flow_type: "data_list";
    rows: Data_listRow[];
  }
  export interface DataPipeFlow extends FlowTypeWithData {
    flow_type: "data_pipe";
    rows: IDataPipeOperation[];
    /** Datapipes store output from operations in a temporary field to allow data-list population */
    _processed?: { [output_target: string]: any[] };
  }
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
  /** As not all tasks will launch flows, use actions to specify different ways to handle a task  */
  export type Start_action = "start_new_flow" | "give_award" | "open_app";

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
    condition_type: "field_evaluation" | "db_lookup" | "calc";
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
      calc?: string;
    };
    /** calculated after criteria has been evaluated */
    _satisfied?: boolean;
    /** debug info  */
    _raw?: string;
    _cleaned?: string;
    _parsed?: string[][];
  }
  export interface Lifecycle_Action {
    lifecycle_event: LifecycleEvent;
    id: string;
    priority?: number; // priority order in which to run actions
    condition_list?: string[];
    action_list: TemplateRowAction[];
  }
  export type LifecycleEvent = "app_start"; // scope to add app_open, app_close, app_minimize, app_first_start etc.
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
    | "html"
    | "latex"
    | "animated_slides"
    | "qr_code"
    | "navigation_bar"
    | "task_card"
    | "task_progress_bar"
    | "carousel"
    | "drawer";

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

  type IDynamicPrefix = IAppConfig["DYNAMIC_PREFIXES"][number];

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
    | "sent" // notification sent
    | "info_click";

  export interface TemplateRowAction {
    /** actions have an associated trigger */
    trigger: TemplateRowActionTrigger;
    // TODO - 2021-03-11 - most of list needs reconsideration/implementation
    action_id:
      | "" // TODO document this property for stop propogation
      | "reset_app"
      | "set_field"
      | "toggle_field"
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
      | "start_tour"
      | "trigger_actions"
      | "track_event"
      | "process_template"
      | "google_auth"
      | "task_group_set_highlighted";
    args: any[]; // should be string | boolean, but breaks type-checking for templates;
    params?: any; // additional params also used by args (does not require position argument)
    // TODO - CC 2022-04-29 - ideally args should be included as part of params
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
}
