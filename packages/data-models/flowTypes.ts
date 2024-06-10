/* eslint @typescript-eslint/sort-type-constituents: "warn"  */

import type { IDataPipeOperation } from "shared";
import type { IAppConfig } from "./appConfig";
import { IAssetEntry } from "./deployment.model";

/*********************************************************************************************
 *  Base flow types
 ********************************************************************************************/

export namespace FlowTypes {
  export type FlowType =
    // A manifest/contents file of assets
    | "asset_pack"
    // data_lists are a general catch for any data that will be used throughout the app, but
    // without defined typings (such as habit_list).
    | "data_list"
    // data_pipes are used to modify or generate new data_lists via processing methods
    | "data_pipe"
    // generators can create any other flow type using a source datalist and flow skeleton
    | "generator"
    // global data provides data to other modules, without namespacing (all top-level)
    | "global"
    | "template"
    | "tour";

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
    override_condition?: boolean | string; // dynamic references will be strings, but converted to boolean during evaluation
    /** additional parameters passed to flows */
    parameter_list?: Record<string, any>;
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
    /** Additional flows generated during parsing, such as data pipe or generator flow outputs */
    _generated?: { [flow_type in FlowType]?: { [flow_name: string]: FlowTypeWithData } };
  }

  /*********************************************************************************************
   *  Specific flow types
   ********************************************************************************************/
  export interface AssetPack extends FlowTypeWithData {
    flow_type: "asset_pack";
    rows: Data_listRow<IAssetEntry>[];
  }
  export interface Data_list extends FlowTypeWithData {
    flow_type: "data_list";
    rows: Data_listRow[];
  }
  export interface DataPipeFlow extends FlowTypeWithData {
    flow_type: "data_pipe";
    rows: IDataPipeOperation[];
  }
  export interface GeneratorFlow extends FlowTypeWithData {
    flow_type: "generator";
    parameter_list: {
      input_data_list: string;
      output_flow_name?: string;
      output_flow_subtype?: string;
      output_flow_type?: FlowType;
    };
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
    row_id?: number | string;
    type:
      | "button"
      | "description"
      | "main_image"
      | "step_group"
      | "step_intro"
      | "step_item"
      | "title";

    text?: string;
    task_id?: string;
    media_asset?: string;
    /** Some groups may recursively nest other row objects */
    rows?: Module_pageRow[];
  }
  /** all data_list type must provide a unique id for each row to allow */
  export type Data_listRow<T = any> = T & { id: string };
  /** As not all tasks will launch flows, use actions to specify different ways to handle a task  */
  export type Start_action = "give_award" | "open_app" | "start_new_flow";

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
    condition_type: "calc" | "db_lookup" | "field_evaluation";
    /** Condition args change depending on type, hard to enforce typing switch so just include type mapping */
    condition_args: {
      db_lookup?: {
        // TODO CC 2021-07-09 - refactor to make type available
        table_id: string;
        // NOTE - where queries only support text or number
        // see: https://github.com/dfahlander/Dexie.js/issues/427
        // (non-sparse indexes)
        where: { [field: string]: number | string }; //  e.g. {name:reminder_1.sent, value:'true'} ;
        order?: "asc" | "desc";
        evaluate?: {
          operator: "<=" | ">";
          value: boolean | number | string;
          unit?: "app_day" | "day";
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
    | "accordion_section"
    | "accordion"
    | "advanced_dashed_box"
    | "animated_section_group"
    | "animated_section"
    | "animated_slides"
    | "audio"
    | "button"
    | "carousel"
    | "combo_box"
    | "dashed_box"
    | "data_items"
    | "debug_toggle"
    | "display_grid"
    | "display_group"
    | "display_theme"
    | "drawer"
    | "form"
    | "help_icon"
    | "html"
    | "icon_banner"
    | "image"
    | "items"
    | "latex"
    | "lottie_animation"
    | "nav_group"
    | "nav_section"
    | "navigation_bar"
    | "nested_properties"
    | "number_selector"
    | "odk_form"
    | "parent_point_box"
    | "parent_point_counter"
    | "pdf"
    | "qr_code"
    | "radio_button_grid"
    | "radio_group"
    | "round_button"
    | "select_text"
    | "set_default"
    | "set_field" // TODO - requires global implementation (and possibly rename to set_field_default as value does not override)
    | "set_local"
    | "set_variable"
    | "simple_checkbox"
    | "slider"
    | "square_button"
    | "subtitle"
    | "task_card"
    | "task_progress_bar"
    | "template"
    | "text_area"
    | "text_box"
    | "text"
    | "tile_component"
    | "timer"
    | "title"
    | "toggle_bar"
    | "update_action_list" // update own action list
    | "video"
    | "workshops_accordion";

  export interface TemplateRow extends Row_with_translations {
    type: TemplateRowType;
    name: string;
    value?: any; // TODO - incoming data will be string, so components should handle own parsing
    action_list?: TemplateRowAction[];
    style_list?: string[];
    parameter_list?: { [param: string]: string };
    hidden?: boolean | string; // dynamic references will be strings, but converted to boolean during evaluation
    rows?: TemplateRow[];
    disabled?: boolean | string; // dynamic references will be strings, but converted to boolean during evaluation
    condition?: boolean | string; // dynamic references will be strings, but converted to boolean during evaluation
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
    _evalContext?: { itemContext: TemplateRowItemEvalContext }; // force specific context variables when calculating eval statements (such as loop items)
    __EMPTY?: any; // empty cells (can be removed after pr 679 merged)
  }

  export type IDynamicField = { [key: string]: IDynamicField | TemplateRowDynamicEvaluator[] };

  export interface TemplateRowItemEvalContextMetadata {
    // item metadata
    _id: string;
    _index: number;
    _first: boolean;
    _last: boolean;
  }
  // Enumerable list of metadata columns for use by processing functions
  export const TEMPLATE_ROW_ITEM_METADATA_FIELDS: Array<keyof TemplateRowItemEvalContextMetadata> =
    ["_id", "_index", "_first", "_last"];

  // General interface for row items which can contain any key-value pairs with metadata
  export type TemplateRowItemEvalContext = TemplateRowItemEvalContextMetadata & {
    [key: string]: any;
  };

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
    | "audio_end"
    | "audio_first_start"
    | "audio_pause"
    | "audio_play"
    | "changed"
    | "click"
    | "completed"
    | "info_click"
    | "nav_resume" // return to template after navigation or popup close;
    | "sent" // notification sent
    | "uncompleted";

  // TODO document '' action for stop propagation
  // note - to keep target nav within component stack go_to is actually just a special case of pop_up
  // TODO - 2021-03-11 - most of list needs reconsideration/implementation
  export const ACTION_ID_LIST = [
    "",
    "app_update",
    "asset_pack",
    "audio_end",
    "audio_play",
    "auth",
    "changed",
    "emit",
    "feedback",
    "go_to",
    "go_to_url",
    /**
     * @deprecated since v0.16.27
     * Use `auth: sign_in_google` instead
     * */
    "google_auth",
    "open_external",
    "pop_up",
    "process_template",
    "reset_app",
    "save_to_device",
    "set_field",
    "set_item",
    "set_items",
    "set_local",
    "share",
    "style",
    "start_tour",
    "task",
    "task_group_set_highlighted",
    "toggle_field",
    "track_event",
    "trigger_actions",
    "user",
  ] as const;

  export interface TemplateRowAction {
    /** actions have an associated trigger */
    trigger: TemplateRowActionTrigger;
    action_id: (typeof ACTION_ID_LIST)[number];
    args: any[]; // should be boolean | string, but breaks type-checking for templates;
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
    type: "declare_field_default" | "declare_global_constant";
    name: string;
    value: any;
    comments?: string;
    __EMPTY?: string;
  }
}
