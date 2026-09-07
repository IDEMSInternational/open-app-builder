import { TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TemplateAssetService } from "./template-asset.service";
import { TemplateTranslateService } from "./template-translate.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import type { IAssetContents } from "src/app/data";

/** Where the app container happens to live in the session under test */
const CONTAINER_BASE = "file:///var/mobile/Containers/Data/Application/NEW-UUID/Documents/MOCK";

/** A path recorded by an app version that saved absolute paths, before the container moved */
const STALE_ABSOLUTE_PATH =
  "capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/OLD-UUID/Documents/MOCK/images/downloaded.png";

/**
 * NB `Capacitor.convertFileSrc` is the identity function off-device, so the expected values below
 * are the raw joined paths rather than `capacitor://localhost/_capacitor_file_/...`
 */
describe("TemplateAssetService", () => {
  let service: TemplateAssetService;

  const setContents = (contents: IAssetContents) => service.assetsContentsList.set(contents);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TemplateTranslateService,
          useValue: { app_language: "global", appLanguage: signal("global") },
        },
        {
          provide: ThemeService,
          useValue: { getCurrentTheme: () => "default", currentTheme: signal("default") },
        },
        { provide: HttpClient, useValue: {} },
      ],
    });
    service = TestBed.inject(TemplateAssetService);
    service.localAssetPathConfig.set({ baseUri: CONTAINER_BASE, deploymentName: "MOCK" });
  });

  it("resolves a downloaded asset against the container the app is running in now", () => {
    setContents({
      "images/downloaded.png": { filePath: "local://images/downloaded.png" },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(
      `${CONTAINER_BASE}/images/downloaded.png`
    );
  });

  it("re-points a stale absolute path written before the app was updated", () => {
    // The regression this guards: iOS relocates the container on update, so a path stored at
    // download time points at a directory that no longer exists and the asset silently stops
    // rendering. It must resolve against the current container instead of being passed through.
    setContents({
      "images/downloaded.png": { filePath: STALE_ABSOLUTE_PATH },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(
      `${CONTAINER_BASE}/images/downloaded.png`
    );
  });

  it("re-points a stale absolute path written on Android", () => {
    // Android routes local files over `server.androidScheme` rather than the `capacitor://` scheme
    setContents({
      "images/downloaded.png": {
        filePath:
          "http://localhost/_capacitor_file_/data/user/0/international.idems.debug_app/files/MOCK/images/downloaded.png",
      },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(
      `${CONTAINER_BASE}/images/downloaded.png`
    );
  });

  it("percent-encodes a target path that needs it", () => {
    setContents({
      "images/downloaded.png": { filePath: "local://images/my asset.png" },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(
      `${CONTAINER_BASE}/images/my%20asset.png`
    );
  });

  it("gives up on a downloaded asset rather than emitting a bundled path it cannot serve", () => {
    // Guards the fallback: without the container path, rewriting `local://` as a bundled asset would
    // emit `assets/app_data/assets/local://...` and fire a request that can only 404
    service.localAssetPathConfig.set(undefined);
    setContents({
      "images/downloaded.png": { filePath: "local://images/downloaded.png" },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual("");
  });

  it("resolves a downloaded theme/language override", () => {
    setContents({
      "images/downloaded.png": {
        filePath: "local://images/downloaded.png",
        overrides: {
          theme_default: {
            global: {
              filePath: "local://tz_sw/images/downloaded.png",
              md5Checksum: "abc123",
              size_kb: 100,
            },
          },
        },
      },
    } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(
      `${CONTAINER_BASE}/tz_sw/images/downloaded.png`
    );
  });

  it("leaves a bundled asset path untouched", () => {
    setContents({ "images/bundled.png": {} } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/bundled.png")).toEqual(
      "assets/app_data/assets/images/bundled.png"
    );
  });

  it("leaves a remote provider URL untouched (web)", () => {
    const remoteUrl = "https://provider.example/storage/images/downloaded.png";
    setContents({ "images/downloaded.png": { filePath: remoteUrl } } as IAssetContents);

    expect(service.getTranslatedAssetPath("images/downloaded.png")).toEqual(remoteUrl);
  });
});
