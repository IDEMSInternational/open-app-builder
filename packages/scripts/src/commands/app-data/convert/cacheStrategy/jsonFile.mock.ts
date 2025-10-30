import { TimeLike } from "fs";
import { JsonFileCache } from "./jsonFile";
import type { IContentsEntry } from "shared";

interface IContentsEntryWithValue extends IContentsEntry {
  value?: any;
}

/**
 * Mock implementation of JsonFileCache that only uses in-memory caching
 * instead of persisting files to disk
 */
export class MockJsonFileCache extends JsonFileCache {
  private mockContents: Record<string, IContentsEntryWithValue> = {};

  constructor() {
    super("");
    this.configure("mockJson", 0);
  }

  public configure(cacheFolderName: string, version: number) {
    this.version = version;
  }

  public add(data: any, entryName?: string, stats?: { mtime: TimeLike }) {
    if (data) {
      if (!entryName) {
        entryName = this.generateCacheEntryName(data);
      }
      if (!this.mockContents[entryName]) {
        this.mockContents[entryName] = {} as any;
      }
      this.mockContents[entryName].value = data;
      return { filePath: entryName, entryName, data };
    }
  }

  public clear() {
    this.mockContents = {};
  }

  public remove(entryName: string) {
    if (this.mockContents.hasOwnProperty(entryName)) {
      delete this.mockContents[entryName];
    }
  }

  public get<T = any>(entryName: string) {
    return this.mockContents[entryName] as T;
  }
}
