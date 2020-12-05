import { FlowTypes } from "src/app/shared/model/flowTypes";

import { completions } from "src/data/completions";
import { conversation } from "src/data/conversation";
import { goals } from "src/data/goals";
import { reminders } from "src/data/reminders";
import { tasks } from "src/data/tasks";
import { tips } from "src/data/tips";
import { module_list } from "src/data/module_list";
import { module_page } from "src/data/module_page";

export const COMPLETIONS = completions;
export const CONVERSATION = conversation;
export const GOALS = goals;
export const MODULE_LIST = module_list;
export const MODULE_PAGE = module_page;
export const REMINDERS = reminders;
export const TASKS = tasks;
export const TIPS = tips;

/** A simple variable just to type-check/ensure all data types have been exported in this file */
const mapping: { [key in FlowTypes.FlowType]: any } = {
  completions: COMPLETIONS,
  conversation: CONVERSATION,
  goals: GOALS,
  module_list: MODULE_LIST,
  module_page: MODULE_PAGE,
  reminders: REMINDERS,
  tasks: TASKS,
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
