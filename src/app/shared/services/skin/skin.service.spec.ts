import { TestBed } from "@angular/core/testing";

import { SkinService } from "./skin.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MockLocalStorageService } from "../local-storage/local-storage.service.spec";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.spec";
import { TemplateService } from "../../components/template/services/template.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { MockThemeService } from "src/app/feature/theme/services/theme.service.spec";
import { IAppConfig, IAppSkin } from "packages/data-models";
import { deepMergeObjects } from "../../utils";
import clone from "clone";

class MockTemplateService implements Partial<TemplateService> {
  ready() {
    return true;
  }
  async initialiseDefaultFieldAndGlobals() {
    return;
  }
}

const MOCK_SKIN_1: IAppSkin = {
  name: "MOCK_SKIN_1",
  appConfig: { APP_HEADER_DEFAULTS: { title: "mock 1", colour: "primary" } },
};
const MOCK_SKIN_2: IAppSkin = {
  name: "MOCK_SKIN_2",
  appConfig: { APP_HEADER_DEFAULTS: { title: "mock 2", variant: "compact" } },
};

const MOCK_APP_CONFIG: Partial<IAppConfig> = {
  APP_HEADER_DEFAULTS: {
    template: null,
    show: true,
    title: "default",
    collapse: false,
    colour: "none",
    should_minimize_app_on_back: () => true,
    should_show_back_button: () => true,
    should_show_menu_button: () => true,
    variant: "default",
  },
  APP_SKINS: {
    available: [MOCK_SKIN_1, MOCK_SKIN_2],
    defaultSkinName: "MOCK_SKIN_1",
  },
  APP_THEMES: {
    available: ["MOCK_THEME_1", "MOCK_THEME_2"],
    defaultThemeName: "MOCK_THEME_1",
  },
  APP_FOOTER_DEFAULTS: {
    templateName: "mock_footer",
    background: "primary",
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/skin/skin.service.spec.ts
 */
describe("SkinService", () => {
  let service: SkinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: new MockLocalStorageService() },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(MOCK_APP_CONFIG),
        },
        { provide: TemplateService, useValue: new MockTemplateService() },
        // TODO - create better mock and test methods
        { provide: ThemeService, useValue: new MockThemeService() },
      ],
    });
    service = TestBed.inject(SkinService);
  });

  it("creates hashmap of available skins on init", () => {
    const skins = service["availableSkins"];
    expect(skins).toEqual({ MOCK_SKIN_1, MOCK_SKIN_2 });
  });

  it("loads default skin on init", () => {
    expect(service.getActiveSkinName()).toEqual("MOCK_SKIN_1");
  });

  it("does not change non-overridden values", () => {
    expect(service["appConfigService"].appConfig().APP_FOOTER_DEFAULTS).toEqual({
      templateName: "mock_footer",
      background: "primary",
    });
  });

  it("loads active skin from local storage on init if available", () => {
    service["localStorageService"].setProtected("APP_SKIN", "MOCK_SKIN_2");
    expect(service.getActiveSkinName()).toEqual("MOCK_SKIN_2");
  });

  it("sets skin: sets active skin name", () => {
    service["setSkin"](MOCK_SKIN_2.name);
    expect(service.getActiveSkinName()).toEqual("MOCK_SKIN_2");
    service["setSkin"](MOCK_SKIN_1.name);
    expect(service.getActiveSkinName()).toEqual("MOCK_SKIN_1");
  });

  it("sets skin: updates AppConfigService.appConfig values", () => {
    // MOCK_SKIN_1 will already be applied on load
    service["setSkin"](MOCK_SKIN_2.name);
    expect(service["appConfigService"].appConfig() as Partial<IAppConfig>).toEqual(
      deepMergeObjects(clone(MOCK_APP_CONFIG), clone(MOCK_SKIN_2).appConfig)
    );
  });

  // TODO - add further tests for setSkin method and side-effects
});
