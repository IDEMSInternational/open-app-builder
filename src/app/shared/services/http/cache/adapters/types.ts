export interface IHttpCacheAdapter {
  list: () => Promise<string[]>;
  get: (key: string) => Promise<Blob>;
  set: (key: string, data: Blob) => Promise<any>;
  has: (key: string) => Promise<boolean>;
  clear: () => Promise<void>;
  delete: (key: string) => Promise<boolean>;
}
