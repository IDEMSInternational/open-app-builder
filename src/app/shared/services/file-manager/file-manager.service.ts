import { Injectable } from "@angular/core";
import { Directory } from "@capacitor/filesystem";
import write_blob from "capacitor-blob-writer";

@Injectable({
  providedIn: "root",
})
// TODO: Refactor to use sync/asyncService base. Methods could also be moved to remote-asset service
export class FileManagerService {
  constructor() {}

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
  }
}
