import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { SharedPipesModule } from "src/app/shared/pipes";
import { NotificationsRoutingModule } from "./notification-routing.module";
import { NotificationsDebugPage } from "./pages/notifications-debug/notifications-debug.page";
import { NotificationDebugRowComponent } from "./pages/notifications-debug/components/notification-debug-row.component";
import { NotificationDebugInteractedRowComponent } from "./pages/notifications-debug/components/notification-debug-interacted-row.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotificationsRoutingModule, SharedPipesModule],
  declarations: [
    NotificationsDebugPage,
    NotificationDebugRowComponent,
    NotificationDebugInteractedRowComponent,
  ],
})
export class NotificationsModule {}
