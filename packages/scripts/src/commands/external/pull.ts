#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import { ActiveDeployment } from "../deployment/get";
import { logOutput, logWarning } from "../../utils";

const program = new Command("pull");

program
  .description("Pull external app_data using the configured external source")
  .action(async () => {
    await runSyncExternalWorkflow();
  });

export async function runSyncExternalWorkflow(): Promise<void> {
  logOutput({
    msg1: "Processing external app_data...",
    msg2: "Using externalRawData task provider",
  });

  // Import the tasks and process external data directly
  try {
    const tasks = require("../../tasks").default;
    const config = ActiveDeployment.get({ skipRecompileCheck: true });

    const configAny = config as any;

    if (configAny.external_source && config.app_data?.output_path) {
      const sourceFolder = path.resolve(configAny.external_source, "app_data");
      await tasks.externalRawData.processExternalRawData({
        sourceFolder,
        outputFolder: config.app_data.output_path,
      });

      logOutput({
        msg1: "External app_data processing completed successfully",
        msg2: "",
      });
    } else {
      logWarning({
        msg1: "Warning: Missing app_data configuration",
        msg2: "Skipping external data processing",
      });
    }
  } catch (error) {
    logWarning({
      msg1: "Warning: External data processing failed:",
      msg2: error.message,
    });
  }
}

export default program;
