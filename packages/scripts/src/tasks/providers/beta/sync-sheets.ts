import PQueue from "p-queue";
import { ActiveDeployment } from "../../../commands/deployment/get";
import { logOutput, logWarning } from "../../../utils";

export async function syncSheets() {
  const tasks = require("../../../tasks").default;
  const config = ActiveDeployment.get({ skipRecompileCheck: true });
  const configAny = config as any;

  if (
    !configAny.google_drive?.sheets_overrides ||
    !Array.isArray(configAny.google_drive.sheets_overrides) ||
    configAny.google_drive.sheets_overrides.length === 0
  ) {
    logOutput({
      msg1: "No sheet overrides configured",
      msg2: "Skipping sheet sync",
    });
    return;
  }

  const overrides = configAny.google_drive.sheets_overrides;
  const externalSourcePath = configAny.external_source;

  if (!externalSourcePath) {
    logWarning({
      msg1: "No external source configured",
      msg2: "Cannot sync sheets without external source path",
    });
    return;
  }

  logOutput({
    msg1: `Found ${overrides.length} sheet overrides`,
    msg2: `Updating external source: ${externalSourcePath}`,
  });

  await tasks.gdrive.authorize();

  for (const override of overrides) {
    const { sheetId, folderId, path: pathParam } = override;

    if (sheetId) {
      logOutput({
        msg1: `Processing sheet override: ${sheetId}`,
        msg2: `Target path: ${pathParam || "Auto-discover"}`,
      });

      try {
        await tasks.sheetEditor.updateJsonFromSheetId(
          sheetId,
          tasks.gdrive,
          externalSourcePath,
          pathParam
        );
      } catch (error) {
        logWarning({
          msg1: `Failed to update from sheet ${sheetId}:`,
          msg2: error.message,
        });
      }
    } else if (folderId) {
      logOutput({
        msg1: `Processing folder override: ${folderId}`,
        msg2: "Fetching sheets...",
      });

      try {
        const sheets = await tasks.gdrive.getSheetsFromFolder(folderId);
        logOutput({
          msg1: `Found ${sheets.length} sheets in folder`,
          msg2: "Processing...",
        });

        const queue = new PQueue({
          concurrency: 1,
          interval: 2000,
          intervalCap: 1,
        });

        const promises = sheets.map((sheet: any) =>
          queue.add(async () => {
            logOutput({
              msg1: `Processing sheet: ${sheet.name}`,
              msg2: `ID: ${sheet.id}`,
            });

            await tasks.sheetEditor.updateJsonFromSheetId(
              sheet.id,
              tasks.gdrive,
              externalSourcePath,
              sheet.name
            );
          })
        );

        await Promise.all(promises);
      } catch (error) {
        logWarning({
          msg1: `Failed to process folder ${folderId}:`,
          msg2: error.message,
        });
      }
    } else {
      logWarning({
        msg1: "Invalid override config",
        msg2: JSON.stringify(override),
      });
    }
  }
}
