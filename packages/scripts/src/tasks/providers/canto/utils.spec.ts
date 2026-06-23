jest.mock("../../../commands/workflow/run", () => ({
  WorkflowRunner: { config: {} },
}));

import { getFilePath } from "./utils";
import type { CantoManifestEntry } from "./types";

const createFile = (
  overrides: Partial<CantoManifestEntry> & Pick<CantoManifestEntry, "name">
): CantoManifestEntry => ({
  id: "file-id",
  scheme: "image",
  url: { directUrlOriginal: "https://example.com/file.jpg" },
  ...overrides,
});

/** yarn workspace scripts test -t utils.spec.ts */
describe("Canto utils", () => {
  describe("getFilePath", () => {
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

      expect(getFilePath(file, "source-folder-id")).toEqual("theme_default/gb_en/image.jpg");
      expect(getFilePath(file, "source-folder-id")).not.toMatch(/\\/);
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

      expect(getFilePath(file, "source-folder-id")).toEqual("videos/clip.mp4");
    });
  });
});
