import { Injectable } from "@angular/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { SyncServiceBase } from "../syncService.base";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { environment } from "src/environments/environment";
import { IAssetContents } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class FileManagerService extends SyncServiceBase {
  cacheName: string;

  constructor(private templateAssetService: TemplateAssetService) {
    super("FileManager");
    this.initialise();
  }

  private initialise() {
    this.cacheName = environment.deploymentConfig.name;
  }

  /**
   * Save a file to the local filesystem (native only)
   * @returns the local filesystem path to the saved file
   */
  async saveFile(blob: Blob, relativePath: string) {
    // Docs for write_blob are here: https://github.com/diachedelic/capacitor-blob-writer#readme
    const src = await write_blob({
      directory: Directory.Data,
      path: `${this.cacheName}/${relativePath}`,
      blob,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    return Capacitor.convertFileSrc(src);
  }

  /** Update the template-asset service's assets contents list to include new filepath for lookup */
  async updateContentsList(
    assetName: string,
    updates: { filesystemPath?: string; url?: string; metadata?: any }
  ) {
    const { filesystemPath, url } = updates;
    if (filesystemPath) {
      this.templateAssetService.assetsContentList[assetName].downloadedFilepath = filesystemPath;
    }
    if (url) {
      this.templateAssetService.assetsContentList[assetName].url = url;
    }
    console.log(
      "[File manager] updated asset entry:",
      this.templateAssetService.assetsContentList[assetName]
    );
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
   * WIP: method to save list of cached assets to file. This file is to be used at least by remote-asset service
   * to compare cached files to those required by deployment to generate manifest of those to be downlaoded
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
}
