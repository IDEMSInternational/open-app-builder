import { Component, OnInit } from "@angular/core";
import { LocalNotification } from "@capacitor/core";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
})
export class NotificationsDebugPage implements OnInit {
  constructor(public localNotificationService: LocalNotificationService) {}

  ngOnInit() {
    this.localNotificationService.loadNotifications();
  }

  public async removeNotification(notification: LocalNotification) {
    await this.localNotificationService.removeNotification(notification);
  }

  public logDebugInfo(notification: LocalNotification) {
    console.group(notification.extra.id);
    console.log(notification);
    console.groupEnd();
  }
}
