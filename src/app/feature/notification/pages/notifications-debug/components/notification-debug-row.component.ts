import { Component, EventEmitter, Input, Output } from "@angular/core";
import { timer } from "rxjs";
import { map, take } from "rxjs/operators";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";

@Component({
  selector: "notification-debug-row",
  template: ` <!-- Notification -->
    <ion-item>
      <details style="width: 100%">
        <summary class="row-header">
          <div style="flex:1">
            <div>
              <div>
                {{ notification.extra.title }}
              </div>
              <div class="info-text">{{ notification.extra.id }}</div>
            </div>
          </div>
          <div class="next-notification">
            {{ notification.schedule.at | date: "MMM d h:mm a" }}
            <ion-icon name="notifications"></ion-icon>
          </div>
        </summary>
        <!-- Notification -->
        <div class="row-content">
          <div style="flex: 1; margin-right: 8px">
            <div class="divider"></div>

            <div>{{ notification.extra.text }}</div>
          </div>
          <div style="text-align: right">
            <div class="divider"></div>
            <ion-button
              fill="clear"
              (click)="triggerSend(notification)"
              class="no-padding"
              style="margin: 0"
              [disabled]="
                !localNotificationService.permissionGranted || previewCountdown ? true : false
              "
            >
              <span *ngIf="previewCountdown">Send in {{ previewCountdown }}</span>
              <span *ngIf="!previewCountdown">Send Now</span>
            </ion-button>
          </div>
        </div>

        <ion-button fill="clear" (click)="logDebugInfo(notification)"
          >(log full details)</ion-button
        >
      </details>
    </ion-item>`,
  // Notification  interacted
  styleUrls: ["./notification-debug-row.scss"],
})
export class NotificationDebugRowComponent {
  public previewCountdown: number;

  @Input() notification: ILocalNotification;
  @Output() showNotificationScheduleClicked = new EventEmitter<ILocalNotification>();

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
        this.previewCountdown = v;
      });
  }

  public logDebugInfo(notification: ILocalNotification) {
    console.group(notification.id);
    console.log(notification);
    console.groupEnd();
  }
}
