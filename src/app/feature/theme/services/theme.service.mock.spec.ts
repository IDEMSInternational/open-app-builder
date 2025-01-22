import { ThemeService } from "./theme.service";

export class MockThemeService implements Partial<ThemeService> {
  ready() {
    return true;
  }
  setTheme() {}
  getCurrentTheme() {
    return "mock_theme";
  }
}
