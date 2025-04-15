import type { IDeploymentConfig } from "packages/data-models";

export type ISharedDataProvider = IDeploymentConfig["shared_data"]["provider"];

export interface ISharedDataCollectionConfig {
  // additional fields to populate during ini
}

export interface ISharedDataCollectionMetadata {
  id: string;
  _created_by: string;
  _created_at: string;
  _updated_at: string;
}

export type ISharedDataCollection = ISharedDataCollectionConfig &
  ISharedDataCollectionMetadata & {
    /** publicly available group data, stored as key-value pairs */
    data: Record<string, any>;
    /** list of device_ids registered as members */
    members: string[];
    /** list of device_ids registered as admins */
    admins: string[];

    isPublic?: boolean;
  };
