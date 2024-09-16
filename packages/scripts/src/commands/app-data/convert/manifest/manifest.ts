/**
 * TODO
 * - Organise structures for individual sub-reports (e.g. assets, sheets, components)
 * - Decide whether to run report row-by-row or just allow repeated loops
 * - Generate output html
 * - Include sheet types/subtypes in manifest
 * - short summary text that links to breakdown
 * - possible recommendations/optimisations from manifest
 * - how to handle implicit deps (one component uses another)
 * - possibly will require runtime error/warning/prompt
 * - handle dynamic
 * - handle multiple emit types
 * - QA components/actions that don't exist
 * - possibly export list of COMPONENTS_AVAILABLE (or similar... or just use main list lookup)
 * - also consider asset manifest (but would need to ensure dynamic assets included, plus param list + template value)
 * - handle implicit components (check imports (?))
 */

// Testing notes
// yarn workflow sync_sheets --skip-download

import { FlowTypes } from "data-models";
import { IParsedWorkbookData } from "../types";

interface IFlowManifest {
  components: Record<string, number>;
  actions: Record<string, number>;
  // TODO - also may need to consider imported from data_list or other sources
}

/**
 * Create a manifest of components and action handlers referenced by templates
 * NOTE - this will not explicitly identify any variables injected dynamically
 * TODO - add tests and example to catch?
 * */
export function generateManifest(data: IParsedWorkbookData): IFlowManifest {
  const manifest: IFlowManifest = { actions: {}, components: {} };
  // TODO - consider extracting dynamic data_list actions if exist
  for (const flow of data.template || []) {
    for (const row of flow.rows) {
      const { action_list = [], type } = row as FlowTypes.TemplateRow;
      for (const action of action_list) {
        manifest.actions[action.action_id] ??= 0;
        manifest.actions[action.action_id]++;
      }
      manifest.components[type] ??= 0;
      manifest.components[type]++;
    }
  }
  //   sort data alphabetically
  for (const key of Object.keys(manifest)) {
    manifest[key] = sortJsonByKey(manifest[key]);
  }
  return manifest;
}

//  TODO - move to generic location (possibly object-utils once #2423 merged)
export function sortJsonByKey<T extends Record<string, any>>(json: T) {
  const sorted = {};
  for (const [key, value] of Object.entries(json).sort((a, b) => (a[0] > b[0] ? 1 : -1))) {
    sorted[key] = value;
  }
  return sorted as T;
}
