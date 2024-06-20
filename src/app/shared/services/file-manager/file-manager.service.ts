import { Injectable } from "@angular/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { saveAs } from "file-saver";
import { SyncServiceBase } from "../syncService.base";
import { environment } from "src/environments/environment";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { ErrorHandlerService } from "../error-handler/error-handler.service";

@Injectable({
  providedIn: "root",
})
export class FileManagerService extends SyncServiceBase {
  cacheName: string;

  constructor(
    private errorHandler: ErrorHandlerService,
    private templateActionRegistry: TemplateActionRegistry,
    private templateAssetService: TemplateAssetService
  ) {
    super("FileManager");
    this.initialise();
  }

  private initialise() {
    this.cacheName = environment.deploymentConfig.name;
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      // Native: save file to Documents folder in external device storage and open;
      // Web: download file
      save_to_device: async ({ args }) => {
        await this.downloadTemplateAsset({ relativePath: args[0] });
      },
      // Native: save file to app's internal cache on device and open it externally to the app
      // (file is not permanently saved and is not accessible through external storage);
      // Web: open file in new tab, or download if not viewable in browser
      open_external: async ({ args }) => {
        await this.openTemplateAsset(args[0]);
      },
    });
  }

  /**
   * Save an asset file to device storage, to be accessible to the user.
   * On native devices, save file to native storage and optionally trigger prompt to open with native apps.
   * On web, prompt standard browser download.
   * @param options.relativePath The relative path to an asset, in standard authoring syntax
   * @param options.open If true, then the file will be opened after download on native devices. Default: true
   */
  private async downloadTemplateAsset(options: {
    relativePath: string;
    open?: boolean;
    directory?: keyof typeof Directory;
    subdirectory?: string;
  }) {
    const {
      relativePath,
      open = true,
      // To save to user's general Download folder, requires saving to to the "ExternalStorage" directory, with subdirectory "Download".
      //However this requires additional permissions on Android versions <= 10, which are considered "dangerous"
      directory = "Documents",
      subdirectory,
    } = options;
    await this.templateAssetService.ready();
    const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
    try {
      if (Capacitor.isNativePlatform()) {
        const { localFilepath } = await this.saveFile({
          data: blob,
          targetPath: relativePath,
          directory,
          subdirectory,
        });
        if (open) FileOpener.open({ filePath: localFilepath, openWithDefault: false });
      } else {
        const filename = relativePath.split("/").pop();
        saveAs(blob, filename);
      }
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  /**
   * Open an asset file externally.
   * On native devices, download the file to external storage and prompt to open with native apps.
   * On web, open the asset file in a new browser tab (or prompt download if non-viewable)
   * @param relativePath
   */
  private async openTemplateAsset(relativePath: string) {
    if (Capacitor.isNativePlatform()) {
      // Save to "Cache" directory, which may be deleted in cases of low memory. See https://capacitorjs.com/docs/apis/filesystem#directory
      this.downloadTemplateAsset({
        relativePath,
        open: true,
        directory: "Cache",
        subdirectory: "",
      });
    } else {
      await this.templateAssetService.ready();
      const fileUrl = this.templateAssetService.getTranslatedAssetPath(relativePath);
      window.open(fileUrl, "_blank");
    }
  }

  /**
   * Save a file to the local filesystem (native only), for internal use by the app.
   * @param options.directory the name of the directory in which to save the file.
   * E.g. the permenent "Data" directory (default) or the temporary "Cache" (see https://capacitorjs.com/docs/apis/filesystem#directory)
   * @param options.subdirectory Additional folder path to be added between "directory" and target path. The app deployment name is always added.
   * @returns the local filesystem path to the saved file, in both "file://*" format and usable src format
   */
  public async saveFile(options: {
    data: Blob;
    targetPath: string;
    directory?: keyof typeof Directory;
    subdirectory?: string;
  }) {
    const { data, targetPath, directory = "Data", subdirectory = "" } = options;
    const path = (subdirectory ? subdirectory + "/" : "") + `${this.cacheName}/${targetPath}`;
    // Docs for write_blob are here: https://github.com/diachedelic/capacitor-blob-writer#readme
    const localFilepath = await write_blob({
      directory: Directory[directory],
      path,
      blob: data,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    return { localFilepath, src: Capacitor.convertFileSrc(localFilepath) };
  }

  /** Delete a file from the local filesystem (native only) */
  public async deleteFile(localFilepath: string) {
    return await Filesystem.deleteFile({ path: localFilepath });
  }

  /**
   * @returns a URL to access the file (not currently used)
   * Adapted from https://www.npmjs.com/package/capacitor-blob-writer
   */
  private async getLocalUrl(relativePath: string) {
    // How the URI is obtained depends on the platform
    if (Capacitor.isNativePlatform()) {
      const { uri } = await Filesystem.getUri({
        path: `${this.cacheName}/${relativePath}`,
        directory: Directory.Data,
      });
      return Capacitor.convertFileSrc(uri);
    }
    // On web, return a URL from which to read the file
    else {
      const { data } = await Filesystem.readFile({
        path: `${this.cacheName}/${relativePath}`,
        directory: Directory.Data,
      });
      return URL.createObjectURL(new Blob([data]));
    }
  }

  public async getLocalFilepath(relativePath: string) {
    const { uri } = await Filesystem.stat({
      path: `${this.cacheName}/${relativePath}`,
      directory: Directory.Data,
    });
    const filePath = Capacitor.convertFileSrc(uri);
    return filePath;
  }
}
