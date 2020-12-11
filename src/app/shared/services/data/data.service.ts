import { Injectable } from "@angular/core";
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
const mapping: { [key in FlowTypes.FlowType] } = {
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
 * main purpose is to re-export data from the data folder, but also has
 * a more general lookup which is used by task actions
 */

@Injectable({ providedIn: "root" })
export class PLHDataService {
  private allFlowsByName: { [flow_name: string]: any };
  constructor() {
    this.allFlowsByName = this.listAllFlowsByName();
  }

  getFlowByName<T>(flow_name: string) {
    return this.allFlowsByName[flow_name] as T;
  }

  /** Simple function to create a hashmap of all flows by name */
  private listAllFlowsByName() {
    const flowsByName: { [flow_name: string]: any } = {};
    // Handle default flows
    const flowTypes = Object.values(mapping) as FlowTypes.FlowTypeBase[][];
    console.log("mapping flowTypes", flowTypes);
    flowTypes.forEach((flows) => {
      flows.forEach((flow) => {
        if (flow.flow_name) {
          flowsByName[flow.flow_name] = flow;
        }
      });
    });
    // Handle conversation flows
    CONVERSATION.forEach((c) => {
      c.flows.forEach((flow) => {
        const flow_name = flow.name;
        flowsByName[flow_name] = flow;
      });
    });

    return flowsByName;
  }
}
