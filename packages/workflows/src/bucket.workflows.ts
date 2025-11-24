import type { IDeploymentWorkflows } from "./workflow.model";
import * as path from "path";

/** Bucket management workflows for Google Cloud Storage */
const workflows: IDeploymentWorkflows = {
  update_bucket: {
    label: "Update GCS buckets with assets from Google Drive",
    steps: [
      {
        name: "download_assets_from_drive",
        function: async ({ tasks, config }) => {
          console.log("Downloading assets from Google Drive...");

          // Get assets folder configuration
          const { google_drive } = config;
          const assetsFolders = google_drive.assets_folders || [];

          if (assetsFolders.length === 0) {
            throw new Error("No assets_folders configured in google_drive config");
          }

          const downloadedPaths: { folderPath: string; bucketName: string }[] = [];

          // Download each assets folder from Google Drive
          for (const folder of assetsFolders) {
            const {
              id: folderId,
              name: folderName,
              bucket_name,
              bucket_url,
              service_account_key_path,
              version,
            } = folder;

            if (!bucket_name && !bucket_url) {
              console.warn(
                `Skipping folder ${folderName} - no bucket_name or bucket_url configured`
              );
              continue;
            }

            console.log(`Downloading assets from Google Drive folder: ${folderName} (${folderId})`);

            const outputPath = await tasks.gdrive.download({
              type: "assets",
              folderId,
              folderName,
              filterFn: google_drive.assets_filter_function,
            });

            downloadedPaths.push({
              folderPath: outputPath,
              bucketName: bucket_name,
              bucketUrl: bucket_url,
              serviceAccountKeyPath: service_account_key_path,
              version,
            });
          }

          return downloadedPaths;
        },
      },
      {
        name: "upload_to_buckets",
        function: async ({ tasks, workflow }) => {
          console.log("Uploading assets to GCS buckets...");

          const downloadedPaths = workflow["download_assets_from_drive"].output as {
            folderPath: string;
            bucketName?: string;
            bucketUrl?: string;
            serviceAccountKeyPath?: string;
            version?: string;
          }[];

          if (!downloadedPaths || downloadedPaths.length === 0) {
            console.log("No assets to upload");
            return;
          }

          // Upload each folder to its corresponding bucket
          for (const {
            folderPath,
            bucketName,
            bucketUrl,
            serviceAccountKeyPath,
            version,
          } of downloadedPaths) {
            const targetBucket = bucketName || bucketUrl;
            const versionText = version ? ` (version ${version})` : "";
            console.log(`Uploading ${folderPath} to bucket: ${targetBucket}${versionText}`);

            await tasks.gcs.uploadFolder({
              bucketName,
              bucketUrl,
              localFolderPath: folderPath,
              serviceAccountKeyPath,
              version,
            });
          }

          console.log("All assets uploaded to GCS buckets successfully!");
        },
      },
    ],
  },

  pull_bucket: {
    label: "Download assets from GCS buckets to app_data/assets",
    steps: [
      {
        name: "download_from_buckets",
        function: async ({ tasks, config }) => {
          console.log("Downloading assets from GCS buckets...");

          // Get assets folder configuration
          const { google_drive, app_data } = config;
          const assetsFolders = google_drive.assets_folders || [];

          if (assetsFolders.length === 0) {
            throw new Error("No assets_folders configured in google_drive config");
          }

          // Determine output path
          const outputBasePath = path.resolve(app_data.output_path, "assets");

          // Download from each bucket
          for (const folder of assetsFolders) {
            const {
              name: folderName,
              bucket_name,
              bucket_url,
              service_account_key_path,
              version,
            } = folder;

            if (!bucket_name && !bucket_url) {
              console.warn(
                `Skipping folder ${folderName} - no bucket_name or bucket_url configured`
              );
              continue;
            }

            const targetBucket = bucket_name || bucket_url;
            const versionText = version ? ` (version ${version})` : "";
            console.log(`Downloading from bucket: ${targetBucket}${versionText}`);

            // Download directly to app_data/assets (not in a subfolder)
            await tasks.gcs.downloadFolder({
              bucketName: bucket_name,
              bucketUrl: bucket_url,
              localFolderPath: outputBasePath,
              serviceAccountKeyPath: service_account_key_path,
              version,
            });
          }

          console.log("All assets downloaded from GCS buckets successfully!");
          return outputBasePath;
        },
      },
    ],
  },

  version_bucket: {
    label: "Create a new version of the bucket and update config",
    steps: [
      {
        name: "create_new_version",
        function: async ({ tasks, config }) => {
          console.log("Creating new bucket version...");

          const { google_drive } = config;
          const assetsFolders = google_drive.assets_folders || [];

          if (assetsFolders.length === 0) {
            throw new Error("No assets_folders configured in google_drive config");
          }

          const versionUpdates: { folder: any; newVersion: string }[] = [];

          // Get next version for each bucket
          for (const folder of assetsFolders) {
            const { name: folderName, bucket_name, bucket_url, service_account_key_path } = folder;

            if (!bucket_name && !bucket_url) {
              console.warn(`Skipping folder ${folderName} - no bucket configured`);
              continue;
            }

            const newVersion = await tasks.gcs.getNextVersion(
              bucket_name,
              bucket_url,
              service_account_key_path
            );
            console.log(`Next version for ${folderName}: ${newVersion}`);

            versionUpdates.push({ folder, newVersion });
          }

          return versionUpdates;
        },
      },
      {
        name: "upload_new_version",
        function: async ({ tasks, workflow }) => {
          console.log("Uploading assets to new version...");

          const versionUpdates = workflow["create_new_version"].output as {
            folder: any;
            newVersion: string;
          }[];

          // First download assets from Google Drive
          const downloadedPaths: { folderPath: string; folder: any; newVersion: string }[] = [];

          for (const { folder, newVersion } of versionUpdates) {
            const { id: folderId, name: folderName } = folder;

            console.log(`Downloading assets from Google Drive folder: ${folderName}`);

            const outputPath = await tasks.gdrive.download({
              type: "assets",
              folderId,
              folderName,
            });

            downloadedPaths.push({ folderPath: outputPath, folder, newVersion });
          }

          // Upload each folder to its new version
          for (const { folderPath, folder, newVersion } of downloadedPaths) {
            const { name: folderName, bucket_name, bucket_url, service_account_key_path } = folder;
            const targetBucket = bucket_name || bucket_url;

            console.log(`Uploading ${folderName} to ${targetBucket} version ${newVersion}`);

            await tasks.gcs.uploadFolder({
              bucketName: bucket_name,
              bucketUrl: bucket_url,
              localFolderPath: folderPath,
              serviceAccountKeyPath: service_account_key_path,
              version: newVersion,
            });
          }

          return downloadedPaths;
        },
      },
      {
        name: "update_config",
        function: async ({ workflow }) => {
          console.log("Updating configuration with new versions...");

          const uploadResults = workflow["upload_new_version"].output as {
            folder: any;
            newVersion: string;
          }[];

          // TODO: Update the deployment config file with new versions
          // This would require modifying the config.ts file programmatically
          // For now, just output the required changes

          console.log("\\n" + "=".repeat(60));
          console.log("UPDATE YOUR CONFIG FILE:");
          console.log("=".repeat(60));

          for (const { folder, newVersion } of uploadResults) {
            const { name: folderName } = folder;
            console.log(`Set version for ${folderName}: "${newVersion}"`);
          }

          console.log("\\nAdd the 'version' property to your assets_folders configuration:");
          console.log("Example:");
          console.log("config.google_drive.assets_folders = [");
          console.log("  {");
          console.log('    id: "...",');
          console.log('    name: "cw_assets",');
          console.log('    bucket_name: "...",');
          console.log('    service_account_key_path: "...",');
          console.log(`    version: "${uploadResults[0]?.newVersion || "v1"}"`);
          console.log("  }");
          console.log("];");
          console.log("=".repeat(60));

          return uploadResults;
        },
      },
    ],
  },
};

export default workflows;
