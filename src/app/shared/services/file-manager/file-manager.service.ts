import { Injectable } from "@angular/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import write_blob from "capacitor-blob-writer";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class FileManagerService extends SyncServiceBase {
  constructor() {
    super("FileManager");
  }

  async saveFile(blob: Blob, fileEntry) {
    // Docs for write_blob are found here: https://github.com/diachedelic/capacitor-blob-writer#readme
    await write_blob({
      path: fileEntry.path,
      directory: Directory.Data,
      blob,
      fast_mode: true,
      recursive: true,
      on_fallback(error) {
        console.error(error);
      },
    });
    const src = await this.getFileSrc(fileEntry);
    console.log("src:", src);
    return src;
  }

  /**
   * A possible approach for getting the path to a file
   * @returns the URL to access the file
   * Adapted from https://www.npmjs.com/package/capacitor-blob-writer
   * */
  async getFileSrc(fileEntry) {
    // How the URI is obtained depends on the platform
    if (Capacitor.isNativePlatform()) {
      const { uri } = await Filesystem.getUri({
        path: fileEntry.path,
        directory: Directory.Data,
      });
      return Capacitor.convertFileSrc(uri);
    } else {
      const { data } = await Filesystem.readFile({
        path: fileEntry.path,
        directory: Directory.Data,
      });
      return URL.createObjectURL(new Blob([data]));
    }
  }

  /* Update assets contents list to include new filepath for lookup (by template-asset service) */
  async updateContentsList(fileEntry, uri: string) {
    // TODO. Should also update metadata
  }
}
