import { Injectable } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

import { completion_list } from "src/data/completion_list";
import { conversation } from "src/data/conversation";
import { goal_list } from "src/data/goal_list";
import { habit_list } from "src/data/habit_list";
import { task_list } from "src/data/task_list";
import { tips } from "src/data/tips";
import { module_list } from "src/data/module_list";
import { module_page } from "src/data/module_page";
import { care_package_list } from "src/data/care_package_list";
import { habit_ideas } from "src/data/habit_ideas";
import { tour } from "src/data/tour";
import { home_page } from "src/data/home_page";
import { reminder_list } from "src/data/reminder_list";
import { template } from "src/data/template";
import { component_defaults } from "src/data/component_defaults";
import { global } from "src/data/global";
import { data_list } from "src/data/data_list";

export const COMPLETION_LIST = completion_list;
export const CONVERSATION = conversation;
export const GOAL_LIST = goal_list;
export const HABIT_LIST = habit_list;
export const MODULE_LIST = module_list;
export const MODULE_PAGE = module_page;
export const TASK_LIST = task_list;
export const TIPS = tips;
export const CARE_PACKAGE_LIST = care_package_list;
export const HABIT_IDEAS = habit_ideas;
export const TOUR = tour;
export const HOME_PAGE = home_page;
export const REMINDER_LIST = reminder_list;
export const TEMPLATE = template;
export const COMPONENT_DEFAULTS = component_defaults;
export const GLOBAL = global;
export const DATA_LIST = data_list;

/** A simple variable just to type-check/ensure all data types have been exported in this file */
const mapping: { [key in FlowTypes.FlowType]: FlowTypes.FlowTypeWithData[] } = {
  completion_list: COMPLETION_LIST,
  conversation: CONVERSATION as any,
  goal_list: GOAL_LIST,
  habit_list: HABIT_LIST,
  module_list: MODULE_LIST,
  module_page: MODULE_PAGE,
  task_list: TASK_LIST,
  tips: TIPS,
  care_package_list: CARE_PACKAGE_LIST,
  habit_ideas: HABIT_IDEAS,
  tour: TOUR,
  home_page: HOME_PAGE,
  reminder_list: REMINDER_LIST,
  template: TEMPLATE,
  component_defaults: COMPONENT_DEFAULTS,
  global: GLOBAL,
  // TODO - once we have data_list types they should be imported here
  data_list: DATA_LIST,
};

/**
 * The data service has been through a couple iterations, currently the
 * main purpose is to re-export data from the data folder, but also has
 * a more general lookup which is used by task actions
 */

@Injectable({ providedIn: "root" })
export class PLHDataService {
  private allFlowsByName: { [flow_name: string]: any };
  public dataLists: { [key in FlowTypes.FlowType]?: { [row_id: string]: any } };
  constructor() {
    this.allFlowsByName = this.listAllFlowsByName();
    this.dataLists = this.processDataLists();
  }

  getFlowByName<T>(flow_name: string) {
    return this.allFlowsByName[flow_name] as T;
  }
  /**
   * Lookup all flows that include a `data_list_name` or are a `data_list` flow type
   * and map their rows to a json object, namespaced by their flow_name and row ids
   * so that they can be accessed directly, e.g. `@data.habit_list.some_habit_id`
   */
  processDataLists() {
    const dataLists = {};
    Object.values(mapping).forEach((flowList) => {
      flowList.forEach((flow) => {
        const { flow_name, flow_type, data_list_name } = flow;
        if (flow_type === "data_list" || data_list_name) {
          // namespace on data_list_name if specified, or flow_name if not
          const listName = data_list_name || flow_name;
          dataLists[listName] = dataLists[listName] || {};
          flow.rows.forEach((row) => {
            if (row.id) {
              dataLists[listName][row.id] = row;
            }
          });
        }
      });
    });
    return dataLists;
  }

  /** Simple function to create a hashmap of all flows by name */
  private listAllFlowsByName() {
    const flowsByName: { [flow_name: string]: any } = {};
    // Handle default flows
    const flowTypes = Object.values(mapping) as FlowTypes.FlowTypeBase[][];
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

  getComponentDefaultParamMap(componentType: FlowTypes.TemplateRowType): Record<string, any> {
    const defaultParamsList = COMPONENT_DEFAULTS.find((cd) => cd.flow_name === componentType);
    const paramMap = {};
    if (defaultParamsList) {
      for (let row of defaultParamsList.rows) {
        paramMap[row.parameter] = row.default_value;
      }
    }
    return paramMap;
  }
}
