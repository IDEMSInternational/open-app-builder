import { emptyDirSync, existsSync, readdirSync, readJsonSync, rmdirSync, statSync } from "fs-extra";
import path from "path";
import { JsonFileCache } from "./jsonFile";

import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
const testCacheDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data", "cache", "spec");

const testData = {
  jsonEntry: {
    input: { nested: { json: true } },
    expectedName: "8c7f67b9692991973e0b6a5ff8a8cf07",
    customName: "jsonEntry",
  },
};

let cache: JsonFileCache;

describe("Json File Cache", () => {
  beforeAll(() => {
    // Clear previous folders
    if (existsSync(testCacheDir)) {
      emptyDirSync(testCacheDir);
      rmdirSync(testCacheDir);
    }
    // Initialise cache
    cache = new JsonFileCache(testCacheDir, 1);
    cache.clear();
  });
  afterAll(() => {
    cache.clear();
  });
  it("Creates cache folder", () => {
    expect(existsSync(cache.folderPath)).toEqual(true);
  });
  it("Populates cache contents", () => {
    const { contentsPath } = cache;
    expect(existsSync(contentsPath)).toEqual(true);
  });
  it("Versions cache contents", () => {
    const { contentsPath } = cache;
    expect(readJsonSync(contentsPath)._version).toEqual(cache.version);
  });
  it("Generates md5 cache entry name from json", () => {
    const name = cache.generateCacheEntryName(testData.jsonEntry.input);
    expect(name).toEqual(testData.jsonEntry.expectedName);
  });
  it("Generates md5 cache entry name from string", () => {
    const name = cache.generateCacheEntryName("hello");
    expect(name).toEqual("5d41402abc4b2a76b9719d911017c592");
  });
  it("Throws error on invalid cache name", () => {
    expect(() => cache.generateCacheEntryName(undefined)).toThrowError(
      "Invalid cache entry name: undefined"
    );
  });
  it("Creates unnamed entry", () => {
    const { input, expectedName } = testData.jsonEntry;
    cache.add(input);
    expect(cache.get(expectedName)).toEqual(input);
  });
  it("Creates named entry", () => {
    const { input, customName } = testData.jsonEntry;
    cache.add(input, customName);
    expect(cache.get(customName)).toEqual(input);
  });
  it("Writes cache files to disk", () => {
    const cachedFile = path.resolve(cache.folderPath, testData.jsonEntry.expectedName);
    expect(existsSync(cachedFile)).toEqual(true);
  });
  it("Populates cache file with custom timestamp", () => {
    const timestamp = new Date("2000-01-01");
    const { filePath } = cache.add(testData.jsonEntry, "with_stats", { mtime: timestamp });
    const { mtime } = statSync(filePath);
    expect(new Date(mtime).getTime()).toEqual(timestamp.getTime());
  });

  it("Gets cached entry", () => {
    const newCache = new JsonFileCache(testCacheDir, 1);
    const cachedEntry = newCache.get(testData.jsonEntry.expectedName);
    expect(cachedEntry).toEqual(testData.jsonEntry.input);
  });

  it("Returns undefined on missing entry", () => {
    const newCache = new JsonFileCache(testCacheDir, 1);
    const cachedEntry = newCache.get("missing_data");
    expect(cachedEntry).toBeUndefined();
  });
  it("Removes entry", () => {
    // Add entry
    const data = Math.random();
    const { entryName, filePath } = cache.add(data);
    expect(existsSync(filePath)).toBeTrue();
    expect(cache.get(entryName)).toEqual(data);
    // Remove entry
    cache.remove(entryName);
    expect(existsSync(filePath)).toBeFalse();
    expect(cache.get(entryName)).toBeUndefined();
  });

  it("Invalidates cache on version update", () => {
    expect(readdirSync(cache.folderPath).length).toBeGreaterThan(1);
    const updatedCache = new JsonFileCache(testCacheDir, 2);
    expect(readdirSync(cache.folderPath).length).toEqual(1);
  });
});
