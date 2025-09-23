import { debounceTime, Subject } from "rxjs";
import { IHttpCacheAdapter } from "./adapters/types";

type ICacheManifest = { [key: string]: ICacheManifestEntry };

export interface ICacheManifestEntry {
  /** SHA-256 hash of content body */
  contentSha256: string;
  /** Response content type */
  contentType: string;
  /** Epoch timestamp of date created */
  created: number;
  /** Epoch timestamp of TTL auto-expiry */
  expiry?: number;
  /** Original filename if response returns file */
  filename?: string;
  /** HTTP status headers */
  headers: Record<string, string>;
  /** Body response size */
  size: number;
  /** HTTP status code */
  status: number;
  /** Foreign key used to identify object in persisted storage layer */
  storageKey: string;
}

/**
 * The HTTP Cache Manifest is used to store response metadata from http requests
 * It can be used to recreate a HTTP Response for a request url, using a body
 * persisted to Layer-2 storage solution (e.g. disk on native, OPFS in browser)
 */
export class HttpCacheManifest {
  /** Internal manifest stores as plain json object */
  private manifest: ICacheManifest = {};

  /** Track manifest changes in order to debounce persist  */
  private changes$ = new Subject<void>();

  constructor(private l2: IHttpCacheAdapter) {}

  public async initialise() {
    await this.loadSavedManifest();
    await this.validateManifest();
    this.persistManifestChanges();
  }

  public async set(key: string, entry: ICacheManifestEntry) {
    this.manifest[key] = entry;
    this.changes$.next();
  }

  public async get(key: string) {
    return this.manifest[key];
  }

  public async delete(key: string) {
    delete this.manifest[key];
    this.changes$.next();
  }

  /** Load previously persisted manifest from layer-2 */
  private async loadSavedManifest() {
    const persistedCache = await this.l2.get("cache-manifest");
    if (persistedCache) {
      const text = await persistedCache.text();
      this.manifest = JSON.parse(text);
    }
  }

  /** Store current manifest to layer-2 on change */
  private persistManifestChanges() {
    // debounce writes in case of heavy I/O
    this.changes$.pipe(debounceTime(1000)).subscribe(async () => {
      const manifestBlob = new Blob([JSON.stringify(this.manifest)], { type: "application/json" });
      await this.l2.set("cache-manifest", manifestBlob);
    });
  }

  private async validateManifest() {
    const entries = await this.l2.list();
    // TODO - check entries against manifest
  }
}
