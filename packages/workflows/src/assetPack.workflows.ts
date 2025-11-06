import type { IDeploymentWorkflows } from "./workflow.model";
import { writeFileSync } from "fs-extra";
import path from "path";
import { sortJsonKeys } from "shared";

const childWorkflows: IDeploymentWorkflows = {
  generate: {
    label: "Generate asset pack configuration",
    steps: [
      {
        name: "asset_pack_dl",
        function: async ({ tasks, config }) => {
          const { remote_assets_folders } = config.google_drive || {};
          if (!remote_assets_folders || remote_assets_folders.length === 0) {
            throw new Error(
              "No remote_assets_folders configured in deployment config. Please add remote_assets_folders to config.google_drive"
            );
          }

          const { assets_filter_function } = config.google_drive || {};
          const outputs: string[] = [];

          for (const { id: folderId, name: assetPackName } of remote_assets_folders) {
            const output = await tasks.assetPack.generate({
              folderId,
              assetPackName,
              filterFn: assets_filter_function,
            });
            outputs.push(output);
          }

          return outputs;
        },
      },
      {
        name: "asset_pack_process",
        function: async ({ tasks, workflow }) => {
          const processedEntries: Array<{ path: string; entries: any }> = [];

          for (const outputPath of workflow.asset_pack_dl.output) {
            // Process assets to generate nested override entries using the same logic as regular asset processing
            const tracked = await tasks.appData.generateProcessedAssetEntries({
              sourceAssetsFolder: outputPath,
            });
            processedEntries.push({ path: outputPath, entries: tracked });
          }

          return processedEntries;
        },
      },
      {
        name: "asset_pack_manifest",
        function: async ({ workflow }) => {
          for (const { path: outputPath, entries } of workflow.asset_pack_process.output) {
            // Write manifest.json with same format as contents.json (includes nested overrides)
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
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "asset_pack generate", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
