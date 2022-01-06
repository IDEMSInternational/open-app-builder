export namespace RapidProFlowExport {
  export type ActionType = "enter_flow" | "send_msg" | "set_contact_field" | "set_contact_name";

  export interface Action {
    type: ActionType;
    uuid: string;
    quick_replies?: string[];
    text?: string;
    groups?: Group[];
    body?: string;
    headers?: Headers;
    method?: string;
    result_name?: string;
    url?: string;
    addresses?: string[];
    subject?: string;
    attachments?: string[];
    field?: { key?: string; name?: string };
    value?: string;
    // This used to go to another flow. Rapid Pro uses flow unique id (uuid) to pick which flow to go to
    // The IDEMS version uses name which we assume to be unique
    flow?: { uuid?: string; name: string };
    name?: string;
  }

  export interface Exit {
    destination_uuid: string;
    uuid: string;
  }

  export type RouterCaseType =
    | "has_any_word"
    | "has_all_words"
    | "has_only_phrase"
    | "has_phrase"
    | "has_number_between"
    | "has_number_lt"
    | "has_number_gt"
    | "has_only_text";

  export interface RouterCase {
    arguments: string[];
    category_uuid: string;
    type: RouterCaseType;
    uuid: string;
  }

  export interface Wait {
    type: "msg";
    timeout?: {
      category_uuid?: string;
      seconds?: string;
    };
  }

  export interface Router {
    cases: RouterCase[];
    categories: Category[];
    default_category_uuid?: string;
    operand?: string;
    result_name?: string;
    type: "switch" | string;
    wait?: Wait;
  }

  export interface Localization {}

  export interface Metadata {
    revision: number;
  }

  export interface Group {
    uuid: string;
    name: string;
    query?: any;
  }

  export interface Headers {
    "Content-Type": string;
  }

  export interface Category {
    exit_uuid: string;
    name: string;
    uuid: string;
  }

  export interface Node {
    actions: Action[];
    exits: Exit[];
    uuid: string;
    router?: Router;
    row_number?: number;
  }

  export interface Flow {
    name: string;
    uuid: string;
    spec_version: string;
    language: string;
    type: string;
    nodes: Node[];
    _ui: Ui;
    revision: number;
    expire_after_minutes: number;
    metadata: Metadata;
    localization: Localization;
  }

  export interface Position {
    left: number;
    top: number;
  }

  export interface Cases {}

  export interface Config {
    cases: Cases;
  }

  export interface UINodeData {
    type: string;
    position: Position;
    config?: Config;
  }

  export interface Stickies {}

  export interface Ui {
    nodes: { [nodeId: string]: UINodeData };
    stickies?: Stickies;
  }

  export interface RootObject {
    version: string;
    site: string;
    flows: Flow[];
    campaigns: any[];
    triggers: any[];
    fields: any[];
    groups: Group[];
  }
}
