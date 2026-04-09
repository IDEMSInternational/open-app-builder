import { Filesystem, Directory } from "@capacitor/filesystem";
import blobWriter from "capacitor-blob-writer";
import { IHttpCacheAdapter } from "./types";

/**
 * Capacitor Filesystem adapter for Blob responses.
 * Uses Directory.Cache for persistent storage.
 */
export class HttpCacheAdapterFile implements IHttpCacheAdapter {
  constructor(private folder: string = "http-cache") {}

  private async ensureFolder() {
    try {
      await Filesystem.mkdir({
        path: this.folder,
        directory: Directory.Cache,
        recursive: true,
      });
    } catch (e) {
      // Folder already exists
    }
  }

  public async list() {
    await this.ensureFolder();
    const result = await Filesystem.readdir({
      path: this.folder,
      directory: Directory.Cache,
    });
    return result.files.map((f) => f.name);
  }

  public async has(key: string) {
    try {
      await Filesystem.stat({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });
      return true;
    } catch {
      return false;
    }
  }

  public async get(key: string) {
    try {
      const result = await Filesystem.readFile({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });

      // Convert base64 to Blob
      const base64Data = result.data as string;
      const response = await fetch(`data:application/octet-stream;base64,${base64Data}`);
      return await response.blob();
    } catch (e) {
      return undefined;
    }
  }

  public async set(key: string, value: Blob) {
    await this.ensureFolder();
    await blobWriter({
      path: `${this.folder}/${key}`,
      blob: value,
      directory: Directory.Cache,
      recursive: true,
    });
    return true;
  }

  public async clear() {
    await this.ensureFolder();
    const files = await this.list();
    for (const file of files) {
      await this.delete(file);
    }
  }

  public async delete(key: string) {
    try {
      await Filesystem.deleteFile({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });
      return true;
    } catch {
      return false;
    }
  }
}
