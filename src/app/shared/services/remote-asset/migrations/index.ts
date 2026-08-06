import { Migration } from "../../migration/migration.types";
import remoteAssetsStorageFolder, {
  IRemoteAssetMigrationContext,
} from "./2026-08-05-remote-assets-storage-folder";

export type { IRemoteAssetMigrationContext };

/** Migrations owned by the remote asset feature, run on init in the order listed */
export const REMOTE_ASSET_MIGRATIONS: Migration<IRemoteAssetMigrationContext>[] = [
  remoteAssetsStorageFolder,
];
