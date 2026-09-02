import { getLocalAssetTargetPath, toLocalAssetPath } from "./remote-asset.types";

const DEPLOYMENT_NAME = "MOCK";
const targetPathFor = (filePath: string) => getLocalAssetTargetPath(filePath, DEPLOYMENT_NAME);

describe("remote-asset.types local asset paths", () => {
  it("round-trips a target path through the storage format", () => {
    expect(toLocalAssetPath("images/asset.png")).toEqual("local://images/asset.png");
    expect(targetPathFor(toLocalAssetPath("images/asset.png"))).toEqual("images/asset.png");
  });

  it("recovers the target path from an iOS path written before `local://` existed", () => {
    // The container UUID here is stale - iOS relocates it on app update - but the tail is unaffected
    expect(
      targetPathFor(
        "capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/OLD-UUID/Documents/MOCK/images/asset.png"
      )
    ).toEqual("images/asset.png");
  });

  it("recovers the target path from an Android path written before `local://` existed", () => {
    // Android routes local files over the configured `server.androidScheme` (http here) rather than
    // the `capacitor://` scheme iOS uses, so detection keys off the `_capacitor_file_` segment
    expect(
      targetPathFor(
        "http://localhost/_capacitor_file_/data/user/0/international.idems.debug_app/files/MOCK/images/asset.png"
      )
    ).toEqual("images/asset.png");
    expect(
      targetPathFor(
        "https://localhost/_capacitor_file_/data/user/0/international.idems.debug_app/files/MOCK/images/asset.png"
      )
    ).toEqual("images/asset.png");
  });

  it("recovers the target path from a raw file uri", () => {
    expect(
      targetPathFor("file:///var/mobile/Containers/Data/x/Documents/MOCK/audio/a.mp3")
    ).toEqual("audio/a.mp3");
  });

  it("keeps a target path that itself contains a folder named after the deployment", () => {
    // Matching the first deployment folder, not the last: the container prefix ahead of it is
    // OS-structured, while the authored target path is free to reuse the name
    expect(
      targetPathFor(
        "capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/OLD-UUID/Documents/MOCK/images/MOCK/asset.png"
      )
    ).toEqual("images/MOCK/asset.png");
  });

  it("returns undefined for paths that are not locally downloaded assets", () => {
    // A bundled asset's relative path
    expect(targetPathFor("images/asset.png")).toBeUndefined();
    // A provider URL, as stored on web
    expect(targetPathFor("https://provider.example/storage/images/asset.png")).toBeUndefined();
  });

  it("returns undefined for a legacy path with no deployment folder", () => {
    // e.g. written under a different deployment name; re-downloads once rather than resolving wrongly
    expect(
      targetPathFor("capacitor://localhost/_capacitor_file_/var/data/OTHER/images/asset.png")
    ).toBeUndefined();
  });
});
