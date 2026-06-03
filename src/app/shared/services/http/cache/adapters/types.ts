export interface IHttpCacheAdapter {
  list: () => Promise<string[]>;
  get: (key: string) => Promise<Blob | undefined>;
  /** Retrieving URL should provide both src and means to revoke in case created as object url */
  getUrl: (key: string) => Promise<{ src: string; revoke: () => void } | undefined>;
  /** Write using streaming - preferred for large files to avoid buffering in memory */
  setStream: (key: string, data: ReadableStream<Uint8Array>) => Promise<any>;
  /** Write using Blob - fallback for small files or adapters that don't support streaming */
  set: (key: string, data: Blob) => Promise<any>;
  has: (key: string) => Promise<boolean>;
  clear: () => Promise<void>;
  delete: (key: string) => Promise<boolean>;
}
