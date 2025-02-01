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

interface IShareActionParams {
  file?: string;
  text?: string;
  url?: string;
  title?: string;
  dialogTitle?: string;
}

@Injectable({
  providedIn: "root",
})
export class ShareService extends SyncServiceBase {
  // Temporary local storage path on native devices for file being shared
  localFilepath: string;
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
      share: async (action) => {
        const { args, params } = action as { args: string[]; params: IShareActionParams };

        // Support legacy "share" action arg-based syntax
        if (args) {
          const [actionId, ...shareArgs] = args;
          const childActions = {
            file: async () => await this.handleShare({ file: shareArgs[0] }),
            text: () => this.handleShare({ text: shareArgs[0] }),
            url: () => this.handleShare({ url: shareArgs[0] }),
          };
          // To support deprecated "share" action (previously used to share text only),
          // assume text is being shared if first arg does not match an actionId
          if (!(actionId in childActions)) {
            return await this.handleShare({ text: args[0] });
          }
          return childActions[actionId]();
        } else if (params) {
          this.handleShare(params);
        } else {
          return console.error("[SHARE] no params provided");
        }
      },
    });
  }

  private async handleShare(options: IShareActionParams) {
    if (options.file) {
      options = await this.processShareParams(options);
    }
    const { value: canShare } = await Share.canShare();
    if (!canShare) return console.error(SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE);
    await this.share(options);
  }

  private async processShareParams(params: IShareActionParams) {
    if (params?.file) {
      const fileData = await this.getFileData(params.file);
      delete params.file;
      params = { ...params, ...fileData };
    }
    return params;
  }

  async share(options: ShareOptions | ShareData) {
    try {
      if (Capacitor.isNativePlatform()) {
        const { value: canShare } = await Share.canShare();
        if (canShare) {
          try {
            const { activityType } = await Share.share(options as ShareOptions);
            console.log("[SHARE] Content shared to", activityType);
          } catch (error) {
            this.handleShareError(error);
          }
        } else console.error(SHARE_NOT_SUPPORTED_ON_PLATFORM_ERROR_MESSAGE);
      }
      // Capacitor's Share API does not support sharing files on web, so use Web Share API directly
      else {
        const data = options as ShareData;
        if (navigator.canShare(data)) {
          await navigator.share(data);
        } else {
          console.error("[SHARE] Unable to share,", data);
        }
      }
    } catch (error) {
      this.handleShareError(error);
    } finally {
      // If a temporary file was saved for sharing, delete it
      if (this.localFilepath) {
        await this.fileManagerService.deleteFile(this.localFilepath);
        this.localFilepath = null;
      }
    }
  }

  // Fetch the requested file and format file data for sharing, appropriate to platform
  // - On Web platforms, the file is shared directly as a blob
  // - On Native platforms, file is temporarily saved to app's internal cache, and a local URL is shared
  private async getFileData(relativePath: string) {
    let shareAbleFileData: { url?: string; files?: File[] } = {};

    if (relativePath) {
      await this.templateAssetService.ready();

      // On native platforms, temporarily save file locally in order to share URL
      if (Capacitor.isNativePlatform()) {
        this.fileManagerService.ready();
        const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
        const saveFileResponse = await this.fileManagerService.saveFile({
          data: blob,
          targetPath: relativePath,
          // @capacitor/share can only share files saved to "Cache" directory
          directory: "Cache",
        });
        this.localFilepath = saveFileResponse.localFilepath;
        if (this.localFilepath) {
          shareAbleFileData = { url: this.localFilepath };
        }
      }
      // On web platforms, format the data for the Web Share API
      else {
        const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
        const filename = relativePath.split("/").pop();
        shareAbleFileData = { files: [new File([blob], filename, { type: blob.type })] };
      }
    }
    return shareAbleFileData;
  }

  private handleShareError(error: Error) {
    // Handle known errors resulting from user cancelling share
    const CANCELLATION_MESSAGES = ["Abort due to cancellation of share.", "Share canceled"];
    if (CANCELLATION_MESSAGES.includes(error.message)) {
      console.warn("[SHARE] Share cancelled by user");
    } else {
      this.errorHandler.handleError(error);
    }
  }
}
