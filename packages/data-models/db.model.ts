import { FlowTypes } from "./flowTypes";

/** Name of index field included on any table that might be synced to server */
const SYNC_INDEX = "_sync_status"; // tracked as boolean;

/** List of fields to include in index for flow events */
const FLOW_EVENT_INDEX_LIST: (keyof IFlowEvent)[] = [
  "type",
  "name",
  "event",
  "_created",
  "_synced", // legacy
];
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
 */
export const DB_SERVER_MAPPING: IDBServerMapping[] = [
  {
    source: "feedback",
    target: "plh_feedback",
  },
];

type IDBServerMapping = { source: IDBTable; target: string };

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
export const DB_VERSION = 14001;

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
 * @param _synced whether the data has been succesfully synced to the database
 */
export interface IFlowEvent extends IDBMeta {
  type: FlowTypes.FlowType;
  name: string;
  event: string;
  value: any;
}

export interface IDBMeta {
  _created: string;
  _synced: boolean; // legacy
  _sync_status: "ignored" | "pending" | "synced";
}
