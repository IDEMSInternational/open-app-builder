import Completions from './Completions';
import Conversation from './Conversation';
import Goals from './Goals';
import Reminders from './Reminders';
import Song from './Song';
import Tasks from './Tasks';
import Tips from './Tips';

/**
 * Data files are imported and re-exported here to allow for easier import and
 * rough type-checking
 */
const COMPLETIONS: IFlowMeta[] = Completions;
const CONVERSATION: IFlowMeta[] = Conversation;
const GOALS: IFlowMeta[] = Goals;
const REMINDERS: IFlowMeta[] = Reminders;
const SONG: IFlowMeta[] = Song;
const TASKS: IFlowMeta[] = Tasks;
const TIPS: IFlowMeta[] = Tips;

export type IFlowType = 'Completions' | 'Conversation' | 'Goals' | 'Reminders' | 'Song' | 'Tasks' | "Tips"

export interface IFlowMeta {
  Flow_Name: string;
  Flow_Type: string,
  /** Specific flow data rows */
  data: any[];
  // additional flowType-specific fields
  Module?: string,
  Character?: string,
  Second_Character?: string,
  Entry_Condition?: string,
  Output?: string,
  Comment_Suggestion?: string,
  Topic_Id?: string
}

// Note - keep case and naming sensitivity so types can be inferred
export {COMPLETIONS, CONVERSATION, GOALS, REMINDERS, SONG, TASKS, TIPS}
