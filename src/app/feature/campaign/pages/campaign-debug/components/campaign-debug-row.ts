import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";

@Component({
  selector: "campaign-debug-row",
  template: ` <ion-item>
    <details style="width:100%">
      <summary class="row-header">
        <span>{{ row.id }}</span> <span style="float: right">Priority: {{ row.priority }}</span>
      </summary>
      <div class="row-content">
        <!-- Info -->
        <div style="flex:1">
          <!-- Click Action List -->
          <div *ngIf="row.action_list && row.action_list.length > 0">
            <div class="divider"></div>
            <h4>Click Action List</h4>
            <div style="display: flex" class="info-text">
              <div style="flex: 1">
                <div *ngFor="let action of row.action_list">{{ action._raw }}</div>
              </div>
            </div>
          </div>
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
        <!-- Actions -->
        <div style="display: flex; flex-direction: column;  justify-content: center;">
          <ion-button
            fill="clear"
            (click)="sendNotificationClicked.next(row)"
            class="no-padding"
            style="margin: 0"
            >Send Notification</ion-button
          >
          <ion-button
            expand="block"
            fill="clear"
            (click)="manageVariablesClicked.next(row)"
            class="action-button no-padding"
          >
            <ion-icon name="options-outline" slot="start"></ion-icon>
            Edit Variables
          </ion-button>
          <ion-button
            expand="block"
            fill="clear"
            (click)="logDebugInfo(row)"
            class="action-button no-padding"
          >
            <ion-icon slot="start" name="information-circle-outline"></ion-icon>
            log info
          </ion-button>
        </div>
      </div>
    </details>
  </ion-item>`,
  styles: [
    `
      ion-item {
        --background: white;
        --padding-start: 0;
        --padding-end: 0;
        --inner-padding-end: 0;
      }
      .action-button {
        margin: 8px 0 8px 8px;
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
      details[open] > summary {
        font-weight: bold;
      }
      .row-content {
        padding: 0px 16px 16px 16px;
        margin-top: -16px;
        display: flex;
      }
      .row-header {
        padding: 16px;
        width: 100%;
        background: white;
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
export class CampaignDebugRowComponent implements OnInit {
  @Input() row: FlowTypes.Campaign_listRow;
  @Output() manageVariablesClicked = new EventEmitter<FlowTypes.Campaign_listRow>();
  @Output() sendNotificationClicked = new EventEmitter<FlowTypes.Campaign_listRow>();
  constructor() {}

  ngOnInit() {}

  public logDebugInfo(row: FlowTypes.Campaign_listRow) {
    console.group(row.id);
    console.log(row);
    console.groupEnd();
  }
}
