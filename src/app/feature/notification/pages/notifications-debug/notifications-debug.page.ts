import { Component, OnInit } from "@angular/core";
import { LocalNotification } from "@capacitor/core";
import { IonDatetime } from "@ionic/angular";
import { addSeconds } from "date-fns";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
})
export class NotificationsDebugPage implements OnInit {
  public editableNotification: LocalNotification;

  constructor(public localNotificationService: LocalNotificationService) {}

  async ngOnInit() {
    await this.localNotificationService.loadNotifications();
    this.localNotificationService.notifications$.subscribe((notification) => {
      console.log("local notification received", notification);
    });
  }

  /**
   *
   * @param notification
   * @param delay - number of seconds to delay sending notification (default 3s)
   * @param forceBackground - number of seconds to delay sending notification (default 3s)
   */
  public previewNotification(notification: LocalNotification) {
    return this.localNotificationService.previewNotification(notification);
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
