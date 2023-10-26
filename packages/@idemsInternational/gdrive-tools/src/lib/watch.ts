#!/usr/bin/env node
import type { drive_v3 } from "googleapis";
import { authorizeGDrive, authorizeGDriveActivity } from "./authorize";
import { randomUUID } from "crypto";
import { GDriveDownloader } from "./download";
import chalk from "chalk";

export interface IWatchOptions {
  folderId: string;
  outputPath: string;
  credentialsPath: string;
  authTokenPath: string;
  logName: string;
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class GDriveWatcher {
  private lastSyncTime: string = new Date().toISOString();
  private recordedChanges = {};
  constructor(private options: IWatchOptions) {}

  /** Track whether watch already enabled and use to disable*/
  private enabled: Boolean;

  public start() {
    this.enabled = true;
    return this.wipPollDriveChangesApi();
    // await Promise.all([
    //   // this.wipPollActivityApi(),

    // ]);
    // await this.wipStreamDriveChangesApi();
  }

  public stop() {
    this.enabled = false;
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
    if (!this.enabled) {
      return;
    }
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
    // filter only files modified by me
    const { name, lastModifyingUser } = file;
    if (lastModifyingUser?.me) {
      const gdriveDownloader = new GDriveDownloader(this.options);
      // Filter only app cached entries (gdrive has full user drive scope)
      if (gdriveDownloader.getCachedEntry(file)) {
        console.log(chalk.blue(`${formatTimestamp()} [Change] ${name}`));
        await new GDriveDownloader(this.options).updateFileEntry(file);
      }
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
