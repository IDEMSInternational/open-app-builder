import { zipSync } from "fflate";
import { AssetPackArchiveNotFoundError, streamAssetPackArchive } from "./remote-asset-archive";

const bytes = (length: number, fill = 97) => new Uint8Array(length).fill(fill);

/** Serve bytes as a chunked stream, so the reader loop is genuinely exercised */
function streamingResponse(body: Uint8Array, { chunkSize = 64, status = 200 } = {}) {
  let cancelled = false;
  const response = {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (name: string) => (name === "content-length" ? `${body.length}` : null) },
    body: {
      getReader: () => {
        let offset = 0;
        return {
          read: async () => {
            if (offset >= body.length) return { done: true, value: undefined };
            const value = body.slice(offset, offset + chunkSize);
            offset += chunkSize;
            return { done: false, value };
          },
          cancel: async () => {
            cancelled = true;
          },
        };
      },
    },
  };
  return { response: response as any, wasCancelled: () => cancelled };
}

function collectEntries() {
  const entries = new Map<string, Uint8Array>();
  return {
    entries,
    onEntry: async (entryPath: string, data: Uint8Array) => {
      entries.set(entryPath, data);
    },
  };
}

/**
 * yarn ng test --include src/app/shared/services/remote-asset/remote-asset-archive.spec.ts
 */
describe("streamAssetPackArchive", () => {
  const archive = () =>
    zipSync({
      "images/a.png": [bytes(2048), { level: 0 }],
      "data/b.svg": [bytes(4096, 60), { level: 6 }],
      "images/c.png": [bytes(1024), { level: 0 }],
    });

  it("extracts stored and deflated entries alike", async () => {
    const { response } = streamingResponse(archive());
    spyOn(window, "fetch").and.resolveTo(response);
    const { entries, onEntry } = collectEntries();

    await streamAssetPackArchive({
      url: "https://example.test/pack.zip",
      signal: new AbortController().signal,
      shouldExtract: () => true,
      onEntry,
      onProgress: () => undefined,
    });

    expect([...entries.keys()].sort()).toEqual(["data/b.svg", "images/a.png", "images/c.png"]);
    // Contents round-trip, not just names - a mis-registered decoder would surface here
    expect(entries.get("images/a.png").byteLength).toBe(2048);
    expect(entries.get("data/b.svg").byteLength).toBe(4096);
    expect(entries.get("data/b.svg").every((byte) => byte === 60)).toBeTrue();
  });

  it("skips unwanted entries without decompressing them", async () => {
    const { response } = streamingResponse(archive());
    spyOn(window, "fetch").and.resolveTo(response);
    const { entries, onEntry } = collectEntries();

    await streamAssetPackArchive({
      url: "https://example.test/pack.zip",
      signal: new AbortController().signal,
      shouldExtract: (entryPath) => entryPath === "images/a.png",
      onEntry,
      onProgress: () => undefined,
    });

    // Inflating entries only to discard them would undo the reason for compressing selectively:
    // on a bulk update most entries are already on disk
    expect([...entries.keys()]).toEqual(["images/a.png"]);
  });

  it("reports byte progress against content-length", async () => {
    const body = archive();
    const { response } = streamingResponse(body);
    spyOn(window, "fetch").and.resolveTo(response);
    const progress: { bytesRead: number; totalBytes: number | undefined }[] = [];

    await streamAssetPackArchive({
      url: "https://example.test/pack.zip",
      signal: new AbortController().signal,
      shouldExtract: () => true,
      onEntry: async () => undefined,
      onProgress: (bytesRead, totalBytes) => progress.push({ bytesRead, totalBytes }),
    });

    expect(progress.length).toBeGreaterThan(1);
    expect(progress.every((update) => update.totalBytes === body.length)).toBeTrue();
    expect(progress[progress.length - 1].bytesRead).toBe(body.length);
    const readCounts = progress.map((update) => update.bytesRead);
    expect(readCounts).toEqual([...readCounts].sort((a, b) => a - b));
  });

  it("falls back to the supplied total when content-length is absent", async () => {
    const { response } = streamingResponse(archive());
    response.headers.get = () => null;
    spyOn(window, "fetch").and.resolveTo(response);
    const totals: (number | undefined)[] = [];

    await streamAssetPackArchive({
      url: "https://example.test/pack.zip",
      signal: new AbortController().signal,
      fallbackTotalBytes: 9999,
      shouldExtract: () => true,
      onEntry: async () => undefined,
      onProgress: (_bytesRead, totalBytes) => totals.push(totalBytes),
    });

    expect(totals.every((total) => total === 9999)).toBeTrue();
  });

  it("raises a distinct error for a missing archive, so it can be told from a real failure", async () => {
    spyOn(window, "fetch").and.resolveTo({
      ok: false,
      status: 404,
      headers: { get: () => null },
    } as any);

    await expectAsync(
      streamAssetPackArchive({
        url: "https://example.test/pack.zip",
        signal: new AbortController().signal,
        shouldExtract: () => true,
        onEntry: async () => undefined,
        onProgress: () => undefined,
      })
    ).toBeRejectedWithError(AssetPackArchiveNotFoundError);
  });

  it("rejects an entry whose path escapes the archive root", async () => {
    const { response } = streamingResponse(
      zipSync({ "../escaped.png": [bytes(512), { level: 0 }] })
    );
    spyOn(window, "fetch").and.resolveTo(response);
    const { entries, onEntry } = collectEntries();

    await expectAsync(
      streamAssetPackArchive({
        url: "https://example.test/pack.zip",
        signal: new AbortController().signal,
        shouldExtract: () => true,
        onEntry,
        onProgress: () => undefined,
      })
    ).toBeRejected();

    expect(entries.size).toBe(0);
  });

  it("releases the reader when extraction fails partway", async () => {
    const { response, wasCancelled } = streamingResponse(archive());
    spyOn(window, "fetch").and.resolveTo(response);

    await expectAsync(
      streamAssetPackArchive({
        url: "https://example.test/pack.zip",
        signal: new AbortController().signal,
        shouldExtract: () => true,
        onEntry: async () => {
          throw new Error("disk full");
        },
        onProgress: () => undefined,
      })
    ).toBeRejected();

    // A half-read body would otherwise hold the connection open
    expect(wasCancelled()).toBeTrue();
  });

  it("passes the abort signal to fetch", async () => {
    const controller = new AbortController();
    const { response } = streamingResponse(archive());
    const fetchSpy = spyOn(window, "fetch").and.resolveTo(response);

    await streamAssetPackArchive({
      url: "https://example.test/pack.zip",
      signal: controller.signal,
      shouldExtract: () => true,
      onEntry: async () => undefined,
      onProgress: () => undefined,
    });

    // An archive is one long request, so a cancel that only checked between entries would let a
    // whole pack finish transferring
    expect(fetchSpy.calls.mostRecent().args[1]).toEqual(
      jasmine.objectContaining({ signal: controller.signal })
    );
  });
});
