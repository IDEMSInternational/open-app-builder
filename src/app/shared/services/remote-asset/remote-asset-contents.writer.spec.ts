import type { IAssetEntry } from "packages/data-models";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { AssetContentsWriter } from "./remote-asset-contents.writer";

const baseEntry: IAssetEntry = {
  id: "audio/track.mp3",
  md5Checksum: "manifest-checksum",
  size_kb: 20,
};

const entryWithOverride: IAssetEntry = {
  ...baseEntry,
  overrides: {
    theme_default: {
      tz_sw: { filePath: "tz_sw/audio/track.mp3", md5Checksum: "override-checksum", size_kb: 10 },
    },
  },
};

const override = { themeName: "theme_default", languageCode: "tz_sw" };

function setup(existingContents: Record<string, IAssetEntry> = {}, flushInterval = 25) {
  const dynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
    "bulkUpsert",
  ]);
  dynamicDataService.bulkUpsert.and.resolveTo();
  const writer = new AssetContentsWriter(dynamicDataService, existingContents, flushInterval);
  const writtenRows = () =>
    dynamicDataService.bulkUpsert.calls.allArgs().flatMap(([, , rows]) => rows as any[]);
  return { writer, dynamicDataService, writtenRows };
}

/**
 * yarn ng test --include src/app/shared/services/remote-asset/remote-asset-contents.writer.spec.ts
 */
describe("AssetContentsWriter", () => {
  it("holds a row until every slot it expects has settled", async () => {
    const { writer, dynamicDataService, writtenRows } = setup();
    writer.expectSlots(entryWithOverride, 2);

    writer.settleSlot(entryWithOverride, { filePath: "local://base" });
    await writer.flush();
    // An archive delivers entries in archive order, so a row's slots need not arrive together.
    // Writing on the first one would persist a row that still points at a remote override path.
    expect(dynamicDataService.bulkUpsert).not.toHaveBeenCalled();

    writer.settleSlot(entryWithOverride, {
      filePath: "local://override",
      overrideProps: override,
    });
    await writer.flush();

    expect(writtenRows().length).toBe(1);
    expect(writtenRows()[0].filePath).toBe("local://base");
    expect(writtenRows()[0].overrides.theme_default.tz_sw.filePath).toBe("local://override");
  });

  it("writes a settled row even when one of its slots failed", async () => {
    const { writer, writtenRows } = setup();
    writer.expectSlots(entryWithOverride, 2);

    writer.settleSlot(entryWithOverride, { filePath: "local://base" });
    // No filePath: the slot settled as a failure
    writer.settleSlot(entryWithOverride, { overrideProps: override });
    await writer.flush();

    // The successful sibling's evidence is worth keeping, and leaving the failed slot's path at
    // the manifest value is exactly what makes the resume gate re-fetch that one file next time
    expect(writtenRows()[0].filePath).toBe("local://base");
    expect(writtenRows()[0].overrides.theme_default.tz_sw.filePath).toBe("tz_sw/audio/track.mp3");
  });

  it("merges over an existing row rather than replacing it", async () => {
    // A core row with a bundled base file and one override language, frozen as RxDB documents are
    const existing = Object.freeze({
      id: "audio/track.mp3",
      md5Checksum: "core-checksum",
      size_kb: 20,
      filePath: "local://bundled-base",
      overrides: Object.freeze({
        theme_default: Object.freeze({
          tz_sw: Object.freeze({ filePath: "local://bundled-tz", md5Checksum: "x", size_kb: 10 }),
        }),
      }),
    }) as IAssetEntry;
    const packEntry: IAssetEntry = {
      ...baseEntry,
      overridesOnly: true,
      overrides: {
        theme_default: {
          ke_sw: { filePath: "ke_sw/audio/track.mp3", md5Checksum: "pack", size_kb: 10 },
        },
      },
    };
    const { writer, writtenRows } = setup({ "audio/track.mp3": existing });

    writer.expectSlots(packEntry, 1);
    writer.settleSlot(packEntry, {
      filePath: "local://ke",
      overrideProps: { themeName: "theme_default", languageCode: "ke_sw" },
    });
    await writer.flush();

    const row = writtenRows()[0];
    expect(row.overrides.theme_default.ke_sw.filePath).toBe("local://ke");
    // `bulkUpsert` replaces the document, so anything the manifest does not mention has to be
    // carried over here or it is silently dropped
    expect(row.filePath).toBe("local://bundled-base");
    expect(row.overrides.theme_default.tz_sw.filePath).toBe("local://bundled-tz");
    // ...while the manifest still wins wherever it does have something to say
    expect(row.md5Checksum).toBe("manifest-checksum");
  });

  it("never mutates the snapshot it reads from", async () => {
    const existing = Object.freeze({ ...baseEntry, filePath: "local://bundled" }) as IAssetEntry;
    const existingContents = { "audio/track.mp3": existing };
    const { writer } = setup(existingContents);

    writer.expectSlots(baseEntry, 1);
    writer.settleSlot(baseEntry, { filePath: "local://new" });
    await writer.flush();

    // The same snapshot backs the resume gate for the rest of the attempt; mutating it would
    // change decisions still to be made against it
    expect(existingContents["audio/track.mp3"].filePath).toBe("local://bundled");
  });

  it("flushes settled rows on demand, so a cancel keeps work already paid for", async () => {
    const { writer, writtenRows } = setup({}, 25);
    writer.expectSlots(baseEntry, 1);
    writer.settleSlot(baseEntry, { filePath: "local://base" });

    // Well below the flush interval, but a cancelled attempt still flushes: the file is on disk,
    // so discarding its row would force a re-download of something already fetched
    expect(writer.pendingRowCount).toBe(1);
    await writer.flush();

    expect(writtenRows().length).toBe(1);
    expect(writer.pendingRowCount).toBe(0);
  });

  it("writes automatically once enough rows have settled", async () => {
    const { writer, dynamicDataService } = setup({}, 2);
    for (const id of ["a", "b"]) {
      const entry = { ...baseEntry, id };
      writer.expectSlots(entry, 1);
      writer.settleSlot(entry, { filePath: `local://${id}` });
      await writer.flushIfDue();
    }

    expect(dynamicDataService.bulkUpsert).toHaveBeenCalledTimes(1);
  });

  it("does not write the same row twice when a slot settles mid-flush", async () => {
    const { writer, dynamicDataService, writtenRows } = setup({}, 1);
    let releaseWrite!: () => void;
    dynamicDataService.bulkUpsert.and.returnValue(
      new Promise<void>((resolve) => (releaseWrite = resolve))
    );

    writer.expectSlots({ ...baseEntry, id: "a" }, 1);
    writer.settleSlot({ ...baseEntry, id: "a" }, { filePath: "local://a" });
    const inFlight = writer.flush();

    // Lands while the write is still awaiting
    writer.expectSlots({ ...baseEntry, id: "b" }, 1);
    writer.settleSlot({ ...baseEntry, id: "b" }, { filePath: "local://b" });
    releaseWrite();
    await inFlight;
    dynamicDataService.bulkUpsert.and.resolveTo();
    await writer.flush();

    const ids = writtenRows().map((row) => row.id);
    expect(ids).toEqual(["a", "b"]);
  });

  it("ignores a slot settled for an entry it was never told about", async () => {
    const { writer, dynamicDataService } = setup();
    spyOn(console, "warn");

    writer.settleSlot(baseEntry, { filePath: "local://base" });
    await writer.flush();

    // Better a loud no-op than inventing a row from a partial view of the entry
    expect(dynamicDataService.bulkUpsert).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
  });
});
