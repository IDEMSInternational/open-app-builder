import { Component, ViewChild } from "@angular/core";
import { IonDatetime, IonModal } from "@ionic/angular";
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
  pickerValue: string;
  pickerMin = new Date().toISOString().substring(0, 10);
  @ViewChild("picker", { static: false }) datetime: IonDatetime;
  @ViewChild("datetimePickerModal", { static: true }) datetimePickerModal: IonModal;

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

  public async showCustomNotificationSchedule(notification: ILocalNotification) {
    this.editableNotification = notification;
    this.pickerValue = new Date(notification.schedule.at).toISOString();
    await this.datetimePickerModal.present();
  }

  public async setCustomNotificationSchedule(pickerValue: string) {
    this.pickerValue = pickerValue;
    if (this.editableNotification) {
      this.editableNotification.schedule.at = new Date(pickerValue);
      await this.localNotificationService.scheduleNotification(this.editableNotification as any);
    }
  }

  public logDebugInfo(notification: ILocalNotification) {
    console.group(notification.extra.id);
    console.log(notification);
    console.groupEnd();
  }
}
