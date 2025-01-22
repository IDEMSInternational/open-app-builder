import { BehaviorSubject } from "rxjs";
import { ThemeService } from "./theme.service";
import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.spec";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";

export class MockThemeService extends ThemeService {
  constructor() {
    super(
      new MockLocalStorageService() as unknown as LocalStorageService,
      new MockAppConfigService({
        APP_THEMES: { available: ["mock_theme"], defaultThemeName: "mock_theme" },
      }) as unknown as AppConfigService
    );
  }

  currentTheme$ = new BehaviorSubject<string>("mock_theme");
}
