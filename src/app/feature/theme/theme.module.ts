import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ColorSketchModule } from "ngx-color/sketch";
import { ThemeRoutingModule } from "./theme-routing.module";
import { ThemeEditorPage } from "./pages/theme-editor/theme-editor.page";
import { CssVariableTableComponent } from "./components/css-variable-table/css-variable-table.component";
import { ColourPaletteComponent } from "./components/colour-palette/colour-palette.component";

const Pages = [ThemeEditorPage];
const Components = [CssVariableTableComponent, ColourPaletteComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ThemeRoutingModule, ColorSketchModule],
  exports: [],
  declarations: [...Pages, ...Components],
  providers: [],
})
export class ThemeModule {}
