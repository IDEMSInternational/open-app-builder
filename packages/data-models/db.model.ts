import { FlowTypes } from "./flowTypes";

/** Name of index field included on any table that might be synced to server */
const SYNC_INDEX = "_sync_status"; // tracked as boolean;

/** List of fields to include in index for flow events */
const FLOW_EVENT_INDEX_LIST: (keyof IFlowEvent)[] = ["type", "name", "event", "_created"];
/** Concatenated list of indexes used in flow_event system for import into DB schema */
const FLOW_EVENT_INDEXES = FLOW_EVENT_INDEX_LIST.join(",");

/**
 * All tables used must be defined with any indices required (other columns freely added)
 * Include auto-increment primary key via `++`
 * https://dexie.org/docs/API-Reference#quick-reference
 *
 * NOTE - tables that use compound queries should have indexes specified (as queries often fail otherwise)
 */
export const DB_TABLES = {
  /** Track template flow events such as completion emit **/
  flow_events: "++id," + FLOW_EVENT_INDEXES,
  /** Long term tracking of changes to user data, such as contact fields */
  data_events: "++id," + FLOW_EVENT_INDEXES,
  /** Scheduled and sent local notifications, including whether the app has had chance to process callbacks */
  local_notifications: "id,_created,_callbacks_processed",
  /** Subset of notifications shared with server (for ease of processings) */
  local_notifications_interaction: `++id,&notification_id,${SYNC_INDEX}`,

  /**********************************************************************************************************
   * 2021-04-06
   * TODO - Resolve tables below and determine which are still relevant, or could be merged into tables above
   **********************************************************************************************************/
  surveys: "++id,surveyId",
  reminders: "++id,type",
  reminder_events: "++id,event_id",
  /** task_actions track content the user has interacted with */
  task_actions: "id,task_id,_created",
  /** session_actions track meta interactions such as start and end of session */
  session_actions: "id,task_id,_created",
  /** track app events such as open */
  app_events: "++id,event_id,_created",
  /** user */
  user_meta: "key,value",
  /** habits */
  habits: "habitId",
  habit_activity_ideas: "++id,flowName",
  habit_occurrence: "++id,habitId,created",
  /** feedback - includes tracking of server synced */
  feedback: `++id,_created,${SYNC_INDEX}`,
};

/**
 * Provide mapping from tables stored in local dexie indexeddb to server postgres tables
 * Data is synced via api endpoints as the app does not have direct DB access
 */
export const DB_SERVER_MAPPING: { [key in IDBTable]?: IDBServerMapping } = {
  feedback: {
    api_endpoint: () => "/app_feedback",
    is_user_record: true,
    user_record_id_field: "id",
  },
  local_notifications_interaction: {
    api_endpoint: () => "/app_notification_interaction",
    is_user_record: true,
    user_record_id_field: "id",
  },
};

/** Metadata required to sync between local records and the server */
export type IDBServerMapping = {
  /** function to evaluate determine api enpoint (in cases where dynamic parameter needs to be applied) */
  api_endpoint: (data?: any) => string;
  /** If syncing a user record to a global table entry will refactor to ensure entry unique on server */
  is_user_record: boolean;
  /** record unique ID field which will be combined with user id to generate globally unique identifier */
  user_record_id_field: string;
};

/**
 * For cases where user record synced to global table, record data is placed in nested folder alongside
 * app_user and app_user_record identifiers.
 * @important - Should be kept in sync with UserCommonDto
 */
export interface IDBServerUserRecord {
  /** Unique ID of user */
  app_user_id: string;
  /** ID of original record in local database */
  app_user_record_id: number;
  /** Name specified from app deployment config */
  app_deployment_name: string;
  /** Current version number of app */
  app_version: string;
  /** Data to sync to server */
  data: any;
}

export type IDBTable = keyof typeof DB_TABLES;
/**
 * For any tables with automatic id assignment the following fields will be populated
 */
export interface IDBDoc {
  id: number;
}

/**
 * All databases must contain an incremented version number, and any migration logic
 * required between versions. Currently using app version number to track when the
 * breaking changes occurred (does not need to be updated every version)
 * e.g. v1.5.3 => 100500300
 * e.g. v0.1.0 => 000001000
 * e.g. v0.10.4 => 000010004
 */
export const DB_VERSION = 14003;

export interface IDBEvent {
  topic: "DB";
  payload: {
    id?: string;
    tableId: keyof typeof DB_TABLES;
    operation: "CREATE" | "UPDATE" | "DELETE";
    data: any;
  };
  eventId?: string;
}

/**
 * Data written to the database from flows will usually retain the following format
 * @param type flow type triggering the event, e.g. 'template'
 * @param name identifier for the source of the event, i.e. the flow_name
 * @param event name given to the event for indexing/query/lookup, e.g. 'emit'
 * @param value (not indexed) - specific value corresponding to the event
 * @param _created timestamp in isostring format generated on write
 */
export interface IFlowEvent extends IDBMeta {
  type: FlowTypes.FlowType;
  name: string;
  event: string;
  value: any;
}

export interface IDBMeta {
  _created: string;
  _sync_status: ISyncStatus;
}
export type ISyncStatus = "ignored" | "pending" | "synced";
