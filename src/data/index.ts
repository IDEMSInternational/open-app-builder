import Completions from "./Completions";
import Conversation from "./Conversation";
import Goals from "./Goals";
import Reminders from "./Reminders";
import Tasks from "./Tasks";
import Tips from "./Tips";

/**
 * Data files are imported and re-exported here to allow for easier import and
 * rough type-checking. Note it is a slightly messy process as typings have to
 * be made looser when importing and then tightened after
 */

let COMPLETIONS: IFlowMetaImported[] = Completions;
let CONVERSATION: IFlowMetaImported[] = Conversation;
let GOALS: IFlowMetaImported[] = Goals;
let REMINDERS: IFlowMetaImported[] = Reminders;
let TASKS: IFlowMetaImported[] = Tasks;
let TIPS: IFlowMetaImported[] = Tips;

export type IFlowType = "Completions" | "Conversation" | "Goals" | "Reminders" | "Tasks" | "Tips";

interface IFlowMetaImported {
  Flow_Name: string;
  Flow_Type: string;
  /** Used to hide unfinished content from the app */
  status: string;
  /** Specific flow data rows */
  data: any[];
  // additional flowType-specific fields
  Title?: string;
  Module?: string;
  Character?: string;
  Second_Character?: string;
  Entry_Condition?: string;
  Output?: string;
  Comment_Suggestion?: string;
  Topic_Id?: string;
}
// Exported flows contain all the fields of imported flow meta above
// but add additional data type restrictions that can't be applied when importing
export interface IFlowMeta extends IFlowMetaImported {
  Flow_Type: IFlowType;
  /** Used to hide unfinished content from the app */
  status: "draft" | "released" | "preview";
}

export { COMPLETIONS, CONVERSATION, GOALS, REMINDERS, TASKS, TIPS };
