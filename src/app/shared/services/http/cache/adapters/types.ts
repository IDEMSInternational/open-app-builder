export interface IHttpCacheAdapter {
  list: () => Promise<string[]>;
  get: (key: string) => Promise<Blob | undefined>;
  getUrl?: (key: string) => Promise<string | undefined>;
  set: (key: string, data: Blob) => Promise<any>;
  has: (key: string) => Promise<boolean>;
  clear: () => Promise<void>;
  delete: (key: string) => Promise<boolean>;
}
