import { NgModule } from "@angular/core";

import { NotificationsRoutingModule } from "./notification-routing.module";
import { NotificationService } from "./notification.service";

@NgModule({
  imports: [NotificationsRoutingModule],
})
export class NotificationsModule {
  // include service so that constructor is instantiated and immediately registers action handlers and listeners
  constructor(service: NotificationService) {}
}
