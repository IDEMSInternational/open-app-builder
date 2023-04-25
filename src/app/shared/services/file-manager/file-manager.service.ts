import { Injectable } from "@angular/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { SyncServiceBase } from "../syncService.base";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";

@Injectable({
  providedIn: "root",
})
export class FileManagerService extends SyncServiceBase {
  constructor(private templateAssetService: TemplateAssetService) {
    super("FileManager");
  }

  async saveFile(blob: Blob, relativePath) {
    // Docs for write_blob are found here: https://github.com/diachedelic/capacitor-blob-writer#readme
    console.log(relativePath);
    const src = await write_blob({
      path: relativePath,
      directory: Directory.Data,
      blob,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    console.log("src:", src);
    const uri = await this.getFileSrc(relativePath);
    console.log("uri:", uri);
    return uri;
  }

  /**
   * A possible approach for getting the path to a file
   * @returns the URL to access the file
   * Adapted from https://www.npmjs.com/package/capacitor-blob-writer
   * */
  async getFileSrc(relativePath) {
    // How the URI is obtained depends on the platform
    if (Capacitor.isNativePlatform()) {
      const { uri } = await Filesystem.getUri({
        path: relativePath,
        directory: Directory.Data,
      });
      console.log("Filesystem.uri:", uri);
      return Capacitor.convertFileSrc(uri);
    } else {
      const { data } = await Filesystem.readFile({
        path: relativePath,
        directory: Directory.Data,
      });
      return URL.createObjectURL(new Blob([data]));
    }
  }

  /** Update assets contents list to include new filepath for lookup (by template-asset service) */
  async updateContentsList(assetName, uri: string, metadata?) {
    // TODO
    // Options:
    // 1. Store contents list in memory (shared with template-asset service) and update this
    // 2. Save to file, contents.json (ensure template-asset service uses up-to-date version)
    // 3. Use localstorage
    console.log("[REMOTE ASSETS] uri:", uri);
    if (Capacitor.isNativePlatform()) {
      this.templateAssetService.assetsContentList[assetName].downloadedFilepath = uri;
    } else {
      this.templateAssetService.assetsContentList[assetName].url = uri;
    }
    console.log(this.templateAssetService.assetsContentList[assetName]);
  }
}
