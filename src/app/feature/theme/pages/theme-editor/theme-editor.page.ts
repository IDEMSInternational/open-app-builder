import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IAppConfig } from "data-models";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "plh-theme-editor-page",
  templateUrl: "./theme-editor.page.html",
  styleUrls: ["./theme-editor.page.scss"],
  standalone: false,
})
export class ThemeEditorPage implements OnInit {
  availableThemes: IAppConfig["APP_THEMES"]["available"];
  currentTheme: string;

  private destroyRef = inject(DestroyRef);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.availableThemes = this.themeService.availableThemes;
    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentTheme) => (this.currentTheme = currentTheme));
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}
