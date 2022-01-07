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
export class ContextMenuModule {
  // ensure service intialised when module imported
  constructor(public contextMenuService: ContextMenuService) {}
}
