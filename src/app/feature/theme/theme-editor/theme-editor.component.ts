import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme-service/theme.service';
import { AppTheme, ThemeColor } from '../theme.model';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'plh-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss'],
})
export class ThemeEditorComponent {

  public themes: AppTheme[] = [];
  public currentTheme: AppTheme;

  public colors: (ThemeColor & { expanded: boolean })[] = [];

  public selectedColor: ThemeColor;

  constructor(private themeService: ThemeService) {
      this.themes = this.themeService.getThemes();
      this.currentTheme = this.themeService.getCurrentTheme();
      this.selectThemeName(this.currentTheme.name);
  }

  selectThemeName(themeName: string) {
    this.currentTheme = this.themes.find((t) => t.name === themeName);
    this.themeService.setCurrentTheme(themeName);
    this.colors = Object.keys(this.currentTheme.colors).map((colorId) => {
      this.currentTheme.colors[colorId].id = colorId;
      return this.currentTheme.colors[colorId];
    });
  }

  toggleExpanded(color: (ThemeColor & { expanded: boolean })) {
    color.expanded = !color.expanded;
    if (color.expanded) {
      for (let col of this.colors) {
        if (col !== color) {
          col.expanded = false;
        }
      }
    }
  }

  changeColorComplete(event: ColorEvent, color: ThemeColor, isLight = true) {
    console.log("Color change event ", event);
    if (isLight) {
      this.currentTheme.colors[color.id].lightValue = event.color.hex;
    } else {
      this.currentTheme.colors[color.id].darkValue = event.color.hex;
    }
    this.themeService.updateTheme(this.currentTheme);
  }

  onColorSectionClick(event, color: ThemeColor) {
    console.log("Color section click", event, color);
    this.selectedColor = color;
  }

}
