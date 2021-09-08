import { Component, OnInit } from "@angular/core";
import { LocalNotification } from "@capacitor/core";
import { IonDatetime } from "@ionic/angular";
import { timer } from "rxjs";
import { map, take } from "rxjs/operators";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
})
export class NotificationsDebugPage implements OnInit {
  public editableNotification: LocalNotification;
  public previewCountdown: { [id: number]: number } = {};

  constructor(public localNotificationService: LocalNotificationService) {}

  async ngOnInit() {
    await this.localNotificationService.loadNotifications();
    this.localNotificationService.notifications$.subscribe((notification) => {
      console.log("local notification received", notification);
      // TODO - show status and add button to enable
    });
  }

  /**
   * Schedule a duplicate notification to be triggered after 2s as a preview
   * @param notification
   */
  public async previewNotification(notification: LocalNotification) {
    const delaySeconds = 3;
    const { id } = await this.localNotificationService.previewNotification(
      notification,
      delaySeconds + 1
    );
    timer(1000, 1000)
      .pipe(map((i) => delaySeconds - i))
      .pipe(take(delaySeconds + 1))
      .subscribe((v) => {
        this.previewCountdown[id] = v;
        if (v === 0) {
          this.localNotificationService.loadNotifications();
        }
      });
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
