import { Component } from "@angular/core";
import { IonDatetime } from "@ionic/angular";
import { timer } from "rxjs";
import { map, take } from "rxjs/operators";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
})
export class NotificationsDebugPage {
  public editableNotification: ILocalNotification;
  public previewCountdown: { [id: number]: number } = {};

  constructor(public localNotificationService: LocalNotificationService) {}

  /**
   * Reschedule a notification to be triggered after 2s
   * Create a countdown timer to inform the user of the pending notification
   * in case they want to test with app closed
   * @param notification
   */
  public async triggerSend(notification: ILocalNotification) {
    const delaySeconds = 3;
    await this.localNotificationService.scheduleImmediateNotification(
      notification,
      delaySeconds + 1
    );
    timer(1000, 1000)
      .pipe(map((i) => delaySeconds - i))
      .pipe(take(delaySeconds + 1))
      .subscribe((v) => {
        this.previewCountdown[notification.id] = v;
      });
  }

  public async removeNotification(notification: ILocalNotification) {
    await this.localNotificationService.removeNotification(notification.id);
  }

  public showCustomNotificationSchedule(notification: ILocalNotification, picker: IonDatetime) {
    this.editableNotification = notification;
    const pickerValue = new Date(notification.schedule.at).toISOString();
    picker.value = pickerValue;
    picker.open();
  }

  public async setCustomNotificationSchedule(pickerValue: string) {
    if (this.editableNotification) {
      this.editableNotification.schedule.at = new Date(pickerValue);
      await this.localNotificationService.scheduleNotification(this.editableNotification as any);
      // await this.localNotificationService.loadNotifications();
    }
  }

  public logDebugInfo(notification: ILocalNotification) {
    console.group(notification.extra.id);
    console.log(notification);
    console.groupEnd();
  }
}
