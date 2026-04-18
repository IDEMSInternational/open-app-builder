export interface IHttpCacheAdapter {
  list: () => Promise<string[]>;
  get: (key: string) => Promise<Blob | undefined>;
  /** Retrieving URL should provide both src and means to revoke in case created as object url */
  getUrl: (key: string) => Promise<{ src: string; revoke: () => void } | undefined>;
  set: (key: string, data: Blob) => Promise<any>;
  has: (key: string) => Promise<boolean>;
  clear: () => Promise<void>;
  delete: (key: string) => Promise<boolean>;
}
