export * from "./app-data-action.utils";
export * from "./app-data-condition.utils";
export * from "./app-data-override.utils";
export * from "./app-data-string.utils";

export * from "./logging";

// re-export some shared utils for ease of import
// TODO - should refactor source code to import from shared
export {
  generateFolderFlatMap,
  Logger,
  setNestedProperty,
  booleanStringToBoolean,
  arrayToHashmap,
  logWarning,
  groupJsonByKey,
  createChildFileLogger,
  clearLogs,
  getLogFiles,
  getLogs,
} from "shared";

export type { IContentsEntry } from "shared";
