import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import blobWriter from "capacitor-blob-writer";
import { IHttpCacheAdapter } from "./types";

/**
 * Capacitor Filesystem adapter for Blob responses.
 * Uses Directory.Cache for persistent storage.
 * Optimized to bypass Base64 bridge for reads.
 */
export class HttpCacheAdapterFile implements IHttpCacheAdapter {
  private fs: typeof Filesystem;

  constructor(
    private folder: string = "http-cache",
    fs?: typeof Filesystem
  ) {
    this.fs = fs || Filesystem;
  }

  private async ensureFolder() {
    try {
      await this.fs.mkdir({
        path: this.folder,
        directory: Directory.Cache,
        recursive: true,
      });
    } catch (mkdirError: unknown) {
      // Check if it failed because it already exists
      // Avoid checking error message as this is platform-dependent
      try {
        const stat = await this.fs.stat({
          path: this.folder,
          directory: Directory.Cache,
        });
        if (stat.type !== "directory") {
          throw mkdirError;
        }
      } catch {
        // stat also failed — directory genuinely doesn't exist
        throw mkdirError;
      }
    }
  }

  public async list() {
    await this.ensureFolder();
    const result = await this.fs.readdir({
      path: this.folder,
      directory: Directory.Cache,
    });
    return result.files.map((f) => f.name);
  }

  public async has(key: string) {
    try {
      await this.fs.stat({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });
      return true;
    } catch {
      return false;
    }
  }

  public async get(key: string): Promise<Blob | undefined> {
    try {
      const webViewUrl = await this.getUrl(key);
      if (!webViewUrl) return undefined;
      const response = await fetch(webViewUrl);
      return await response.blob();
    } catch (e) {
      return undefined;
    }
  }

  public async getUrl(key: string): Promise<string | undefined> {
    try {
      const { uri } = await this.fs.getUri({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });
      return Capacitor.convertFileSrc(uri);
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
      await this.fs.deleteFile({
        path: `${this.folder}/${key}`,
        directory: Directory.Cache,
      });
      return true;
    } catch {
      return false;
    }
  }
}
