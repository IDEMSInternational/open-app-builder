import { TestBed } from "@angular/core/testing";

import { ThemeService } from "./theme.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.spec";
import { IAppConfig } from "packages/data-models";

export class MockThemeService implements Partial<ThemeService> {
  ready() {
    return true;
  }
  setTheme() {}
  getCurrentTheme() {
    return "mock_theme";
  }
}

const MOCK_APP_CONFIG: Partial<IAppConfig> = {
  APP_THEMES: {
    available: ["MOCK_THEME_1", "MOCK_THEME_2"],
    defaultThemeName: "MOCK_THEME_1",
  },
};

describe("ThemeService", () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: new MockLocalStorageService() },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(MOCK_APP_CONFIG),
        },
      ],
    });
    service = TestBed.inject(ThemeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
