import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import type { RemoteAssetService } from "./remote-asset.service";
import type { IAssetPackEnsureDownloadedParams } from "./remote-asset.types";
import { booleanStringToBoolean } from "../../utils";

export class RemoteAssetActionFactory {
  constructor(private service: RemoteAssetService) {}

  public asset_pack: IActionHandler = async ({ args, params }) => {
    const [actionId, ...assetPackArgs] = args;
    const childActions = {
      download: async () => {
        if (this.service.remoteAssetsEnabled()) {
          const assetPackName = assetPackArgs[0];
          await this.service.downloadAssetPackByName(assetPackName);
        } else {
          console.error(
            "The 'asset_pack: download' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
        }
      },
      ensure_downloaded: async () => {
        if (!this.service.remoteAssetsEnabled()) {
          console.error(
            "The 'asset_pack: ensure_downloaded' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
          return;
        }
        const assetPackList = resolveEnsureDownloadedAssetPackList(
          params as IAssetPackEnsureDownloadedParams
        );
        if (!assetPackList) {
          console.error(
            "The 'asset_pack: ensure_downloaded' action requires an 'asset_pack' or 'asset_pack_list' parameter."
          );
          return;
        }
        await this.service.ensureAssetPacksDownloaded(assetPackList, {
          awaitCompletion: shouldAwaitEnsureDownloaded(params as IAssetPackEnsureDownloadedParams),
        });
      },
      cancel_download: async () => {
        if (this.service.remoteAssetsEnabled()) {
          console.log("[REMOTE ASSETS] Cancelling active asset pack downloads");
          await this.service.cancelActiveAssetPackDownloads();
        } else {
          console.error(
            "The 'asset_pack: cancel_download' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
        }
      },
      reset: async () => {
        if (this.service.remoteAssetsEnabled()) {
          await this.service.reset();
        } else {
          console.error(
            "The 'asset_pack: reset' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
        }
      },
    };
    if (!(actionId in childActions)) {
      console.error("asset_pack does not have action", actionId);
      return;
    }
    return childActions[actionId]();
  };
}

export function resolveEnsureDownloadedAssetPackList(
  params?: IAssetPackEnsureDownloadedParams
): string[] | null {
  const assetPackList = parseAssetPackNames(params?.asset_pack_list);
  if (assetPackList) {
    return assetPackList;
  }
  return parseAssetPackNames(params?.asset_pack);
}

export function shouldAwaitEnsureDownloaded(params?: IAssetPackEnsureDownloadedParams) {
  if (params?.await === undefined) {
    return true;
  }
  const value = booleanStringToBoolean(params.await);
  return value !== false;
}

function parseAssetPackNames(value: string | string[] | undefined): string[] | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    const names = value.filter(
      (item): item is string => typeof item === "string" && item.length > 0
    );
    return names.length ? names : null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          const names = parsed.filter(
            (item): item is string => typeof item === "string" && item.length > 0
          );
          return names.length ? names : null;
        }
      } catch {
        console.warn("[REMOTE ASSETS] Invalid asset pack list string:", value);
        return null;
      }
    }

    return [trimmed];
  }

  return null;
}
