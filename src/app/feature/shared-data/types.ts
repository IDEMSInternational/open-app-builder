import type { IDeploymentConfig } from "packages/data-models";

export type ISharedDataProvider = IDeploymentConfig["shared_data"]["provider"];

export interface ISharedDataItem {
  /** shared data row id */
  id: string;
  /** specify whether collection public */
  public?: boolean;
  data: any;
  // metadata
  _created_by: string;
  _created_at: string;
  _updated_at: string;
}
