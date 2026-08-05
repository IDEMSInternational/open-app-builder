import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import type { RemoteAssetService } from "./remote-asset.service";
import type {
  IAssetPackDownloadParams,
  IAssetPackEnsureDownloadedParams,
} from "./remote-asset.types";
import { booleanStringToBoolean } from "../../utils";

export class RemoteAssetActionFactory {
  constructor(private service: RemoteAssetService) {}

  public asset_pack: IActionHandler = async ({ args, params }) => {
    const [actionId, ...assetPackArgs] = args;
    const childActions = {
      download: async () => {
        if (this.service.remoteAssetsEnabled()) {
          const assetPackName = assetPackArgs[0];
          await this.service.downloadAssetPackByName(assetPackName, {
            debugDownloadDelayMs: resolveDebugDownloadDelayMs(params as IAssetPackDownloadParams),
          });
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
        const assetPackList = resolveAssetPackNames(params as IAssetPackEnsureDownloadedParams);
        if (!assetPackList) {
          console.error(
            "The 'asset_pack: ensure_downloaded' action requires an 'asset_pack' or 'asset_pack_list' parameter."
          );
          return;
        }
        await this.service.ensureAssetPacksDownloaded(assetPackList, {
          awaitCompletion: shouldAwaitEnsureDownloaded(params as IAssetPackEnsureDownloadedParams),
          debugDownloadDelayMs: resolveDebugDownloadDelayMs(params as IAssetPackDownloadParams),
        });
      },
      delete: async () => {
        if (!this.service.remoteAssetsEnabled()) {
          console.error(
            "The 'asset_pack: delete' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
          return;
        }
        // Accept a name as an arg (`asset_pack: delete: my_pack`) as well as via params, so this
        // reads the same as `download` or `ensure_downloaded` depending on the author's preference.
        const assetPackList =
          resolveAssetPackNames(params as IAssetPackEnsureDownloadedParams) ||
          (assetPackArgs[0] ? [assetPackArgs[0]] : null);
        if (!assetPackList) {
          console.error(
            "The 'asset_pack: delete' action requires an 'asset_pack' or 'asset_pack_list' parameter."
          );
          return;
        }
        await this.service.deleteAssetPacks(assetPackList);
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

export function resolveAssetPackNames(params?: IAssetPackEnsureDownloadedParams): string[] | null {
  const assetPackList = parseAssetPackNames(params?.asset_pack_list);
  if (assetPackList) {
    return assetPackList;
  }
  return parseAssetPackNames(params?.asset_pack);
}

/**
 * Read the `debug_download_delay_ms` testing param. Authoring values arrive as strings, and a bad
 * value should never break a real download, so anything unparseable falls back to 0 (no delay).
 */
export function resolveDebugDownloadDelayMs(params?: IAssetPackDownloadParams): number {
  const value = params?.debug_download_delay_ms;
  if (value === undefined || value === null || value === "") {
    return 0;
  }
  const delayMs = Number(value);
  if (!Number.isFinite(delayMs) || delayMs < 0) {
    console.warn("[REMOTE ASSETS] Ignoring invalid debug_download_delay_ms value:", value);
    return 0;
  }
  return delayMs;
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
