import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import type { RemoteAssetService } from "./remote-asset.service";
import type { IAssetPackEnsureDownloadedParams } from "./remote-asset.types";

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
        await this.service.ensureAssetPacksDownloaded(assetPackList);
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
  if (params?.asset_pack_list?.length) {
    return params.asset_pack_list;
  }
  if (params?.asset_pack) {
    return [params.asset_pack];
  }
  return null;
}
