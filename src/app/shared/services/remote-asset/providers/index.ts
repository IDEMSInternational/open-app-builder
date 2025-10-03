import { IRemoteAssetProvider } from "./base.remote-asset";
import { SupabaseRemoteAssetProvider } from "./supabase.remote-asset";
import type { IDeploymentConfig } from "packages/data-models";

export type IRemoteAssetProviderType = IDeploymentConfig["remote_assets"]["provider"];

export const getRemoteAssetProvider = (name: IRemoteAssetProviderType): IRemoteAssetProvider => {
  switch (name) {
    case "supabase":
      return new SupabaseRemoteAssetProvider();
    default:
      console.warn("[Remote Asset Provider] not configured for: ", name);
      throw new Error(`Unknown remote asset provider: ${name}`);
  }
};
