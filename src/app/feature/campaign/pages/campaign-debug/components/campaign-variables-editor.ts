import { AfterViewInit, Component, Input } from "@angular/core";
import { addDays } from "@fullcalendar/common";
import { ModalController } from "@ionic/angular";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FlowTypes } from "src/app/shared/model";
import { AppEventService } from "src/app/shared/services/app-events/app-events.service";
import {
  DataEvaluationService,
  IDataEvaluationCache,
} from "src/app/shared/services/data/data-evaluation.service";
import { DbService } from "src/app/shared/services/db/db.service";
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
    <ion-content class="ion-padding background-primary-lighter" *ngIf="dbData">
      <h4>DB Variables</h4>
      <ion-item>
        <ion-label>
          <span>First Launch</span>
          <span style="margin-left:8px">
            ({{ dbData.first_app_launch | calcDaysDiff }} days ago)
          </span>
        </ion-label>
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
      <ion-item *ngFor="let row of editorRows">
        <ion-label>{{ row.field }}</ion-label>
        <ion-datetime
          *ngIf="row.condition_type === 'db_lookup'"
          #fieldFirst
          placeholder="Set First"
          [value]="row.current_value_first"
          (ionChange)="setFieldFirst(row.field, row.current_value, fieldFirst.value)"
        ></ion-datetime>
        <ion-select
          #select
          [value]="row.current_value"
          (ionChange)="setFieldVariable(row.field, select.value)"
          [compareWith]="compareFieldValue"
          placeholder="Set Value"
        >
          <ion-select-option *ngFor="let value of row.condition_values">{{
            value
          }}</ion-select-option>
          <ion-select-option value="">(null)</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-content>`,
  styles: [
    `
      ion-item {
        --background: white;
      }
    `,
  ],
})
export class CampaignDebugVariablesEditorComponent implements AfterViewInit {
  @Input() campaignId: string = "";
  @Input() campaignRows: FlowTypes.Campaign_listRow[] = [];
  dbData: IDataEvaluationCache;
  constructor(
    public modalCtrl: ModalController,
    private templateService: TemplateService,
    private dataEvaluationService: DataEvaluationService,
    private appEvents: AppEventService,
    private dbService: DbService
  ) {}

  editorRows: IEditorRow[] = [];

  async ngAfterViewInit() {
    await this.loadDBData();
    this.editorRows = this.generateVariablesList(this.campaignRows);
  }

  private async loadDBData() {
    this.dbData = await this.dataEvaluationService.refreshDBCache();
  }

  public setFieldVariable(field: string, value: string) {
    if (value === "") {
      value = null;
    }
    this.templateService.setField(field, value);
  }

  public async setFieldFirst(field: string, fieldValue: string, firstDate: string) {
    // modify all db records so that first will have fixed timestamp
    const dbRef = this.dbService.table("data_events").where("name").equals(field);
    await dbRef.modify({ _created: generateTimestamp(firstDate) });
    await this.loadDBData();
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
        await this.loadDBData();
      }
    }
  }

  /**
   * Iterate over campaign list rows and extract all field evaluation and db_lookup conditions
   * For case of field evaluation or get_field:first (db lookup) populate a list of variables
   * used, current value, and values list to satisfy conditions
   *
   * NOTE - the method is a bit hacky as originally only designed to accomodate localstorage
   * variables but now also used for db get_first condition (and should be merged with other hardcoded db methods above)
   */
  private generateVariablesList(rows: FlowTypes.Campaign_listRow[]) {
    const contactFieldValues = this.loadFieldVariables();
    const fieldValues: { [field: string]: IEditorRow } = {};
    rows.forEach((row) => {
      const conditions = [...row.activation_condition_list, ...row.deactivation_condition_list];
      conditions.forEach((condition) => {
        const { condition_type, condition_args } = condition;
        let field: string;
        let condition_value: string;
        let current_value: any;
        let current_value_first: string;
        switch (condition_type) {
          // extract data from localStorage contact variables
          case "field_evaluation":
            field = condition_args.field_evaluation.field;
            condition_value = condition_args.field_evaluation.value;
            current_value = contactFieldValues[`rp-contact-field.${field}`];
            break;
          // extract data from db tables (currently data_events only)
          case "db_lookup":
            if (condition_args.db_lookup.table_id === "data_events") {
              field = condition_args.db_lookup.filter.field;
              condition_value = condition_args.db_lookup.filter.value;
              let allResults = this.dataEvaluationService.data.dbCache.data_events[field] || [];
              if (condition_args.db_lookup.order === "desc") {
                allResults = allResults.reverse();
              }
              current_value = allResults[0]?.value;
              current_value_first = allResults[0]?._created;
            }
            break;
        }
        if (field) {
          if (!fieldValues[field]) {
            fieldValues[field] = {
              condition_values: [],
              condition_type,
              current_value,
              field,
              current_value_first,
            };
          }
          if (!fieldValues[field].condition_values.includes(condition_value)) {
            fieldValues[field].condition_values.push(condition_value);
          }
        }
      });
    });
    const variablesWithRecommendedValues: IEditorRow[] = [];
    Object.keys(fieldValues)
      .sort()
      .forEach((field) => {
        variablesWithRecommendedValues.push(fieldValues[field]);
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
  current_value: string;
  current_value_first: string;
  condition_values: string[];
  condition_type: FlowTypes.DataEvaluationCondition["condition_type"];
};
