import { filterAppAssets } from "./asset-filters";
import type { IDeploymentConfigJson } from "data-models";
import type { IContentsEntry } from "shared";

const mockFileEntry: IContentsEntry = {
  size_kb: 100,
  md5Checksum: "mock",
  relativePath: "mock",
  modifiedTime: "2023-01-01T00:00:00.000Z",
};

function createMockAssets(paths: string[]) {
  const assets: { [relativePath: string]: IContentsEntry } = {};
  paths.forEach((p) => {
    assets[p] = { ...mockFileEntry, relativePath: p };
  });
  return assets;
}

/** yarn workspace scripts test -t asset-filters.spec.ts */
describe("filterAppAssets", () => {
  it("Filters theme assets", () => {
    const assets = createMockAssets([
      "test.jpg",
      "theme_testTheme/test.jpg",
      "theme_ignored/test.jpg",
    ]);

    const mockConfig = {
      app_data: {},
      translations: {},
      app_config: {
        APP_THEMES: { available: ["testTheme"] },
      },
    } as unknown as IDeploymentConfigJson;

    const result = filterAppAssets(assets, mockConfig);
    const resultPaths = Object.keys(result).sort();

    expect(resultPaths).toEqual(["test.jpg", "theme_testTheme/test.jpg"]);
  });

  it("Includes all language assets by default", () => {
    const assets = createMockAssets(["test.jpg", "tz_sw/test.jpg", "ke_sw/test.jpg"]);

    const mockConfig = {
      app_data: {},
      translations: { filter_language_codes: undefined },
      app_config: {},
    } as unknown as IDeploymentConfigJson;

    const result = filterAppAssets(assets, mockConfig);
    const resultPaths = Object.keys(result).sort();

    expect(resultPaths).toEqual(["ke_sw/test.jpg", "test.jpg", "tz_sw/test.jpg"]);
  });

  it("Filters language assets", () => {
    const assets = createMockAssets(["test.jpg", "tz_sw/test.jpg", "ke_sw/test.jpg"]);

    const mockConfig = {
      app_data: {},
      translations: { filter_language_codes: ["tz_sw"] },
      app_config: {},
    } as unknown as IDeploymentConfigJson;

    const result = filterAppAssets(assets, mockConfig);
    const resultPaths = Object.keys(result).sort();

    expect(resultPaths).toEqual(["test.jpg", "tz_sw/test.jpg"]);
  });

  it("Filters using assets_filter_function", () => {
    const assets = createMockAssets(["keep.jpg", "ignore.jpg"]);

    const mockConfig = {
      app_data: {
        assets_filter_function: (entry: IContentsEntry) => entry.relativePath.startsWith("keep"),
      },
      translations: {},
      app_config: {},
    } as unknown as IDeploymentConfigJson;

    const result = filterAppAssets(assets, mockConfig);
    const resultPaths = Object.keys(result).sort();

    expect(resultPaths).toEqual(["keep.jpg"]);
  });

  it("Removes _contents.json and _metadata.json", () => {
    const assets = createMockAssets(["test.jpg", "_contents.json", "_metadata.json"]);

    const mockConfig = {
      app_data: {},
      translations: {},
      app_config: {},
    } as unknown as IDeploymentConfigJson;

    const result = filterAppAssets(assets, mockConfig);
    const resultPaths = Object.keys(result).sort();

    expect(resultPaths).toEqual(["test.jpg"]);
  });
});
