import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { ContextMenuComponent } from "./context-menu.component";
import { ContextMenuService } from "./context-menu.service";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ContextMenuComponent],
})
/**
 * The contextMenuModule handles tracking events such as right-click and text selection that can
 * be used to trigger a custom context menu, allowing for registered actions to be made available.
 * This should be imported into main app.module to allow tracking across the app
 */
export class ContextMenuModule {
  // ensure service intialised when module imported
  constructor(public contextMenuService: ContextMenuService) {}
}
