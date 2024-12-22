import type { IDeploymentConfig } from "packages/data-models";

export type IAuthProvider = IDeploymentConfig["auth"]["provider"];

export interface IAuthUser {
  uid: string;
}
