import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { CampaignService } from "../../../campaign.service";

@Component({
  selector: "campaign-schedule-debug-row",
  template: ` <ion-item>
    <details style="width:100%">
      <summary class="row-header">
        <span class="row-counter">{{ row._campaign_rows.length }}</span>
        <span style="flex:1; margin-left:10px">{{ row.id }}</span>
        <!-- TODO - could be calculated in parent and passed down -->
        <div
          *ngIf="
            campaignService.scheduledNotifications[row.id] | objectValues as scheduledNotifications
          "
        >
          <span class="next-notification" *ngIf="scheduledNotifications[0] as nextNotification">
            {{ nextNotification.schedule.at | date: "MMM d h:mm a" }}
            <ion-icon name="notifications"></ion-icon>
          </span>
        </div>

        <span class="tag activated" *ngIf="row._active">Active</span>
        <span class="tag deactivated" *ngIf="!row._active">Inactive</span>
      </summary>
      <div class="row-content">
        <!-- Info -->
        <div style="flex:1">
          <div style="flex:1">
            <!-- Activation -->
            <div *ngIf="row.activation_condition_list && row.activation_condition_list.length > 0">
              <div class="divider"></div>
              <h4>Activation</h4>
              <div
                *ngFor="let condition of row.activation_condition_list"
                class="condition-row info-text"
                (click)="manageVariablesClicked.next(row)"
              >
                <ion-checkbox [checked]="condition._satisfied" disabled></ion-checkbox>
                <span class="condition">{{ condition._raw }}</span>
              </div>
            </div>
            <!-- Deactivation -->
            <div
              *ngIf="row.deactivation_condition_list && row.deactivation_condition_list.length > 0"
            >
              <div class="divider"></div>
              <h4>Deactivation</h4>
              <div
                *ngFor="let condition of row.deactivation_condition_list"
                class="condition-row info-text"
                (click)="manageVariablesClicked.next(row)"
              >
                <ion-checkbox [checked]="condition._satisfied" disabled></ion-checkbox>
                <span class="condition">{{ condition._raw }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Actions -->
      <ion-button
        expand="block"
        fill="clear"
        (click)="logDebugInfo(row)"
        class="action-button no-padding"
      >
        <ion-icon slot="start" name="information-circle-outline"></ion-icon>
        Log Full Info
      </ion-button>
    </details>
  </ion-item>`,
  styles: [
    `
      .tag {
        padding: 4px;
        color: white;
        border-radius: 5px;
        font-size: smaller;
        text-align: center;
        font-weight: normal;
      }
      .tag.activated {
        background: hsl(130 40% 55%);
      }
      .tag.deactivated {
        background: hsl(0 100% 65%);
      }
      .next-notification {
        margin-right: 10px;
        font-size: smaller;
        color: #03598f;
      }
      .row-header {
        display: flex;
        padding: 16px;
        width: 100%;
        background: white;
        align-items: center;
      }
      .row-counter {
        min-width: 28px;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #787878;
        padding: 2px;
      }
      ion-item {
        --background: white;
        --padding-start: 0;
        --padding-end: 0;
        --inner-padding-end: 0;
      }
      .divider {
        height: 1em;
      }
      summary {
        list-style: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      .row-content {
        padding: 0px 16px 16px 16px;
        margin-top: -16px;
        display: flex;
      }
      .condition-row {
        display: flex;
        align-items: center;
      }
      .condition {
        margin-left: 8px;
      }
      h4 {
        margin-top: 8px;
        font-size: 16px;
      }
      ion-checkbox {
        margin: 0;
      }
      .info-text {
        font-size: small;
      }
    `,
  ],
})
export class CampaignScheduleDebugRowComponent implements OnInit {
  @Input() row: FlowTypes.Campaign_Schedule;
  @Output() manageVariablesClicked = new EventEmitter<FlowTypes.Campaign_Schedule>();
  @Output() triggerActionsClicked = new EventEmitter<FlowTypes.Campaign_Schedule>();
  @Output() scheduleNotificationClicked = new EventEmitter<FlowTypes.Campaign_Schedule>();
  constructor(public campaignService: CampaignService) {}

  ngOnInit() {}

  public logDebugInfo(row: FlowTypes.Campaign_Schedule) {
    console.group(row.id);
    console.log(row);
    console.groupEnd();
  }
}
