export interface IHttpCacheAdapter {
  list: () => Promise<string[]>;
  get: (key: string) => Promise<any>;
  set: (key: string, data: any) => Promise<any>;
  clear: () => Promise<void>;
  delete: (key: string) => Promise<boolean>;
}
