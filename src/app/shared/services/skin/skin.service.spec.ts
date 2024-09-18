import { TestBed } from "@angular/core/testing";

import { SkinService } from "./skin.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MockLocalStorageService } from "../local-storage/local-storage.service.spec";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.spec";
import { TemplateService } from "../../components/template/services/template.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { IAppConfig, IAppSkin } from "packages/data-models";

class MockThemeService implements Partial<ThemeService> {
  ready() {
    return true;
  }
  setTheme() {}
  getCurrentTheme() {
    return "mock_theme";
  }
}

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

  it("generates override and revert configs", () => {
    expect(service["revertOverride"]).toEqual({
      APP_HEADER_DEFAULTS: { title: "default", colour: "none" },
    });
  });

  it("reverts previous override when applying another skin", () => {
    // MOCK_SKIN_1 will already be applied on load
    const override = service["generateOverrideConfig"](MOCK_SKIN_2);
    // creates a deep merge of override properties on top of current
    expect(override).toEqual({
      APP_HEADER_DEFAULTS: {
        // revert changes only available in skin_1
        colour: "none",
        // apply changes from skin_2
        title: "mock 2",
        variant: "compact",
      },
    });
    const revert = service["generateRevertConfig"](MOCK_SKIN_2);

    // creates config revert to undo just the skin changes
    expect(revert).toEqual({
      APP_HEADER_DEFAULTS: {
        // only revert changes remaining from skin_2
        title: "default",
        variant: "default",
      },
    });
  });

  // TODO - add tests for setSkin method and side-effects
});
