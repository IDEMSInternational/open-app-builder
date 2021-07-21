import { Component, Input, OnInit } from "@angular/core";
import { addDays } from "@fullcalendar/common";
import { ModalController } from "@ionic/angular";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FlowTypes } from "src/app/shared/model";
import { AppEventService } from "src/app/shared/services/app-events/app-events.service";
import {
  DataEvaluationService,
  IDataEvaluationCache,
} from "src/app/shared/services/data/data-evaluation.service";
import { generateTimestamp } from "src/app/shared/utils";

@Component({
  template: `<ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="end">
          <ion-button (click)="modalCtrl.dismiss()">
            <ion-icon slot="start" name="close-outline"></ion-icon>
            Close
          </ion-button>
        </ion-buttons>
        <ion-title>{{ campaignId }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding background-primary-lighter">
      <h4>App Settings</h4>
      <ion-item>
        <ion-label>First Launch</ion-label>
        <ion-datetime
          #firstLaunch
          (ionChange)="setAppLaunchData(firstLaunch.value, appDay.value)"
          [value]="dbData.first_app_launch"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>App Day</ion-label>
        <ion-input
          #appDay
          type="number"
          [value]="dbData.app_day"
          style="text-align: right"
          (ionBlur)="setAppLaunchData(firstLaunch.value, appDay.value)"
        ></ion-input>
      </ion-item>
      <h4>Field Variables</h4>
      <ion-list>
        <ion-item *ngFor="let row of editorRows">
          <ion-label>{{ row.field }}</ion-label>
          <ion-select
            #select
            [value]="row.value"
            (ionBlur)="setFieldVariable(row.field, select.value)"
            [compareWith]="compareFieldValue"
          >
            <ion-select-option *ngFor="let value of row.values_list">{{ value }}</ion-select-option>
            <ion-select-option value="">(null)</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>`,
})
export class CampaignDebugVariablesEditorComponent implements OnInit {
  @Input() campaignId: string = "";
  @Input() campaignRows: FlowTypes.Campaign_listRow[] = [];
  dbData: IDataEvaluationCache = {} as any;
  constructor(
    public modalCtrl: ModalController,
    private templateService: TemplateService,
    private dataEvaluationService: DataEvaluationService,
    private appEvents: AppEventService
  ) {}

  editorRows: IEditorRow = [];

  async ngOnInit() {
    this.dbData = await this.dataEvaluationService.refreshDBCache();
    this.editorRows = this.generateVariablesList(this.campaignRows);
  }

  public setFieldVariable(field: string, value: string) {
    if (value === "") {
      value = null;
    }
    this.templateService.setField(field, value);
  }

  /**
   * Remove all existing db launch events and new entries to satisfy the given firstLaunch and total appDay parameters
   */
  public async setAppLaunchData(firstLaunch: string, appDay: string | number) {
    if (firstLaunch && appDay) {
      appDay = Number(appDay);
      if (firstLaunch !== this.dbData.first_app_launch || appDay !== this.dbData.app_day) {
        // clear previous data
        await this.appEvents.deleteAppEvents("app_launch");
        // create app event entries for each day from first launch to total app days
        for (let i = 1; i <= appDay; i++) {
          let launchDate = addDays(new Date(firstLaunch), i);
          // ensure last entry is for today
          if (i === appDay && appDay > 1) {
            launchDate = new Date();
          }
          const launchTimestamp = generateTimestamp(launchDate);
          await this.appEvents.recordAppEvent("app_launch", {
            _created: launchTimestamp,
          });
        }
      }
    }

    this.dbData = await this.dataEvaluationService.refreshDBCache();
  }

  /**
   *
   * @returns
   */
  private generateVariablesList(rows: FlowTypes.Campaign_listRow[]) {
    const currentValues = this.loadFieldVariables();
    const fieldValues = {};
    rows.forEach((row) => {
      const conditions = [...row.activation_condition_list, ...row.deactivation_condition_list];
      conditions.forEach((condition) => {
        const { condition_type, condition_args } = condition;
        switch (condition_type) {
          case "field_evaluation":
            const { field, value } = condition_args.field_evaluation;
            if (!fieldValues[field]) {
              fieldValues[field] = {};
            }
            fieldValues[field][value] = value;
            break;
          case "db_lookup":
            break;
          default:
            break;
        }
      });
    });
    const variablesWithRecommendedValues: IEditorRow = [];
    Object.keys(fieldValues)
      .sort()
      .forEach((field) => {
        variablesWithRecommendedValues.push({
          field,
          values_list: Object.values(fieldValues[field]),
          value: currentValues[`rp-contact-field.${field}`],
        });
      });
    return variablesWithRecommendedValues;
  }

  private loadFieldVariables() {
    // retrieve local storage keys in the same way they would be populated in a template
    const fields = {};
    Object.keys(localStorage).forEach(
      (key) => (fields[key] = this.templateService.getField(key.replace("rp-contact-field.", "")))
    );
    return fields;
  }

  /**
   * When select box compares values the current value will be read as a string,
   * so compare as string so 'true' matches true
   */
  public compareFieldValue(o1: string, o2: any) {
    return `${o1}` === `${o2}`;
  }
}
type IEditorRow = {
  field: string;
  value: string;
  values_list: string[];
}[];
