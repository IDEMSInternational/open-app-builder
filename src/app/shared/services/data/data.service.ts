import { FlowTypes } from "src/app/shared/model/flowTypes";

import { completion_list } from "src/data/completion_list";
import { conversation } from "src/data/conversation";
import { goal_list } from "src/data/goal_list";
import { habit_list } from "src/data/habit_list";
import { reminder_list } from "src/data/reminder_list";
import { task_list } from "src/data/task_list";
import { tips } from "src/data/tips";
import { module_list } from "src/data/module_list";
import { module_page } from "src/data/module_page";

export const COMPLETION_LIST = completion_list;
export const CONVERSATION = conversation;
export const GOAL_LIST = goal_list;
export const HABIT_LIST = habit_list;
export const MODULE_LIST = module_list;
export const MODULE_PAGE = module_page;
export const REMINDER_LIST = reminder_list;
export const TASK_LIST = task_list;
export const TIPS = tips;

/** A simple variable just to type-check/ensure all data types have been exported in this file */
const mapping: { [key in FlowTypes.FlowType]: any } = {
  completion_list: COMPLETION_LIST,
  conversation: CONVERSATION,
  goal_list: GOAL_LIST,
  habit_list: HABIT_LIST,
  module_list: MODULE_LIST,
  module_page: MODULE_PAGE,
  reminder_list: REMINDER_LIST,
  task_list: TASK_LIST,
  tips: TIPS,
};

/**
 * The data service has been through a couple iterations, currently the
 * only purpose it serves is re-exporting data from the data folder,
 * but could be enhanced in the future.
 *
 * It is still preferable to import data from this service as opposed to
 * the data file folder, as we could use the service to also update
 * the data that is exported dynamically
 * (e.g. after loading from server json or alternate locations)
 */
