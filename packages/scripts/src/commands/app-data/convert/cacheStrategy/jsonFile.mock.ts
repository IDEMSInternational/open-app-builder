import { TimeLike } from "fs";
import { JsonFileCache } from "./jsonFile";
import { IContentsEntry } from "shared";

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
    super("", 0);
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
