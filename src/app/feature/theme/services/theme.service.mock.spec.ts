import { BehaviorSubject } from "rxjs";
import { ThemeService } from "./theme.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { SystemVariableService } from "src/app/shared/services/system-variable/system-variable.service";

const MOCK_SYSTEM_VARIABLE_SERVICE = {
  set: () => {},
  get: () => null,
  remove: () => {},
} as unknown as SystemVariableService;

export class MockThemeService extends ThemeService {
  constructor() {
    super(
      new MockAppConfigService({
        APP_THEMES: { available: ["mock_theme"], defaultThemeName: "mock_theme" },
      }) as unknown as AppConfigService,
      MOCK_SYSTEM_VARIABLE_SERVICE
    );
  }

  currentTheme$ = new BehaviorSubject<string>("mock_theme");
}
