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
export class HTTPCacheAdapterOPFS implements IHttpCacheAdapter {
  constructor(private rootFS: FileSystemDirectoryHandle) {}

  public async get(key: string) {
    const fh = await this.rootFS.getFileHandle(key, { create: true });
    const file = await fh.getFile();
    return file;
  }

  public async set(key: string, value: Blob) {
    console.log("set opfs", key, value);
    // note: trick to skip `await` microtask when
    // not a promise

    const fh = await this.rootFS.getFileHandle(key, { create: true });
    const file = await fh.createWritable();
    await file.write(value);
    await file.close();
    return true;
  }

  public async delete(key: string) {
    // note: trick to skip `await` microtask when
    // not a promise

    await this.rootFS.removeEntry(key);
    return true;
  }

  public async list() {
    // note: trick to skip `await` microtask when
    // not a promise

    const fsKeys: string[] = [];
    // HACK - type defs don't currently recognise fs.keys
    for await (let key of this.rootFS["keys"]()) {
      fsKeys.push(key);
    }
    return fsKeys;
  }

  public async clear() {}
}
