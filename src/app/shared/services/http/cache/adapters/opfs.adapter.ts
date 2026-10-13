import { IHttpCacheAdapter } from "./types";

/**
 *
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system
 *
 * Known Limitations
 *
 * - writeable stream on IOS
 * https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write#browser_compatibility
 *
 * - streamed writes
 * https://web.dev/case-studies/kiwix
 * https://github.com/kiwix/kiwix-js-pwa/blob/main/www/js/lib/cache.js#L721
 */
interface FileSystemDirectoryHandleWithKeys extends FileSystemDirectoryHandle {
  keys(): AsyncIterableIterator<string>;
}

export class HTTPCacheAdapterOPFS implements IHttpCacheAdapter {
  constructor(private rootFS: FileSystemDirectoryHandle) {}

  public async has(key: string) {
    try {
      await this.rootFS.getFileHandle(key);
      return true;
    } catch {
      return false;
    }
  }

  public async get(key: string) {
    try {
      const fh = await this.rootFS.getFileHandle(key);
      const file = await fh.getFile();
      return file;
    } catch {
      return undefined;
    }
  }

  public async getUrl(key: string) {
    const fh = await this.rootFS.getFileHandle(key);
    const file = await fh.getFile();
    const src = URL.createObjectURL(file);
    return { src, revoke: () => URL.revokeObjectURL(src) };
  }

  public async setStream(key: string, readable: ReadableStream<Uint8Array>) {
    const fh = await this.rootFS.getFileHandle(key, { create: true });
    const writable = await fh.createWritable();
    await readable.pipeTo(writable);
    return true;
  }

  public async set(key: string, value: Blob) {
    const fh = await this.rootFS.getFileHandle(key, { create: true });
    const file = await fh.createWritable();
    await file.write(value);
    await file.close();
    return true;
  }

  public async delete(key: string) {
    try {
      await this.rootFS.removeEntry(key);
      return true;
    } catch {
      return false;
    }
  }

  public async list() {
    const fsKeys: string[] = [];
    for await (let key of (this.rootFS as FileSystemDirectoryHandleWithKeys).keys()) {
      fsKeys.push(key);
    }
    return fsKeys;
  }

  public async clear() {
    const keys = await this.list();
    for (const key of keys) {
      await this.delete(key);
    }
  }
}
