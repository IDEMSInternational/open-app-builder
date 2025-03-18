import { BehaviorSubject } from "rxjs";
import { ThemeService } from "./theme.service";
import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.mock.spec";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";

export class MockThemeService extends ThemeService {
  constructor() {
    super(
      new MockLocalStorageService(),
      new MockAppConfigService({
        APP_THEMES: { available: ["mock_theme"], defaultThemeName: "mock_theme" },
      }) as unknown as AppConfigService
    );
  }

  currentTheme$ = new BehaviorSubject<string>("mock_theme");
}
