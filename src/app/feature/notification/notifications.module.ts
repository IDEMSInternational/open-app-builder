import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { SharedPipesModule } from "src/app/shared/pipes";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NotificationsDebugPage } from "./pages/notifications-debug/notifications-debug.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotificationsRoutingModule, SharedPipesModule],
  declarations: [NotificationsDebugPage],
})
export class NotificationsModule {}
