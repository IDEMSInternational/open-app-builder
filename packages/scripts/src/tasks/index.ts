import actions from "./providers/actions";
import android from "./providers/android";
import appData from "./providers/appData";
import deployment from "./providers/deployment";
import encryption from "./providers/encryption";
import externalRawData from "./providers/externalRawData";
import file from "./providers/file";
import gcs from "./providers/gcs";
import gdrive from "./providers/gdrive";
import git from "./providers/git";
import ios from "./providers/ios";
import sheetEditor from "./providers/sheetEditor";
import subtitles from "./providers/subtitles";
import template from "./providers/template";
import translate from "./providers/translate";
import userInput from "./providers/userInput";
import workflow from "./providers/workflow";

/**
 * Tasks are thin wrappers around functions and commands, to support inclusion as part of
 * chained workflows
 *
 * TODO - naming conventions should be tidied so that commands and tasks are consistent
 */
const ALL_TASKS = {
  actions,
  android,
  appData,
  deployment,
  encryption,
  externalRawData,
  file,
  gcs,
  gdrive,
  git,
  ios,
  sheetEditor,
  subtitles,
  template,
  translate,
  userInput,
  workflow,
};

export type ITasks = typeof ALL_TASKS;

export default ALL_TASKS;
