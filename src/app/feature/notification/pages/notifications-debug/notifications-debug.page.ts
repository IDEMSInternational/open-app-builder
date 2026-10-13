import { Component, effect, OnInit, ViewChild } from "@angular/core";
import { IonDatetime, IonModal } from "@ionic/angular";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import type { ILocalNotificationInteraction } from "src/app/shared/services/notification/local-notification-persist.adapter";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";
import { NotificationService } from "../../notification.service";

@Component({
  templateUrl: "./notifications-debug.page.html",
  styleUrls: ["./notifications-debug.page.scss"],
  standalone: false,
})
export class NotificationsDebugPage implements OnInit {
  public editableNotification: ILocalNotification;
  pickerValue: string;
  pickerMin = new Date().toISOString().substring(0, 10);
  @ViewChild("picker", { static: false }) datetime: IonDatetime;
  @ViewChild("datetimePickerModal", { static: true }) datetimePickerModal: IonModal;

  constructor(
    public localNotificationService: LocalNotificationService,
    public notificationService: NotificationService,
    private dbSyncService: DBSyncService
  ) {
    // Mirror permission status to legacy service, as required for debug notification sends.
    // Note - legacy service init processes (e.g. interaction listeners) will still only run
    // following next app launch if permission was not granted at launch
    effect(() => {
      this.localNotificationService.permissionGranted =
        this.notificationService.status() === "granted";
    });
  }
  async ngOnInit() {
    await this.dbSyncService.ready();
    await this.localNotificationService.ready();
  }

  public get dbEntries$() {
    return this.localNotificationService.persistAdapter.dbEntries$;
  }

  /** Request permission via same method as authored `notification: request_permission` action */
  public async requestPermission() {
    await this.notificationService.requestPermission();
  }

  public async syncInteractedNotifications() {
    await this.dbSyncService.syncTable("local_notifications_interaction");
    await this.localNotificationService.persistAdapter.loadInteractedNotifications();
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
      await this.localNotificationService.scheduleNotification(
        this.editableNotification as any,
        this.editableNotification._row_id
      );
    }
  }
  public logDebugInfo(notification: ILocalNotificationInteraction) {
    console.group(notification.notification_id);
    console.log(notification);
    console.groupEnd();
  }
}
