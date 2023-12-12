import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { Share, ShareOptions } from "@capacitor/share";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { Capacitor } from "@capacitor/core";

const SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE =
  "[SHARE] Sharing is not supported on this platform";

@Injectable({
  providedIn: "root",
})
export class ShareService extends SyncServiceBase {
  constructor(
    private errorHandler: ErrorHandlerService,
    private fileManagerService: FileManagerService,
    private templateActionRegistry: TemplateActionRegistry,
    private templateAssetService: TemplateAssetService
  ) {
    super("Share");
    this.initialise();
  }

  private initialise() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      share: async ({ args }) => {
        const [actionId, ...shareArgs] = args;
        const childActions = {
          file: async () => await this.shareFile(shareArgs[0]),
          text: () => this.share({ text: shareArgs[0] }),
          url: () => this.share({ url: shareArgs[0] }),
        };
        // To support deprecated "share" action (previously used to share text only),
        // assume text is being shared if first arg is not an actionId
        if (!(actionId in childActions)) {
          return await this.share({ text: args[0] });
        }
        return childActions[actionId]();
      },
    });
  }

  async share(options: ShareOptions) {
    const { value: canShare } = await Share.canShare();
    if (canShare) {
      try {
        const { activityType } = await Share.share(options);
        console.log("[SHARE] Content shared to", activityType);
      } catch (error) {
        this.handleShareError(error);
      }
    } else console.error(SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE);
  }

  async shareFile(relativePath: string) {
    let localFilepath: string;
    try {
      if (relativePath) {
        await this.templateAssetService.ready();
        // On native platforms, try to share file using @capacitor/share
        if (Capacitor.isNativePlatform()) {
          const { value: canShare } = await Share.canShare();
          if (canShare) {
            this.fileManagerService.ready();
            const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
            // @capacitor/share can only share files saved to "Cache" directory
            ({ localFilepath } = await this.fileManagerService.saveFile(
              blob,
              relativePath,
              "Cache"
            ));
            if (localFilepath) {
              const { activityType } = await Share.share({ url: localFilepath });
              console.log("[SHARE] Content shared to", activityType);
            }
          } else console.error(SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE);
        }
        // On web platforms, try to share file using Web Share API
        else {
          if (navigator.canShare) {
            const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
            const filename = relativePath.split("/").pop();
            const data = { files: [new File([blob], filename, { type: blob.type })] };
            if (navigator.canShare(data)) {
              await navigator.share(data);
            } else {
              console.error("[SHARE] Unable to share file:", data);
            }
          } else {
            console.error(SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE);
          }
        }
      }
    } catch (error) {
      this.handleShareError(error);
    } finally {
      // If a temporary file was saved for sharing, delete it
      if (localFilepath) {
        this.fileManagerService.deleteFile(localFilepath);
      }
    }
  }

  private handleShareError(error: Error) {
    const cancellationMessages = ["Abort due to cancellation of share.", "Share canceled"];
    if (cancellationMessages.includes(error.message)) {
      console.warn("[SHARE] Share cancelled by user");
    } else {
      this.errorHandler.handleError(error);
    }
  }
}
