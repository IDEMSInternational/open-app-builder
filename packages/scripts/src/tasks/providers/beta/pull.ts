import path from "path";
import { ActiveDeployment } from "../../../commands/deployment/get";
import { logOutput, logWarning } from "../../../utils";
import externalRawData from "./externalRawData";

export async function pull(): Promise<void> {
  logOutput({
    msg1: "Processing external app_data...",
    msg2: "Using externalRawData task provider",
  });

  try {
    const config = ActiveDeployment.get({ skipRecompileCheck: true });

    const configAny = config as any;

    if (configAny.external_source && config.app_data?.output_path) {
      const sourceFolder = path.resolve(configAny.external_source, "app_data");
      await externalRawData.processExternalRawData({
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
