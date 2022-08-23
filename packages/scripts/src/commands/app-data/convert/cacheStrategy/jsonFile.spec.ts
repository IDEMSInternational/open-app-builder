import { emptyDirSync, existsSync, readdirSync, readJsonSync, rmdirSync } from "fs-extra";
import path from "path";
import { JsonFileCache } from "./jsonFile";

import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
const testCacheDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data", "cache");

// Clear previous folders
if (existsSync(testCacheDir)) {
  emptyDirSync(testCacheDir);
  rmdirSync(testCacheDir);
}

const testData = {
  jsonEntry: {
    input: { nested: { json: true } },
    expectedName: "8c7f67b9692991973e0b6a5ff8a8cf07",
    customName: "jsonEntry",
  },
};

const cache = new JsonFileCache(testCacheDir, 1);

describe("Json File Cache", () => {
  it("Creates cache folder", () => {
    expect(existsSync(cache.folderPath)).toEqual(true);
  });
  it("Populates cache contents", () => {
    cache.save();
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
    expect(cache.info[expectedName]).toEqual(input);
  });
  it("Creates named entry", () => {
    const { input, customName } = testData.jsonEntry;
    cache.add(input, customName);
    expect(cache.get(customName)).toEqual(input);
  });
  it("Writes cache files to disk", () => {
    cache.save();
    const cachedFile = path.resolve(cache.folderPath, testData.jsonEntry.expectedName);
    expect(existsSync(cachedFile)).toEqual(true);
  });
  it("Gets cached entry", () => {
    const newCache = new JsonFileCache(testCacheDir, 1);
    const cachedEntry = newCache.get(testData.jsonEntry.expectedName);
    expect(cachedEntry).toEqual(testData.jsonEntry.input);
  });

  it("Invalidates cache on version update", () => {
    expect(readdirSync(cache.folderPath).length).toBeGreaterThan(0);
    const updatedCache = new JsonFileCache(testCacheDir, 2);
    expect(readdirSync(cache.folderPath).length).toEqual(0);
  });
});
