import { RapidProFlowExport } from "src/app/feature/chat/models";
import Completions from "../../../../data/completions";
import Conversation from "../../../../data/conversation";
import Goals from "../../../../data/goals";
import Reminders from "../../../../data/reminders";
import Tasks from "../../../../data/tasks";
import Tips from "../../../../data/tips";

/**
 * Data files are imported and re-exported here to allow for easier import and
 * rough type-checking. Note it is a slightly messy process as typings have to
 * be made looser when importing and then tightened after
 */

let COMPLETIONS: IFlowMetaImported[] = Completions;
let CONVERSATION: RapidProFlowExport.RootObjectImported[] = Conversation;
let GOALS: IFlowMetaImported[] = Goals;
let REMINDERS: IFlowMetaImported[] = Reminders;
let TASKS: IFlowMetaImported[] = Tasks;
let TIPS: IFlowMetaImported[] = Tips;

export type IFlowType = "completions" | "conversation" | "goals" | "reminders" | "tasks" | "tips";

interface IFlowMetaImported {
  flow_name: string;
  flow_type: string;
  /** Used to hide unfinished content from the app */
  status: string;
  /** Specific flow data rows */
  data: any[];
  module?: string;
  // additional flowType-specific fields
  [key: string]: any;
}
// Exported flows contain all the fields of imported flow meta above
// but add additional data type restrictions that can't be applied when importing
export interface IFlowMeta extends IFlowMetaImported {
  flow_type: IFlowType;
  /** Used to hide unfinished content from the app */
  status: "draft" | "released";
}

export { COMPLETIONS, CONVERSATION, GOALS, REMINDERS, TASKS, TIPS };
