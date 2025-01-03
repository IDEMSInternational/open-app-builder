import type { DeviceInfo } from "@capacitor/device";
import type { FlowTypes } from "packages/data-models";

/**
 * User profile stored on server
 * TODO -  get DTO from api and use separate definitions for create/update vs db returned
 */
export interface IServerUser {
  id: number;
  app_user_id: string;
  app_version: string;
  app_deployment_name: string;
  auth_user_id?: string;
  contact_fields: Record<string, string>;
  device_info: DeviceInfo;
  dynamic_data: {
    [flow_type in FlowTypes.FlowType]?: {
      [flow_name: string]: {
        [row_id: string]: { [key: string]: any };
      };
    };
  };
  createdAt: string;
  updatedAt: string;
}
