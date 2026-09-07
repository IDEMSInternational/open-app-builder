import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import type { FlowTypes } from "src/app/shared/model";
import type { RemoteAssetService } from "./remote-asset.service";
import type {
  IAssetPackDownloadParams,
  IAssetPackEnsureDownloadedParams,
} from "./remote-asset.types";
import { booleanStringToBoolean } from "../../utils";

/**
 * Child actions that must bypass the template action queue. A download blocks that queue for its
 * full duration, so a queued `cancel_download` would only run once the download it was meant to
 * abort had already finished.
 */
const IMMEDIATE_ASSET_PACK_ACTIONS = new Set(["cancel_download"]);

/** Whether an `asset_pack` action should be dispatched ahead of the template action queue */
export function isImmediateAssetPackAction(action: FlowTypes.TemplateRowAction) {
  const [actionId] = action.args || [];
  return IMMEDIATE_ASSET_PACK_ACTIONS.has(actionId);
}

export class RemoteAssetActionFactory {
  constructor(private service: RemoteAssetService) {}

  public asset_pack: IActionHandler = async ({ args, params }) => {
    const [actionId, ...assetPackArgs] = args;
    const childActions = {
      download: async () => {
        if (!this.service.remoteAssetsEnabled()) {
          console.error(
            "The 'asset_pack: download' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
          );
          return;
        }
        const assetPackName = resolveDownloadAssetPackName(
          assetPackArgs,
          params as IAssetPackDownloadParams
        );
        if (!assetPackName) {
          console.error(
            "The 'asset_pack: download' action requires an asset pack name, given either as an argument ('asset_pack: download: my_pack') or an 'asset_pack' parameter."
          );
          return;
        }
        await this.service.downloadAssetPackByName(assetPackName, {
          debugDownloadDelayMs: resolveDebugDownloadDelayMs(params as IAssetPackDownloadParams),
        });
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
          debugDownloadDelayMs: resolveDebugDownloadDelayMs(params as IAssetPackDownloadParams),
          checkForUpdates: shouldCheckForUpdates(params as IAssetPackEnsureDownloadedParams),
        });
      },
      cancel_download: async () => {
        if (this.service.remoteAssetsEnabled()) {
          console.log("[REMOTE ASSETS] Cancelling active asset pack downloads");
          const cancelledAssetPacks = await this.service.cancelActiveAssetPackDownloads();
          if (cancelledAssetPacks.length) {
            console.log(
              `[REMOTE ASSETS] Cancel complete, ${cancelledAssetPacks.length} download(s) now marked 'cancelled':`,
              cancelledAssetPacks
            );
          }
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

/**
 * Read the asset pack name for a `download` action, which takes it either as an action arg
 * (`asset_pack: download: my_pack`) or as an `asset_pack` param, matching how `ensure_downloaded`
 * is authored. The arg wins when both are given, preserving the original behaviour.
 */
export function resolveDownloadAssetPackName(
  assetPackArgs: string[] = [],
  params?: IAssetPackDownloadParams
): string | null {
  for (const candidate of [assetPackArgs[0], params?.asset_pack]) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }
  return null;
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

/**
 * Read the `check_for_updates` param. Defaults to true - keeping downloaded packs up to date is the
 * normal case, and opting out is the exception. Only an explicit `false` disables it, so an
 * unparseable value still checks rather than silently leaving a deployment stuck on old content.
 */
export function shouldCheckForUpdates(params?: IAssetPackEnsureDownloadedParams) {
  if (params?.check_for_updates === undefined) {
    return true;
  }
  const value = booleanStringToBoolean(params.check_for_updates);
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
