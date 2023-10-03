import { Component, Input } from "@angular/core";
import { ILocalNotificationInteractionDB } from "src/app/shared/services/notification/local-notification-interaction.service";

@Component({
  selector: "notification-debug-interacted-row",
  template: ` <!-- Notification -->
    <ion-item>
      <details style="width: 100%">
        <summary class="row-header">
          <div style="flex:1">
            <div>
              <div>
                {{ notification.notification_meta?.title }}
              </div>
              <div class="info-text">{{ notification.notification_meta?.id }}</div>
            </div>
          </div>
          <div>
            <div class="next-notification" style="color:grey">
              {{ notification.schedule_timestamp | date : "MMM d h:mm a" }}
            </div>
            <div style="margin-top:0.5em; text-align:right">
              <span class="tag action" *ngIf="notification.action_id">
                {{ notification.action_id }}
              </span>
            </div>
            <div class="info-text" style="color:grey">DB: {{ notification._sync_status }}</div>
          </div>
        </summary>
        <!-- Notification -->
        <div class="row-content">
          <div style="flex: 1; margin-right: 8px">
            <div class="divider"></div>
            <div>{{ notification.notification_meta?.text }}</div>
          </div>
          <div style="text-align: right">
            <div class="divider"></div>
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
export class NotificationDebugInteractedRowComponent {
  public previewCountdown: number;

  @Input() notification: ILocalNotificationInteractionDB;

  public logDebugInfo(notification: ILocalNotificationInteractionDB) {
    console.group(notification.notification_meta.id);
    console.log(notification);
    console.groupEnd();
  }
}
