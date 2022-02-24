import { Component, ViewChild } from "@angular/core";
import { IonDatetime, IonModal } from "@ionic/angular";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import {
  ILocalNotificationInteraction,
  LocalNotificationInteractionService,
} from "src/app/shared/services/notification/local-notification-interaction.service";
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
  pickerValue: string;
  pickerMin = new Date().toISOString().substring(0, 10);
  @ViewChild("picker", { static: false }) datetime: IonDatetime;
  @ViewChild("datetimePickerModal", { static: true }) datetimePickerModal: IonModal;

  constructor(
    public localNotificationService: LocalNotificationService,
    public localNotificationInteractionService: LocalNotificationInteractionService,
    private dbSyncService: DBSyncService
  ) {}

  public async syncInteractedNotifications() {
    await this.dbSyncService.syncTable("local_notifications_interaction");
    await this.localNotificationInteractionService.loadInteractedNotifications();
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
  public logDebugInfo(notification: ILocalNotificationInteraction) {
    console.group(notification.notification_meta.id);
    console.log(notification);
    console.groupEnd();
  }
}
