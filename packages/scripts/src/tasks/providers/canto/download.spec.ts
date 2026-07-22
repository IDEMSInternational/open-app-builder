jest.mock("../../../commands/workflow/run", () => ({
  WorkflowRunner: { config: {} },
}));

jest.mock("node-fetch");
jest.mock("fs-extra", () => ({
  outputFile: jest.fn().mockResolvedValue(undefined),
}));

import fetch from "node-fetch";
import * as fs from "fs-extra";
import { downloadFile, isRetryableDownloadError } from "./download";
import type { CantoDownloadedFolder, CantoManifestEntry } from "./types";

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
const mockOutputFile = fs.outputFile as jest.MockedFunction<typeof fs.outputFile>;

const createFile = (
  overrides: Partial<CantoManifestEntry> & Pick<CantoManifestEntry, "name"> = { name: "asset.svg" }
): CantoManifestEntry => ({
  id: "file-id",
  scheme: "image",
  url: { directUrlOriginal: "https://cdn.example.com/asset.svg" },
  relatedAlbums: [
    {
      id: "album-id",
      idPath: "root/source-folder-id/theme_default",
      namePath: "Root/Source Folder/theme_default",
      name: "theme_default",
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
