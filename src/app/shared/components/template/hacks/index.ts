import { FlowTypes } from "scripts/types";

/**
 * The hacks folder contains short term workarounds which should
 * eventually be replaced in the main platform.
 *
 * All hacks should:
 * - be prefixed with 'hack'
 * - include  a brief description of where and why they are used
 */

/**
 * @description
 * `nav_group` components are populated dynamically, and currnetly have no method
 * of setting an action list. As we want to pass emit actions to parent, include
 * a default row that re-emits completed/uncompleted actions
 */
export const hackAddRowWithDefaultActions = () => {
  const row: FlowTypes.TemplateRow = {
    action_list: [
      { trigger: "completed", action_id: "emit", args: ["completed"] },
      { trigger: "uncompleted", action_id: "emit", args: ["uncompleted"] },
    ],
  } as FlowTypes.TemplateRow;
  return row;
};
