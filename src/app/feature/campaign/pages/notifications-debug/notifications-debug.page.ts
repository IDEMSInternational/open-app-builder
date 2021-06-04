import { Component, OnInit } from "@angular/core";
import { LocalNotification } from "@capacitor/core";
import { IonDatetime } from "@ionic/angular";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
})
export class NotificationsDebugPage implements OnInit {
  public editableNotification: LocalNotification;

  constructor(public localNotificationService: LocalNotificationService) {}

  ngOnInit() {
    this.localNotificationService.loadNotifications();
  }

  public async removeNotification(notification: LocalNotification) {
    await this.localNotificationService.removeNotification(notification);
  }

  public showCustomNotificationSchedule(notification: LocalNotification, picker: IonDatetime) {
    this.editableNotification = notification;
    const pickerValue = new Date(notification.schedule.at).toISOString();
    picker.value = pickerValue;
    picker.open();
  }

  public async setCustomNotificationSchedule(pickerValue: string) {
    if (this.editableNotification) {
      this.editableNotification.schedule.at = new Date(pickerValue);
      await this.localNotificationService.scheduleNotification(this.editableNotification as any);
      await this.localNotificationService.loadNotifications();
    }
  }

  public logDebugInfo(notification: LocalNotification) {
    console.group(notification.extra.id);
    console.log(notification);
    console.groupEnd();
  }
}
