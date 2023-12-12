import { Injectable } from "@angular/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { saveAs } from "file-saver";
import { SyncServiceBase } from "../syncService.base";
import { environment } from "src/environments/environment";
import { IAssetContents } from "src/app/data";
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
      download: async ({ args }) => {
        await this.downloadTemplateAsset(args[0]);
        // await this.openTemplateAsset(args[0])
      },
      // Above should download file on both native and web
      // Below should download and open on native, and just open in new tab on web
      // open_external
    });
  }

  /**
   * Download an asset file.
   * On native devices, download file to native storage and optionally trigger prompt to open with native apps.
   * On web, prompt standard browser download.
   * @param relativePath The relative path to an asset, in standard authoring syntax
   * @param [open=true] On native devices, open the file after download. Default: true
   */
  private async downloadTemplateAsset(relativePath: string, open: boolean = true) {
    await this.templateAssetService.ready();
    const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
    try {
      if (Capacitor.isNativePlatform()) {
        const targetPath = "Download/" + relativePath;
        const { localFilepath } = await this.saveFile({
          data: blob,
          targetPath,
          isAbsolutePath: true,
          directory: "ExternalStorage",
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
      this.downloadTemplateAsset(relativePath, true);
    } else {
      const fileUrl = this.templateAssetService.getTranslatedAssetPath(relativePath);
      window.open(fileUrl, "_blank");
    }
  }

  /**
   * Save a file to the local filesystem (native only),
   * @param options.directory the name of the directory in which to save the file.
   * E.g. the permenent "Data" directory (default) or the temporary "Cache" (see https://capacitorjs.com/docs/apis/filesystem#directory)
   * @param options.isAbsolutePath Ignore deployment-specific cacheName folder when saving
   * @returns the local filesystem path to the saved file, in both "file://*" format and usable src format
   */
  async saveFile(options: {
    data: Blob;
    targetPath: string;
    isAbsolutePath?: boolean;
    directory?: keyof typeof Directory;
  }) {
    const { data, targetPath, isAbsolutePath = false, directory = "Data" } = options;
    // Docs for write_blob are here: https://github.com/diachedelic/capacitor-blob-writer#readme
    const localFilepath = await write_blob({
      directory: Directory[directory],
      path: isAbsolutePath ? targetPath : `${this.cacheName}/${targetPath}`,
      blob: data,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    return { localFilepath, src: Capacitor.convertFileSrc(localFilepath) };
  }

  public async deleteFile(localFilepath: string) {
    return await Filesystem.deleteFile({ path: localFilepath });
  }

  /**
   * @returns a URL to access the file (not currently used)
   * Adapted from https://www.npmjs.com/package/capacitor-blob-writer
   */
  async getLocalUrl(relativePath: string) {
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

  /**
   * WIP: method to save list of cached assets to file. May not be needed if we utilize rxdb/dynamicDataService
   */
  async writeCacheListToFile(cachedFilesList: IAssetContents) {
    return await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${this.cacheName}/cachedFiles.json`,
      data: JSON.stringify(cachedFilesList),
      recursive: true,
      encoding: Encoding.UTF8,
    });
  }

  async getLocalFilepath(relativePath: string) {
    const { uri } = await Filesystem.stat({
      path: `${this.cacheName}/${relativePath}`,
      directory: Directory.Data,
    });
    const filePath = Capacitor.convertFileSrc(uri);
    return filePath;
  }
}
