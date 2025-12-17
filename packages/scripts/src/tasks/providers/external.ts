import { importExternalDeployment } from "../../commands/external/import";
import { runSyncExternalWorkflow } from "../../commands/external/pull";
import { setExternalDeployment } from "../../commands/external/set";
import { syncLibraries } from "../../commands/external/sync-libraries";
import { syncSheets } from "../../commands/external/sync-sheets";

export default {
  import: importExternalDeployment,
  pull: runSyncExternalWorkflow,
  set: setExternalDeployment,
  syncLibraries: syncLibraries,
  syncSheets: syncSheets,
};
