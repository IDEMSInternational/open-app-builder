jest.mock("../../../commands/workflow/run", () => ({
  WorkflowRunner: {
    config: {
      app_config: { APP_LANGUAGES: { default: "za_en" } },
      canto: { languageMappings: { English: "za_en" } },
    },
  },
}));

jest.mock("node-fetch");
jest.mock("fs-extra", () => ({
  outputFile: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../../../utils", () => ({
  cleanupEmptyFolders: jest.fn(),
  generateFolderFlatMap: jest.fn(() => ({})),
  logWarning: jest.fn(),
}));

import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import { generateFolderFlatMap } from "../../../utils";
import { downloadFile, isRetryableDownloadError, prepareSyncActions } from "./download";
import type { CantoDownloadedFolder, CantoManifestEntry } from "./types";

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
const mockOutputFile = fs.outputFile as jest.MockedFunction<typeof fs.outputFile>;
const mockFolderFlatMap = generateFolderFlatMap as jest.MockedFunction<
  typeof generateFolderFlatMap
>;

const createFile = (
  overrides: Partial<CantoManifestEntry> & Pick<CantoManifestEntry, "name"> = { name: "asset.svg" }
): CantoManifestEntry => ({
  id: "file-id",
  scheme: "image",
  url: { directUrlOriginal: "https://cdn.example.com/asset.svg" },
  relatedAlbums: [
    {
      id: "album-id",
      idPath: "root/source-folder-id/images",
      namePath: "Root/Source Folder/images",
      name: "images",
      scheme: "album",
    },
  ],
  ...overrides,
});

const downloadedFolder: CantoDownloadedFolder = {
  path: "/tmp/canto-output",
  folderConfig: { id: "source-folder-id", name: "Test Folder" },
};

const createNetworkError = (code: string) =>
  Object.assign(new Error(`request failed, reason: ${code}`), { code, type: "system" });

const createOkResponse = (body = "file-bytes") =>
  ({
    ok: true,
    status: 200,
    statusText: "OK",
    buffer: jest.fn().mockResolvedValue(Buffer.from(body)),
  }) as any;

const createHttpResponse = (status: number, statusText: string) =>
  ({
    ok: false,
    status,
    statusText,
    buffer: jest.fn(),
  }) as any;

/** yarn workspace scripts test -t download.spec.ts */
describe("Canto download retries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("isRetryableDownloadError", () => {
    it("treats common network codes as retryable", () => {
      expect(isRetryableDownloadError(createNetworkError("ECONNRESET"))).toEqual(true);
      expect(isRetryableDownloadError(createNetworkError("ETIMEDOUT"))).toEqual(true);
    });

    it("treats retryable HTTP statuses as retryable", () => {
      expect(isRetryableDownloadError(Object.assign(new Error("503"), { status: 503 }))).toEqual(
        true
      );
      expect(isRetryableDownloadError(Object.assign(new Error("429"), { status: 429 }))).toEqual(
        true
      );
    });

    it("does not retry non-retryable HTTP statuses", () => {
      expect(isRetryableDownloadError(Object.assign(new Error("403"), { status: 403 }))).toEqual(
        false
      );
      expect(isRetryableDownloadError(Object.assign(new Error("404"), { status: 404 }))).toEqual(
        false
      );
    });
  });

  describe("downloadFile", () => {
    it("succeeds after a transient ECONNRESET on the first attempt", async () => {
      mockFetch
        .mockRejectedValueOnce(createNetworkError("ECONNRESET"))
        .mockResolvedValueOnce(createOkResponse());

      const promise = downloadFile(createFile(), downloadedFolder);
      await jest.runAllTimersAsync();
      await promise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockOutputFile).toHaveBeenCalledTimes(1);
      expect(mockOutputFile).toHaveBeenCalledWith(
        expect.stringContaining("asset.svg"),
        Buffer.from("file-bytes")
      );
    });

    it("retries a retryable 503 HTTP status then succeeds", async () => {
      mockFetch
        .mockResolvedValueOnce(createHttpResponse(503, "Service Unavailable"))
        .mockResolvedValueOnce(createOkResponse());

      const promise = downloadFile(createFile(), downloadedFolder);
      await jest.runAllTimersAsync();
      await promise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockOutputFile).toHaveBeenCalledTimes(1);
      expect(mockOutputFile).toHaveBeenCalledWith(
        expect.stringContaining("asset.svg"),
        Buffer.from("file-bytes")
      );
    });

    it("downloads language variants of an asset to separate paths", async () => {
      mockFetch.mockResolvedValue(createOkResponse());

      await downloadFile(createFile({ name: "asset.svg" }), downloadedFolder);
      await downloadFile(
        createFile({ name: "asset.svg", additional: { Language: ["isiXhosa"] } }),
        downloadedFolder
      );

      const [[defaultPath], [overridePath]] = mockOutputFile.mock.calls;
      expect(defaultPath).toEqual(path.join("/tmp/canto-output", "images", "asset.svg"));
      expect(overridePath).toEqual(path.join("/tmp/canto-output", "za_xh", "images", "asset.svg"));
    });

    it("does not retry a non-retryable 403", async () => {
      mockFetch.mockResolvedValueOnce(createHttpResponse(403, "Forbidden"));

      await expect(downloadFile(createFile(), downloadedFolder)).rejects.toThrow(
        /after 1 attempt\(s\).*403 Forbidden/
      );
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockOutputFile).not.toHaveBeenCalled();
    });

    it("exhausts retries and throws on persistent network failure", async () => {
      mockFetch.mockRejectedValue(createNetworkError("ECONNRESET"));

      const promise = downloadFile(createFile(), downloadedFolder);
      const assertion = expect(promise).rejects.toThrow(/after 4 attempt\(s\).*ECONNRESET/);
      await jest.runAllTimersAsync();
      await assertion;
      expect(mockFetch).toHaveBeenCalledTimes(4);
      expect(mockOutputFile).not.toHaveBeenCalled();
    });
  });
});

/**
 * Sync decisions must be keyed by the same paths that files are written to, as otherwise language
 * variants of an asset are compared against (and overwrite) a single local file
 */
describe("Canto sync actions", () => {
  const defaultFile = createFile({
    id: "id-default",
    name: "asset.svg",
    md5: "md5-default",
    additional: { Language: ["English"] },
  });
  const overrideFile = createFile({
    id: "id-override",
    name: "asset.svg",
    md5: "md5-override",
    additional: { Language: ["isiXhosa"] },
  });

  const createLocalFile = (relativePath: string, md5Checksum: string) =>
    ({ relativePath, md5Checksum, size_kb: 1, modifiedTime: "" }) as any;

  beforeEach(() => jest.clearAllMocks());

  it("compares each language variant against its own local file", () => {
    mockFolderFlatMap.mockReturnValue({
      "images/asset.svg": createLocalFile("images/asset.svg", "md5-default"),
    });

    const actions = prepareSyncActions(
      [defaultFile, overrideFile],
      "/tmp/canto-output",
      "source-folder-id"
    );

    expect(actions.same).toEqual([defaultFile]);
    expect(actions.new).toEqual([overrideFile]);
    expect(actions.updated).toEqual([]);
    expect(actions.deleted).toEqual([]);
  });

  it("re-downloads a variant whose local file holds the wrong content", () => {
    // Reproduces the state left by earlier syncs, where variants shared one local file
    mockFolderFlatMap.mockReturnValue({
      "images/asset.svg": createLocalFile("images/asset.svg", "md5-override"),
    });

    const actions = prepareSyncActions(
      [defaultFile, overrideFile],
      "/tmp/canto-output",
      "source-folder-id"
    );

    expect(actions.updated).toEqual([defaultFile]);
    expect(actions.new).toEqual([overrideFile]);
    expect(actions.same).toEqual([]);
    expect(actions.deleted).toEqual([]);
  });

  it("deletes local files no longer listed in the manifest", () => {
    mockFolderFlatMap.mockReturnValue({
      "images/asset.svg": createLocalFile("images/asset.svg", "md5-default"),
      "images/removed.svg": createLocalFile("images/removed.svg", "md5-removed"),
    });

    const actions = prepareSyncActions([defaultFile], "/tmp/canto-output", "source-folder-id");

    expect(actions.deleted).toEqual([{ relativePath: "images/removed.svg" }]);
    expect(actions.summary).toEqual({ new: 0, updated: 0, same: 1, deleted: 1 });
  });
});
