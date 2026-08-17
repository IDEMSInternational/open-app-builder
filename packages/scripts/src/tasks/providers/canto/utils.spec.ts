const mockConfig: any = {};

jest.mock("../../../commands/workflow/run", () => ({
  WorkflowRunner: {
    get config() {
      return mockConfig;
    },
  },
}));

jest.mock("../../../utils", () => ({
  logWarning: jest.fn(),
}));

import { logWarning } from "../../../utils";
import { getAssetPathName, getLocalFilePath, getManifestFileMap } from "./utils";
import type { CantoManifestEntry } from "./types";

const createFile = (
  overrides: Partial<CantoManifestEntry> & Pick<CantoManifestEntry, "name">
): CantoManifestEntry => ({
  id: "file-id",
  scheme: "image",
  url: { directUrlOriginal: "https://example.com/file.jpg" },
  relatedAlbums: [
    {
      id: "album-id",
      idPath: "root/source-folder-id/audio/relax",
      namePath: "Root/Source Folder/audio/relax",
      name: "relax",
      scheme: "album",
    },
  ],
  ...overrides,
});

/** yarn workspace scripts test -t utils.spec.ts */
describe("Canto utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig.app_config = { APP_LANGUAGES: { default: "za_en" } };
    mockConfig.canto = { languageMappings: { English: "za_en" } };
  });

  describe("getAssetPathName", () => {
    it("returns forward-slash relative paths on all platforms", () => {
      const file = createFile({
        name: "image.jpg",
        relatedAlbums: [
          {
            id: "album-id",
            idPath: "root/source-folder-id/theme_default/gb_en",
            namePath: "Root/Source Folder/theme_default/gb_en",
            name: "gb_en",
            scheme: "album",
          },
        ],
      });

      expect(getAssetPathName(file, "source-folder-id")).toEqual("theme_default/gb_en/image.jpg");
      expect(getAssetPathName(file, "source-folder-id")).not.toMatch(/\\/);
    });

    it("uses the album path that contains the configured source folder id", () => {
      const file = createFile({
        name: "clip.mp4",
        relatedAlbums: [
          {
            id: "other-album",
            idPath: "root/other-folder-id/videos",
            namePath: "Root/Other Folder/videos",
            name: "videos",
            scheme: "album",
          },
          {
            id: "source-album",
            idPath: "root/source-folder-id/videos",
            namePath: "Root/Source Folder/videos",
            name: "videos",
            scheme: "album",
          },
        ],
      });

      expect(getAssetPathName(file, "source-folder-id")).toEqual("videos/clip.mp4");
    });
  });

  describe("getLocalFilePath", () => {
    it("omits variation folders for default language files", () => {
      const file = createFile({ name: "relax_1.mp3", additional: { Language: ["English"] } });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("audio/relax/relax_1.mp3");
    });

    it("omits variation folders for files with no language assigned", () => {
      const file = createFile({ name: "relax_1.mp3", additional: { Language: null } });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("audio/relax/relax_1.mp3");
    });

    it("includes a language folder for non-default language files", () => {
      const file = createFile({ name: "relax_1.mp3", additional: { Language: ["isiXhosa"] } });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("za_xh/audio/relax/relax_1.mp3");
    });

    it("keeps language variants of the same asset at distinct paths", () => {
      const defaultFile = createFile({
        name: "relax_1.mp3",
        additional: { Language: ["English"] },
      });
      const overrideFile = createFile({
        name: "relax_1.mp3",
        additional: { Language: ["isiXhosa"] },
      });
      expect(getLocalFilePath(defaultFile, "source-folder-id")).not.toEqual(
        getLocalFilePath(overrideFile, "source-folder-id")
      );
    });

    it("treats files assigned multiple languages including the default as default assets", () => {
      const file = createFile({
        name: "relax_1.mp3",
        additional: { Language: ["isiXhosa", "English"] },
      });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("audio/relax/relax_1.mp3");
    });

    it("includes a theme folder for non-default theme files", () => {
      const file = createFile({
        name: "relax_1.mp3",
        additional: { app_theme: "theme_alt", Language: ["isiXhosa"] },
      });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual(
        "theme_alt/za_xh/audio/relax/relax_1.mp3"
      );
    });

    it("omits the theme folder for default theme files", () => {
      const file = createFile({
        name: "relax_1.mp3",
        additional: { app_theme: "theme_default", Language: ["English"] },
      });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("audio/relax/relax_1.mp3");
    });

    it("falls back to the canto language label when no mapping exists", () => {
      const file = createFile({ name: "relax_1.mp3", additional: { Language: ["ke_sw"] } });
      expect(getLocalFilePath(file, "source-folder-id")).toEqual("ke_sw/audio/relax/relax_1.mp3");
    });
  });

  describe("getManifestFileMap", () => {
    it("maps language variants of the same asset to separate paths", () => {
      const defaultFile = createFile({
        id: "id-default",
        name: "relax_1.mp3",
        additional: { Language: ["English"] },
      });
      const overrideFile = createFile({
        id: "id-override",
        name: "relax_1.mp3",
        additional: { Language: ["isiXhosa"] },
      });

      const fileMap = getManifestFileMap([defaultFile, overrideFile], "source-folder-id");

      expect([...fileMap.keys()]).toEqual([
        "audio/relax/relax_1.mp3",
        "za_xh/audio/relax/relax_1.mp3",
      ]);
      expect(fileMap.get("audio/relax/relax_1.mp3")).toBe(defaultFile);
      expect(fileMap.get("za_xh/audio/relax/relax_1.mp3")).toBe(overrideFile);
      expect(logWarning).not.toHaveBeenCalled();
    });

    it("picks the same entry on every sync for duplicate uploads", () => {
      const first = createFile({ id: "b-id", name: "relax_1.mp3", md5: "md5-1" });
      const second = createFile({ id: "a-id", name: "relax_1.mp3", md5: "md5-2" });

      const fileMap = getManifestFileMap([first, second], "source-folder-id", {
        logWarnings: true,
      });
      const reversedFileMap = getManifestFileMap([second, first], "source-folder-id");

      expect(fileMap.size).toEqual(1);
      expect(fileMap.get("audio/relax/relax_1.mp3")).toBe(second);
      expect(reversedFileMap.get("audio/relax/relax_1.mp3")).toBe(second);
      // Warnings are only logged by the step that requests them, so appear once per sync
      expect(logWarning).toHaveBeenCalledTimes(1);
      expect(logWarning).toHaveBeenCalledWith(
        expect.objectContaining({ msg2: expect.stringContaining("differing content") })
      );
    });

    it("warns about languages that cannot be populated", () => {
      const file = createFile({
        name: "relax_1.mp3",
        additional: { Language: ["isiXhosa", "isiZulu"] },
      });

      const fileMap = getManifestFileMap([file], "source-folder-id", { logWarnings: true });

      expect([...fileMap.keys()]).toEqual(["za_xh/audio/relax/relax_1.mp3"]);
      expect(logWarning).toHaveBeenCalledWith(
        expect.objectContaining({
          msg1: expect.stringContaining("multiple non-default languages"),
          msg2: expect.stringContaining("za_zu"),
        })
      );
    });

    it("does not warn about files shared between the default and other languages", () => {
      const file = createFile({
        name: "relax_1.mp3",
        additional: { Language: ["English", "isiXhosa"] },
      });

      getManifestFileMap([file], "source-folder-id", { logWarnings: true });

      expect(logWarning).not.toHaveBeenCalled();
    });
  });
});
