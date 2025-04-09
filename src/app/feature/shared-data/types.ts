import type { IDeploymentConfig } from "packages/data-models";

export type ISharedDataProvider = IDeploymentConfig["shared_data"]["provider"];

export interface ISharedDataCollectionConfig {
  /** specify whether collection public */
  isPublic?: boolean;
}

export interface ISharedDataCollectionMetadata {
  id: string;
  _created_by: string;
  _created_at: string;
  _updated_at: string;
}

export type ISharedDataCollection = ISharedDataCollectionConfig &
  ISharedDataCollectionMetadata & {
    /** shared data, stored as key-value pairs */
    data: Record<string, any>;
  };
