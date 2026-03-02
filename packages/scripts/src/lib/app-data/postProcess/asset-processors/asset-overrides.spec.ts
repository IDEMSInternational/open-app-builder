import { handleAssetOverrides } from "./asset-overrides";
import { Logger } from "shared";
import type { IContentsEntry, IContentsEntryHashmap } from "shared";

// Mock Logger
jest.mock("shared", () => {
  const actual = jest.requireActual("shared");
  return {
    ...actual,
    Logger: {
      error: jest.fn(),
    },
  };
});

const mockFileEntry: IContentsEntry = {
  size_kb: 100,
  md5Checksum: "mock",
  relativePath: "mock",
  modifiedTime: "2023-01-01T00:00:00.000Z",
};

const mockAssetEntryMinimal = {
  size_kb: 100,
  md5Checksum: "mock",
};

function createMockAssets(paths: Record<string, Partial<IContentsEntry>>) {
  const assets: IContentsEntryHashmap = {};
  Object.entries(paths).forEach(([path, data]) => {
    assets[path] = { ...mockFileEntry, relativePath: path, ...data };
  });
  return assets;
}

/** yarn workspace scripts test -t asset-overrides.spec.ts */
describe("handleAssetOverrides", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Populates assets with no overrides", () => {
    const assets = createMockAssets({ "test.jpg": {} });
    const { tracked } = handleAssetOverrides(assets);
    const assetEntry = tracked["test.jpg"];
    expect(assetEntry.overrides).toBeUndefined();
    expect(assetEntry).toEqual(mockAssetEntryMinimal);
  });

  it("Populates global assets from named or root folder", () => {
    const assets = createMockAssets({
      "global/test1.jpg": {},
      "nested/test2.jpg": {},
      "test3.jpg": {},
    });
    const { tracked } = handleAssetOverrides(assets);

    expect(tracked).toEqual({
      "nested/test2.jpg": mockAssetEntryMinimal,
      "test1.jpg": { ...mockAssetEntryMinimal, filePath: "global/test1.jpg" },
      "test3.jpg": mockAssetEntryMinimal,
    });
  });

  it("Populates translation override with default theme", () => {
    const assets = createMockAssets({
      "test.jpg": {},
      "tz_sw/test.jpg": {},
    });
    const { tracked } = handleAssetOverrides(assets);
    const assetEntry = tracked["test.jpg"];
    expect(assetEntry.overrides?.["theme_default"]).toEqual({
      tz_sw: { ...mockAssetEntryMinimal, filePath: "tz_sw/test.jpg" },
    });
  });

  it("Populates theme override with global translation", () => {
    const assets = createMockAssets({
      "test.jpg": {},
      "theme_test/test.jpg": {},
    });
    const { tracked } = handleAssetOverrides(assets);
    const assetEntry = tracked["test.jpg"];
    expect(assetEntry.overrides).toEqual({
      theme_test: { global: { ...mockAssetEntryMinimal, filePath: "theme_test/test.jpg" } },
    });
  });

  it("Populates combined theme and language overrides", () => {
    const assets = createMockAssets({
      "test1.jpg": {},
      "theme_test/tz_sw/test1.jpg": {},
      "test2.jpg": {},
      "tz_sw/theme_test/test2.jpg": {},
    });

    const { tracked } = handleAssetOverrides(assets);

    expect(tracked["test1.jpg"].overrides).toEqual({
      theme_test: {
        tz_sw: { ...mockAssetEntryMinimal, filePath: "theme_test/tz_sw/test1.jpg" },
      },
    });

    expect(tracked["test2.jpg"].overrides).toEqual({
      theme_test: {
        tz_sw: { ...mockAssetEntryMinimal, filePath: "tz_sw/theme_test/test2.jpg" },
      },
    });
  });

  it("Supports nested lang and theme folders", () => {
    const assets = createMockAssets({
      "nested/test.jpg": {},
      "nested/tz_sw/test.jpg": {},
      "nested/theme_test/tz_sw/test.jpg": {},
    });

    const { tracked } = handleAssetOverrides(assets);
    const assetEntry = tracked["nested/test.jpg"];

    expect(assetEntry.overrides).toEqual({
      theme_default: {
        tz_sw: { ...mockAssetEntryMinimal, filePath: "nested/tz_sw/test.jpg" },
      },
      theme_test: {
        tz_sw: { ...mockAssetEntryMinimal, filePath: "nested/theme_test/tz_sw/test.jpg" },
      },
    });
  });

  it("Moves untracked assets (overrides without main entry)", () => {
    const assets = createMockAssets({
      "tz_sw/untracked.jpg": {},
    });
    const { tracked, untracked } = handleAssetOverrides(assets);

    expect(tracked["untracked.jpg"]).toBeUndefined();
    expect(untracked["untracked.jpg"]).toBeDefined();
    expect(untracked["untracked.jpg"].overrides?.["theme_default"]["tz_sw"]).toBeDefined();
  });

  it("Logs error on duplicate overrides", () => {
    const assets = createMockAssets({
      "test.jpg": {},
      "theme_test/tz_sw/test.jpg": {},
      "tz_sw/theme_test/test.jpg": {},
    });

    handleAssetOverrides(assets);

    expect(Logger.error).toHaveBeenCalledWith({
      msg1: "Duplicate overrides detected",
      msg2: "test.jpg [theme_test] [tz_sw]",
      logOnly: true,
    });
  });
});
