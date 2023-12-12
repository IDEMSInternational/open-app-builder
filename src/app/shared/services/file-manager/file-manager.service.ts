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
        await this.downloadAndOpenTemplateAsset(args[0]);
      },
    });
  }

  private async downloadAndOpenTemplateAsset(relativePath: string) {
    await this.templateAssetService.ready();
    const blob = (await this.templateAssetService.fetchAsset(relativePath, "blob")) as Blob;
    try {
      // On native devices, download file to native storage and trigger prompt to open with native apps
      if (Capacitor.isNativePlatform()) {
        const { localFilepath } = await this.saveFile(blob, relativePath);
        FileOpener.open({ filePath: localFilepath, openWithDefault: false });
      }
      // On web, prompt standard browser download
      else {
        const filename = relativePath.split("/").pop();
        saveAs(blob, filename);
      }
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  /**
   * Save a file to the local filesystem (native only),
   * @param directory the name of the directory in which to save the file.
   * E.g. the permenent "Data" directory (default) or the temporary "Cache" (see https://capacitorjs.com/docs/apis/filesystem#directory)
   * @returns the local filesystem path to the saved file, in both "file://*" format and usable src format
   */
  async saveFile(blob: Blob, relativePath: string, directory: keyof typeof Directory = "Data") {
    // Docs for write_blob are here: https://github.com/diachedelic/capacitor-blob-writer#readme
    const localFilepath = await write_blob({
      directory: Directory[directory],
      path: `${this.cacheName}/${relativePath}`,
      blob,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    return { localFilepath, src: Capacitor.convertFileSrc(localFilepath) };
  }

  public async deleteFile(localFilepath: string) {
    console.log("hellp");
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
