import { Capacitor } from "@capacitor/core";
import { Migration } from "../../migration/migration.types";
import type { DynamicDataService } from "../dynamic-data.service";
import { FilePersistenceStrategy } from "../adapters/persistence/file.strategy";
import type { IDeploymentRuntimeConfig } from "packages/data-models";
import { fileExists, readIndexedDBDocs } from "src/app/shared/utils";
import { PersistedState } from "../adapters/persistence/persistence.interface";
import { Directory } from "@capacitor/filesystem";

/**
 * One-time migration to remove all indexeddb persisted documents on native,
 * and replace with json-file
 */
const migration: Migration<{ service: DynamicDataService; deployment: IDeploymentRuntimeConfig }> =
  {
    id: "2026-01-23-native-persist-json",
    preconditions: async () => {
      if (Capacitor.isNativePlatform()) {
        // If persist file already created assume migration has been previously run and skip
        const targetFilename = "oab-dynamic-data.json";
        return !fileExists(targetFilename, Directory.Data);
      }
      return false;
    },
    run: async ({ deployment }) => {
      const legacyData = await loadLegacyData(deployment.name);

      if (legacyData && legacyData.length > 0) {
        console.log("Migrating legacy RxDB data to File Storage...", legacyData);
        const legacyState = mapDocsToState(legacyData);
        const fileStrategy = new FilePersistenceStrategy();
        await fileStrategy.init();
        await fileStrategy.save(legacyState);
        console.log("Migrating legacy RxDB data to File Storage...", legacyData);
      }
    },
  };

export default migration;

// Example doc for type definitions
const ExampleDoc = {
  data: { id: "id_1", label: "Task 1", number: 1, completed: false, row_index: 0 },
  flow_name: "feat_data_actions_list",
  flow_type: "data_list",
  id: "data_list__feat_data_actions_list__id_1",
  row_id: "id_1",
  _attachments: {},
  _deleted: false,
  _meta: { lwt: 1769200435248.01 },
  _rev: "2-sltjluaibw",
};

async function loadLegacyData(deploymentName: string) {
  // Legacy data will have been persisted to rxdb dexie at v3 of schema
  const indexedDBName = `rxdb-dexie-${deploymentName}_user--3--user`;
  return readIndexedDBDocs<typeof ExampleDoc>(indexedDBName, "docs");
}

function mapDocsToState(docs: (typeof ExampleDoc)[]) {
  const state: PersistedState = {};
  for (const doc of docs) {
    const { flow_type, flow_name, row_id, data } = doc;
    if (!state[flow_type]) state[flow_type] = {};
    if (!state[flow_type][flow_name]) state[flow_type][flow_name] = {};
    state[flow_type][flow_name][row_id] = data;
  }
  return state;
}
