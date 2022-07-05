#!/usr/bin/env node
import { Command } from "commander";
import type { drive_v3 } from "googleapis";
import { logProgramHelp } from "../utils";
import { authorizeGDrive, authorizeGDriveActivity } from "./authorize";
import { PATHS } from "../paths";
import { randomUUID } from "crypto";
import { GDriveDownloader } from "./download";
import chalk from "chalk";

/***************************************************************************************
 * WiP Methods to enable streaming of live changes from google drive
 *
 * @example `yarn workspace @idemsInternational/gdrive-tools start watch --folder-id FOLDER_ID`
 *
 * Known Issues
 * - First change fast to detect with both apis, subsequent much slower. Activity API tends not
 * to pick up subsequent edits, changes API does with delay or manual page refresh
 * (maybe just large shared folders?)
 * - This can also be seen for the specific file api, so any methods that rely on reading file info
 * will have same difficulties
 * - Changes api webhook requires server, attempt to use localTunnel however unstable.
 * Manual testing via ngrok shows working, but same lag issues as polling method
 * - Only activity api supports filtered query, but not very responsive (at least for shared drives)
 * - Whilst the revisions API does pick up newer changes it returns chronologically not ideal
 *
 * TODOs
 * - Decide if limitations worth pursuing further
 * (might be better to rely on desktop app/alt storage sources, if inconsistent could be frustrating)
 * - Add file update handling
 * - Add bindings for workflow methods
 * - Remove localtunnel if no longer required
 * - If using tunnel add express api or similar to listen on proxied port and respond
 *
 *
 *************************************************************************************/
interface IProgramOptions {
  folderId: string;
  outputPath: string;
  credentialsPath: string;
  authTokenPath: string;
  logName: string;
}

const program = new Command("watch");
export default program
  .description("Watch a folder for changes")
  .requiredOption("-id --folder-id <string>", "Unique ID of folder to download (gdrive url suffix)")
  .requiredOption(
    "-o --output-path <string>",
    "Output path for downloaded files (default ./output)",
    PATHS.DEFAULT_OUTPUT_FOLDER
  )
  .requiredOption(
    "-c --credentials-path <string>",
    "Path to credentials JSON",
    PATHS.DEFAULT_CREDENTIALS
  )
  .requiredOption("-a --auth-token-path <string>", "Path to token JSON", PATHS.DEFAULT_TOKEN)
  .requiredOption(
    "-l --log-name <string>",
    "Name provided for logs (defaults action.log)",
    "actions.log"
  )

  .action(async (options: IProgramOptions) => new GDriveWatcher(options).run());

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

class GDriveWatcher {
  private lastSyncTime: string = new Date().toISOString();
  private recordedChanges = {};
  constructor(private options: IProgramOptions) {}

  public async run() {
    await Promise.all([
      // this.wipPollActivityApi(),
      this.wipPollDriveChangesApi(),
    ]);
    // await this.wipStreamDriveChangesApi();
  }

  /**
   * Retrieve all drive changes since last sync. Currently not implemented but kept for ref   *
   * This could possibly used to manually poll changes instead of streaming watch#
   *
   * NOTE - requires API enabled https://console.cloud.google.com/apis/api/driveactivity.googleapis.com
   */
  private async wipPollActivityApi(interval = 1000 * 3) {
    const { folderId, authTokenPath, credentialsPath } = this.options;
    const { driveactivity } = await authorizeGDriveActivity({ authTokenPath, credentialsPath });
    console.log("\nwatching user edits...\n");
    const executePoll = async (resolve: (value: any) => void, reject: (err: Error) => void) => {
      const filter = `time > "${this.lastSyncTime}" detail.action_detail_case: EDIT`;
      const res = await driveactivity.activity
        .query({
          requestBody: {
            pageSize: 1, // actual results may be more, this is a minimum
            ancestorName: `items/${folderId}`,
            // filter,
            // consolidationStrategy: { none: {} },
          },
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });

      if (res && res.data?.activities) {
        // only update sync time if update received as could be latency between when
        // sync timestamp not actually populate at time of polling
        for (const activity of res.data.activities.slice(0, 1)) {
          const { actors, targets, timestamp } = activity;
          // only track edits (could be included in filter)
          if (activity.primaryActionDetail.edit) {
            // only track actions by current user
            if (actors.find((actor) => actor?.user?.knownUser?.isCurrentUser)) {
              this.lastSyncTime = timestamp;
              for (const target of targets) {
                const targetName = target.driveItem?.name;
                if (targetName) {
                  const recordedChange = this.recordedChanges[targetName];
                  if (!recordedChange || recordedChange.timestamp < timestamp) {
                    this.recordedChanges[targetName] = { ...target, timestamp };
                    console.log(`${formatTimestamp()} [CHANGE] ${target.driveItem?.title}`);
                    // TODO - handle download target.driveItem.name
                  }
                }
              }
            }
          }
        }
      }
      setTimeout(executePoll, interval, resolve, reject);
    };
    return new Promise(executePoll);
  }

  /**
   * Send repeated requests to google drive changes api to check for file updates
   * Queries against all files a user has access to
   * TODO - see if there is better way to apply filtered query
   **/
  private async wipPollDriveChangesApi(interval = 1000 * 3) {
    const { authTokenPath, credentialsPath } = this.options;
    const { drive } = await authorizeGDrive({ authTokenPath, credentialsPath });
    let pageToken = await this.getPageToken(drive);
    console.log("watching file changes...");
    const executePoll = async (resolve: (value: any) => void, reject: (err: Error) => void) => {
      if (!pageToken) {
        pageToken = await this.getPageToken(drive);
      }
      const res = await drive.changes
        .list({
          pageToken,
          pageSize: 1,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
          fields: "*", // specific fields seems to not work, use all for debugging
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
      if (res && res.data) {
        const { changes, newStartPageToken } = res.data;
        if (changes?.length > 0) {
          pageToken = newStartPageToken;
          for (const change of changes) {
            await this.handleFileChange(change);
          }
        }
      }
      setTimeout(executePoll, interval, resolve, reject);
    };
    return new Promise(executePoll);
  }

  /** Generate a token used to interact with drive changes API */
  private async getPageToken(drive: drive_v3.Drive) {
    const initialTokenRes = await drive.changes.getStartPageToken();
    return initialTokenRes.data.startPageToken;
  }

  private async handleFileChange(change: drive_v3.Schema$Change) {
    const { file } = change;
    // TODO - see if way to check file used by app
    // filter only files modified by me
    const { modifiedByMe, name } = file;
    if (modifiedByMe) {
      console.log(chalk.blue(`${formatTimestamp()} [Change] ${name}`));
      await new GDriveDownloader(this.options).updateFileEntry(file);
    }
  }

  /**
   * Create a new subscription to push google changes to a custom webhook.
   */
  private async wipStreamDriveChangesApi() {
    const { folderId, authTokenPath, credentialsPath } = this.options;
    const { drive } = await authorizeGDrive({ authTokenPath, credentialsPath });
    const tunnel = await this.wipCreateStreamChangeTunnel();
    const startPageReq = await drive.changes.getStartPageToken();
    const expiration = `${new Date().getTime() + 1000 * 60 * 60}`; // default expiry after 1h
    const changesReq = await drive.changes
      .watch({
        pageToken: startPageReq.data.startPageToken,
        // driveId: folderId,
        // includeItemsFromAllDrives: true,
        // supportsAllDrives: true,
        requestBody: {
          kind: "api#channel",
          id: randomUUID(),
          type: "web_hook",
          address: tunnel.url, // can replace with custom ngrok or webhook.site tunnel for testing
          expiration,
        },
      })
      .catch((err) => {
        console.error("change error", err.response.data.error.errors);
        tunnel.close();
      });
    if (changesReq) {
      console.log("changes", changesReq.data);
    }
  }

  /**
   *
   * TODO - loca.lt service very flaky, requires self-hosting server
   * It may also be worth running full subscription on a server (just pass folderId)
   * and supporting webhook back to any listeners
   */
  private async wipCreateStreamChangeTunnel() {
    return { url: "" };

    let localTunnel: any; // TODO - requires import add adding package
    // import localTunnel from "localtunnel";
    const tunnel = await localTunnel({ port: 3000, host: "http://loca.lt" });
    console.log("tunnel listening", tunnel.url);

    // TODO - check which events are recorded
    tunnel.addListener("request", (req) => {
      console.log("tunnel request received", req);
    });
    tunnel.on("request", (stream) => {
      console.log("on request", stream);
    });
    tunnel.on("connection", (stream) => {
      console.log("connection made", stream);
    });
    tunnel.on("close", (stream) => {
      console.log("tunnel closed", stream);
    });
    tunnel.addListener("request", (stream) => {
      console.log("on request", stream);
    });
    tunnel.addListener("connection", (stream) => {
      console.log("connection made", stream);
    });
    tunnel.addListener("close", (stream) => {
      console.log("tunnel closed", stream);
    });
    return tunnel;
  }
}

function formatTimestamp(d = new Date()) {
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}
