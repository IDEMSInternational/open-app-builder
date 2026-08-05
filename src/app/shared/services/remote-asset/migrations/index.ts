import { Migration } from "../../migration/migration.types";
import namespaceRemoteAssets, {
  IRemoteAssetMigrationContext,
} from "./2026-08-05-namespace-remote-assets";

export type { IRemoteAssetMigrationContext };

/** Migrations owned by the remote asset feature, run on init in the order listed */
export const REMOTE_ASSET_MIGRATIONS: Migration<IRemoteAssetMigrationContext>[] = [
  namespaceRemoteAssets,
];
