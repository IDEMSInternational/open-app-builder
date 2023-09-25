import { Injectable } from "@angular/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { SyncServiceBase } from "../syncService.base";
import { environment } from "src/environments/environment";
import { IAssetContents } from "src/app/data";
import { IAssetEntry } from "packages/data-models/deployment.model";

@Injectable({
  providedIn: "root",
})
export class FileManagerService extends SyncServiceBase {
  cacheName: string;

  constructor() {
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
