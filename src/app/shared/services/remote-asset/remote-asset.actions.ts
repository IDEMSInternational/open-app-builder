import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import type { RemoteAssetService } from "./remote-asset.service";

export class RemoteAssetActionFactory {
  constructor(private service: RemoteAssetService) {}

  public asset_pack: IActionHandler = async ({ args }) => {
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
