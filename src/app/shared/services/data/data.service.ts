import { RapidProFlowExport } from "src/app/feature/chat/models";
import Completions from "../../../../data/completions";
import Conversation from "../../../../data/conversation";
import Goals from "../../../../data/goals";
import Reminders from "../../../../data/reminders";
import Tasks from "../../../../data/tasks";
import Tips from "../../../../data/tips";
import { FlowTypes } from "../../model/flowTypes";

/**
 * Data files are imported and re-exported here to allow for easier import and
 * rough type-checking. Note it is a slightly messy process as typings have to
 * be made looser when importing and then tightened after
 */

let COMPLETIONS: FlowTypes.FlowTypeWithData[] = Completions;
let CONVERSATION: RapidProFlowExport.RootObject[] = Conversation;
let GOALS: FlowTypes.FlowTypeWithData[] = Goals;
let REMINDERS: FlowTypes.FlowTypeWithData[] = Reminders;
let TASKS: FlowTypes.FlowTypeWithData[] = Tasks;
let TIPS: FlowTypes.FlowTypeWithData[] = Tips;

export { COMPLETIONS, CONVERSATION, GOALS, REMINDERS, TASKS, TIPS };
