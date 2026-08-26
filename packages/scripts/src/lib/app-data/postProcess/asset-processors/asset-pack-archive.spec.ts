import * as path from "path";
import * as fs from "fs-extra";
import * as os from "os";
import { unzipSync } from "fflate";
import type { FlowTypes, IAssetEntry } from "data-models";
import { logWarning } from "../../../../utils";
import {
  getArchiveCompressionLevel,
  listAssetPackSlotPaths,
  writeAssetPackArchive,
} from "./asset-pack-archive";

jest.mock("../../../../utils", () => ({
  ...jest.requireActual("../../../../utils"),
  logWarning: jest.fn(),
}));

const manifestOf = (rows: Partial<IAssetEntry>[]): FlowTypes.AssetPack => ({
  flow_type: "asset_pack",
  flow_name: "my_pack",
  version: "v1",
  rows: rows as FlowTypes.Data_listRow<IAssetEntry>[],
});

function createPackFolder(files: Record<string, string>) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "asset-pack-archive-"));
  for (const [relativePath, contents] of Object.entries(files)) {
    const target = path.resolve(folder, relativePath);
    fs.ensureDirSync(path.dirname(target));
    fs.writeFileSync(target, contents);
  }
  return folder;
}

const readArchive = (folder: string) =>
  unzipSync(new Uint8Array(fs.readFileSync(path.resolve(folder, "my_pack.zip"))));

/** yarn workspace scripts test -t asset-pack-archive.spec.ts */
describe("asset pack archive", () => {
  describe("getArchiveCompressionLevel", () => {
    it("deflates text-like assets", () => {
      expect(getArchiveCompressionLevel("images/icon.svg")).toBe(6);
      expect(getArchiveCompressionLevel("data/animation.json")).toBe(6);
      expect(getArchiveCompressionLevel("IMAGES/ICON.SVG")).toBe(6);
    });

    it("stores already-compressed media", () => {
      expect(getArchiveCompressionLevel("audio/track.mp3")).toBe(0);
      expect(getArchiveCompressionLevel("images/photo.png")).toBe(0);
    });

    it("stores anything it does not recognise", () => {
      // A new media type must never start being inflated on device just because nobody
      // remembered to add it to the list
      expect(getArchiveCompressionLevel("video/clip.webm")).toBe(0);
      expect(getArchiveCompressionLevel("audio/clip.m4a")).toBe(0);
      expect(getArchiveCompressionLevel("no-extension")).toBe(0);
    });
  });

  describe("listAssetPackSlotPaths", () => {
    it("lists each asset's base file immediately before its own overrides", () => {
      const manifest = manifestOf([
        {
          id: "audio/a.mp3",
          overrides: {
            theme_default: {
              tz_sw: { filePath: "tz_sw/audio/a.mp3", md5Checksum: "x", size_kb: 1 },
            },
          },
        },
        { id: "images/b.png" },
      ]);

      // Grouping is what lets the app write a contents row as soon as its slots have all arrived,
      // rather than holding every row until the stream ends
      expect(listAssetPackSlotPaths(manifest)).toEqual([
        "audio/a.mp3",
        "tz_sw/audio/a.mp3",
        "images/b.png",
      ]);
    });

    it("omits the base file of an overridesOnly entry", () => {
      const manifest = manifestOf([
        {
          id: "audio/a.mp3",
          overridesOnly: true,
          overrides: {
            theme_default: {
              tz_sw: { filePath: "tz_sw/audio/a.mp3", md5Checksum: "x", size_kb: 1 },
            },
          },
        },
      ]);

      expect(listAssetPackSlotPaths(manifest)).toEqual(["tz_sw/audio/a.mp3"]);
    });
  });

  describe("writeAssetPackArchive", () => {
    it("writes every manifest slot, preserving nested paths", () => {
      const folder = createPackFolder({
        "audio/a.mp3": "aaa",
        "tz_sw/audio/a.mp3": "bbb",
        "images/b.png": "ccc",
      });
      const manifest = manifestOf([
        {
          id: "audio/a.mp3",
          overrides: {
            theme_default: {
              tz_sw: { filePath: "tz_sw/audio/a.mp3", md5Checksum: "x", size_kb: 1 },
            },
          },
        },
        { id: "images/b.png" },
      ]);

      writeAssetPackArchive(folder, "my_pack", manifest);

      // Directory structure preserved, not flattened: the app writes entries to these exact paths
      expect(Object.keys(readArchive(folder)).sort()).toEqual([
        "audio/a.mp3",
        "images/b.png",
        "tz_sw/audio/a.mp3",
      ]);
      fs.removeSync(folder);
    });

    it("excludes the manifest and contents files", () => {
      const folder = createPackFolder({
        "images/b.png": "ccc",
        "my_pack.json": "{}",
        "contents.json": "{}",
      });

      writeAssetPackArchive(folder, "my_pack", manifestOf([{ id: "images/b.png" }]));

      // Not a filename filter - the archive is built from manifest slots, so these cannot appear
      expect(Object.keys(readArchive(folder))).toEqual(["images/b.png"]);
      fs.removeSync(folder);
    });

    it("round-trips contents for both compression methods", () => {
      const folder = createPackFolder({
        "images/icon.svg": "<svg>".padEnd(500, "-"),
        "audio/track.mp3": "not really audio",
      });

      writeAssetPackArchive(
        folder,
        "my_pack",
        manifestOf([{ id: "images/icon.svg" }, { id: "audio/track.mp3" }])
      );

      const archive = readArchive(folder);
      const decode = (bytes: Uint8Array) => Buffer.from(bytes).toString("utf8");
      expect(decode(archive["images/icon.svg"])).toBe("<svg>".padEnd(500, "-"));
      expect(decode(archive["audio/track.mp3"])).toBe("not really audio");
      fs.removeSync(folder);
    });

    it("compresses text assets and leaves media alone", () => {
      const compressible = "a".repeat(5000);
      const folder = createPackFolder({
        "images/icon.svg": compressible,
        "audio/track.mp3": compressible,
      });

      writeAssetPackArchive(
        folder,
        "my_pack",
        manifestOf([{ id: "images/icon.svg" }, { id: "audio/track.mp3" }])
      );

      const archiveBytes = fs.readFileSync(path.resolve(folder, "my_pack.zip")).byteLength;
      // Identical content, but only one copy is deflated, so the total lands well below two
      // uncompressed copies and well above one
      expect(archiveBytes).toBeGreaterThan(5000);
      expect(archiveBytes).toBeLessThan(9000);
      fs.removeSync(folder);
    });

    it("skips a manifest slot with no file on disk, and says so", () => {
      const folder = createPackFolder({ "images/b.png": "ccc" });

      const { rawBytes } = writeAssetPackArchive(
        folder,
        "my_pack",
        manifestOf([{ id: "images/b.png" }, { id: "images/missing.png" }])
      );

      // Better a self-consistent archive plus an honest failure than an entry the app cannot use
      expect(Object.keys(readArchive(folder))).toEqual(["images/b.png"]);
      expect(rawBytes).toBe(3);
      // Silently shipping an incomplete archive would make every install pay for a fallback
      expect(logWarning).toHaveBeenCalledWith(
        expect.objectContaining({ msg2: expect.stringContaining("images/missing.png") })
      );
      fs.removeSync(folder);
    });
  });
});
