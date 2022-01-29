import android from "./providers/android";
import file from "./providers/file";
import gdrive from "./providers/gdrive";
import template from "./providers/template";
import translation from "./providers/translation";

/**
 * Tasks are thin wrappers around functions and commands, to support inclusion as part of
 * chained workflows
 *
 * TODO - naming conventions should be tidied so that commands and tasks are consistend
 */
const ALL_TASKS = {
  android,
  file,
  gdrive,
  template,
  translation,
};

export type ITasks = typeof ALL_TASKS;

export default ALL_TASKS;
