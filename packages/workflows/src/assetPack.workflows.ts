import type { IDeploymentWorkflows } from "./workflow.model";
import { writeFileSync } from "fs-extra";
import path from "path";
import { sortJsonKeys } from "shared";
import { AssetsPostProcessor } from "../../scripts/src/lib/app-data";
import { migrateLegacyGdriveConfig } from "./sync.workflows";

const childWorkflows: IDeploymentWorkflows = {
  generate: {
    label: "Generate asset pack configuration",
    steps: [
      {
        name: "asset_pack_dl",
        function: async ({ tasks, config }) => {
          // Use migrateLegacyGdriveConfig to get assets_folders (consistent with sync workflow)
          const { assets_folders } = migrateLegacyGdriveConfig(config.google_drive);

          // Filter for folders with remote flag set
          const remoteAssetsFolders = assets_folders?.filter((folder) => folder.remote) || [];

          if (remoteAssetsFolders.length === 0) {
            return console.warn("No remote asset folders configured");
          }

          const { assets_filter_function } = config.google_drive || {};

          const promises = remoteAssetsFolders.map(({ id: folderId, name: assetPackName }) =>
            tasks.assetPack.download({
              folderId,
              assetPackName,
              filterFn: assets_filter_function,
            })
          );

          return Promise.all(promises);
        },
      },
      {
        name: "asset_pack_process",
        function: async ({ workflow }) => {
          // Process assets to generate nested override entries
          const processor = new AssetsPostProcessor({
            sourceAssetsFolders: [],
          });
          const promises = workflow.asset_pack_dl.output.map(async (outputPath) => {
            const tracked = await processor.generateProcessedAssetEntries(outputPath);
            return { path: outputPath, entries: tracked };
          });

          return Promise.all(promises);
        },
      },
      {
        name: "asset_pack_manifest",
        function: ({ workflow }) => {
          for (const { path: outputPath, entries } of workflow.asset_pack_process.output) {
            // Write manifest.json with same format as contents.json for core assets (includes nested overrides)
            const manifestPath = path.resolve(outputPath, "manifest.json");
            writeFileSync(manifestPath, JSON.stringify(sortJsonKeys(entries), null, 2));
          }

          return workflow.asset_pack_dl.output;
        },
      },
    ],
  },
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  asset_pack: {
    label: `Run asset pack workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Generate Asset Packs",
        function: ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "asset_pack generate", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
