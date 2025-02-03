import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { Share, ShareOptions } from "@capacitor/share";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { Capacitor } from "@capacitor/core";

interface IShareActionParams {
  file?: string;
  text?: string;
  url?: string;
  title?: string;
  dialog_title?: string;
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

        if (params) {
          await this.handleShare(params);
        } else if (args) {
          console.warn("[SHARE] Deprecated action syntax. Use `share | data_type: data` instead.");
          await this.handleLegacyShare(args);
        } else {
          return console.error("[SHARE] No params provided to `share` action");
        }
      },
    });
  }

  private async handleShare(options: IShareActionParams) {
    // Rename `dialog_title` to `dialogTitle`
    let parsedOptions = {
      dialogTitle: options.dialog_title,
      ...(({ dialog_title, ...rest }) => rest)(options),
    };
    // Convert file reference to platform-relative shareable file data
    if (parsedOptions?.file) {
      const fileData = await this.getFileData(parsedOptions.file);
      delete parsedOptions.file;
      parsedOptions = { ...parsedOptions, ...fileData };
    }
    await this.share(parsedOptions);
  }

  private async share(options: ShareOptions | ShareData) {
    try {
      if (Capacitor.isNativePlatform()) {
        await this.shareNative(options as ShareOptions);
      }
      // Capacitor's Share API does not support sharing files on web, so use Web Share API directly
      else {
        await this.shareWeb(options as ShareData);
      }
    } catch (error) {
      this.handleShareError(error);
    } finally {
      this.cleanupLocalFile();
    }
  }

  private async shareNative(options: ShareOptions) {
    const { value: canShare } = await Share.canShare();
    if (canShare) {
      const { activityType } = await Share.share(options);
      console.log("[SHARE] Content shared to", activityType);
    } else {
      console.error("[SHARE] Sharing is not supported on this platform");
    }
  }

  private async shareWeb(options: ShareData) {
    if (navigator.canShare(options)) {
      await navigator.share(options);
    } else {
      console.error("[SHARE] Unable to share this data on this platform,", options);
    }
  }

  /**
   * Fetch the requested file and format file data for sharing, appropriate to platform
   * - On Web platforms, the file is shared directly as a blob
   * - On Native platforms, file is temporarily saved to app's internal cache, and a local URL is shared
   */
  private async getFileData(relativePath: string) {
    if (!relativePath) return {};

    let shareAbleFileData: { url?: string; files?: File[] } = {};

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
    return shareAbleFileData;
  }

  /**
   * If a local file was saved temporarily for sharing, delete it
   * */
  private async cleanupLocalFile() {
    if (this.localFilepath) {
      await this.fileManagerService.deleteFile(this.localFilepath);
      this.localFilepath = null;
    }
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

  // Handle "share" actions called using legacy arg-based syntax
  private async handleLegacyShare(args: string[]) {
    const [actionId, ...shareArgs] = args;
    const childActions = {
      file: async () => await this.handleShare({ file: shareArgs[0] }),
      text: async () => await this.handleShare({ text: shareArgs[0] }),
      url: async () => await this.handleShare({ url: shareArgs[0] }),
    };
    // To support deprecated "share" action (previously used to share text only),
    // assume text is being shared if first arg does not match an actionId
    if (!(actionId in childActions)) {
      await this.handleShare({ text: args[0] });
    } else {
      await childActions[actionId](args);
    }
  }
}
