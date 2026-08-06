import { Capacitor } from "@capacitor/core";
import migration, { IRemoteAssetMigrationContext } from "./2026-08-05-remote-assets-storage-folder";
import type { FileManagerService } from "../../file-manager/file-manager.service";
import { DynamicDataService } from "../../dynamic-data/dynamic-data.service";

const CACHE_NAME = "MOCK";

/** A recorded filePath for a file saved under the old flat layout */
const legacySrc = (targetPath: string) =>
  `capacitor://localhost/_capacitor_file_/data/${CACHE_NAME}/${targetPath}`;

/** A recorded filePath for a file saved under the current `remote_assets` folder */
const currentSrc = (relativePath: string) => legacySrc(`remote_assets/${relativePath}`);

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/migrations/2026-08-05-remote-assets-storage-folder.spec.ts
 */
describe("Migration: remote-assets-storage-folder", () => {
  let fileManagerService: jasmine.SpyObj<FileManagerService>;
  let dynamicDataService: jasmine.SpyObj<DynamicDataService>;
  let context: IRemoteAssetMigrationContext;
  /** Rows as they end up stored, so tests assert the result rather than the write call's shape */
  let contentsStore: Record<string, any>;

  beforeEach(() => {
    fileManagerService = jasmine.createSpyObj<FileManagerService>(
      "FileManagerService",
      ["deleteSavedFile"],
      { cacheName: CACHE_NAME }
    );
    fileManagerService.deleteSavedFile.and.resolveTo(true);
    dynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
      "snapshot",
      "bulkUpsert",
      "resetFlow",
    ]);
    dynamicDataService.snapshot.and.resolveTo([]);
    dynamicDataService.bulkUpsert.and.callFake(async (_type, _flow, rows: any[]) => {
      // Mirrors the real behaviour: an upserted doc replaces the stored one outright. Writing via
      // `update` instead would deep-merge, silently keeping the paths this migration removed.
      for (const row of rows) contentsStore[row.id] = row;
    });
    dynamicDataService.resetFlow.and.resolveTo();
    contentsStore = {};
    context = { fileManagerService, dynamicDataService };
  });

  it("only runs on native platforms", async () => {
    const isNativePlatformSpy = spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
    expect(await migration.preconditions(context)).toBeFalse();

    isNativePlatformSpy.and.returnValue(true);
    expect(await migration.preconditions(context)).toBeTrue();
  });

  it("deletes the files recorded under the old flat layout", async () => {
    dynamicDataService.snapshot.and.resolveTo([
      { id: "images/asset.png", filePath: legacySrc("images/asset.png") },
      {
        id: "audio/asset.mp3",
        filePath: legacySrc("audio/asset.mp3"),
        overrides: {
          theme_default: { tz_sw: { filePath: legacySrc("tz_sw/audio/asset.mp3") } },
        },
      },
    ] as any);

    await migration.run(context);

    expect(fileManagerService.deleteSavedFile.calls.allArgs()).toEqual([
      ["images/asset.png"],
      ["audio/asset.mp3"],
      ["tz_sw/audio/asset.mp3"],
    ]);
  });

  it("only deletes files it has a record of downloading itself", async () => {
    // The deployment folder is shared with other features, so anything this app did not record
    // saving as an asset - and anything already in the current folder - must be left alone
    dynamicDataService.snapshot.and.resolveTo([
      { id: "images/bundled.png", filePath: "assets/images/bundled.png" },
      { id: "images/current.png", filePath: currentSrc("images/current.png") },
      { id: "images/web.png", filePath: "https://cdn.example.com/assets/asset_pack_1/web.png" },
      { id: "images/never_downloaded.png" },
    ] as any);

    await migration.run(context);

    expect(fileManagerService.deleteSavedFile).not.toHaveBeenCalled();
    expect(dynamicDataService.bulkUpsert).not.toHaveBeenCalled();
    expect(dynamicDataService.resetFlow).not.toHaveBeenCalled();
  });

  it("clears the contents references to the deleted files", async () => {
    dynamicDataService.snapshot.and.resolveTo([
      {
        id: "audio/asset.mp3",
        md5Checksum: "abc",
        filePath: legacySrc("audio/asset.mp3"),
        overrides: {
          theme_default: { tz_sw: { filePath: legacySrc("tz_sw/audio/asset.mp3") } },
        },
      },
    ] as any);

    await migration.run(context);

    // Base filePath dropped (falls back to the bundled path) and the emptied override tree removed
    expect(contentsStore["audio/asset.mp3"]).toEqual({ id: "audio/asset.mp3", md5Checksum: "abc" });
  });

  it("clears pack status so affected packs download again into the new folder", async () => {
    dynamicDataService.snapshot.and.resolveTo([
      { id: "images/asset.png", filePath: legacySrc("images/asset.png") },
    ] as any);

    await migration.run(context);

    // Otherwise a pack stays `completed` while its files no longer exist on disk
    expect(dynamicDataService.resetFlow).toHaveBeenCalledWith("data_list", "_asset_packs");
  });

  it("does nothing when there is no legacy state", async () => {
    await migration.run(context);

    expect(fileManagerService.deleteSavedFile).not.toHaveBeenCalled();
    expect(dynamicDataService.resetFlow).not.toHaveBeenCalled();
  });

  it("continues past a file that cannot be deleted", async () => {
    spyOn(console, "error");
    dynamicDataService.snapshot.and.resolveTo([
      { id: "images/a.png", filePath: legacySrc("images/a.png") },
      { id: "images/b.png", filePath: legacySrc("images/b.png") },
    ] as any);
    fileManagerService.deleteSavedFile.and.callFake(async (targetPath: string) => {
      if (targetPath === "images/a.png") throw new Error("EACCES");
      return true;
    });

    await expectAsync(migration.run(context)).toBeResolved();

    expect(fileManagerService.deleteSavedFile.calls.allArgs()).toEqual([
      ["images/a.png"],
      ["images/b.png"],
    ]);
  });

  it("never throws, so a failed cleanup cannot block app startup", async () => {
    spyOn(console, "error");
    dynamicDataService.snapshot.and.rejectWith(new Error("storage unavailable"));

    await expectAsync(migration.run(context)).toBeResolved();
  });
});
