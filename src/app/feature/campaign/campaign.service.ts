import { Injectable } from "@angular/core";
import { addDays } from "@fullcalendar/angular";
import { addHours, addMinutes } from "date-fns";
import { APP_STRINGS } from "packages/data-models/constants";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { FlowTypes } from "src/app/shared/model";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DATA_LIST } from "src/app/shared/services/data/data.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import {
  arrayToHashmap,
  mergeArrayOfArrays,
  randomElementFromArray,
  stringToIntegerHash,
} from "src/app/shared/utils";
type ICampaigns = {
  [campaign_id: string]: { id: string; schedule?: any; rows: FlowTypes.Campaign_listRow[] };
};

@Injectable({ providedIn: "root" })
export class CampaignService {
  campaigns: ICampaigns;
  private _handledNotifications = {};

  constructor(
    private dataEvaluationService: DataEvaluationService,
    private localNotificationService: LocalNotificationService,
    private translateService: TemplateTranslateService,
    private templateService: TemplateService
  ) {}

  public async init() {
    this.loadCampaigns();
    await this.scheduleCampaignNotifications();
    // Note - not currently awaiting to allow faster initial load
    console.log("[Campaigns]", this.campaigns);
    // await this.handledTriggeredNotifications();
    // add subscription to also process on update
    this.localNotificationService.notificationsUpdated$.subscribe(async () => {
      await this.handledTriggeredNotifications();
    });
  }

  get scheduledCampaigns() {
    return Object.values(this.campaigns).filter((campaign) => campaign.schedule);
  }

  private async handledTriggeredNotifications() {
    for (const notification of this.localNotificationService.triggeredNotifications) {
      if (!this._handledNotifications[notification.id]) {
        this._handledNotifications[notification.id] = true;
        this.triggerRowActions(notification.extra);
        // reschedule if actions handled, allow time for notifications to be loaded
        setTimeout(async () => {
          await this.scheduleCampaignNotifications();
        }, 200);
      }
    }
  }

  /**
   *
   * @param row
   * TODO - find better way to link with template actions
   * TODO - find way to identify any named action list (not just click_action_list)
   */
  public triggerRowActions(row: FlowTypes.Campaign_listRow) {
    if (row.click_action_list) {
      for (const action of row.click_action_list) {
        if (action.action_id === "set_field") {
          const [key, value] = action.args;
          this.templateService.setField(key, value);
        } else {
          console.error("Only set_field actions supported by debugger");
        }
      }
    }
  }

  /**
   * Check all campaigns for those with notification schedules and evaluate
   * any notifications requiring scheduling
   */
  private async scheduleCampaignNotifications() {
    const scheduledCampaigns = this.scheduledCampaigns;
    for (const campaign of scheduledCampaigns) {
      // remove any previous notification
      await this.deactiveCampaignNotifications(campaign.id);
      const nextRow = await this.getNextCampaignRow(campaign.id);
      if (nextRow) {
        // add new notification
        await this.scheduleCampaignNotification(nextRow, campaign.id);
      }
    }
  }

  /**
   * Select the highest priority row for a given campaign that satisfies all activation/deactivation
   * criteria. In the case of multiple equal priority rows, return at random
   */
  public async getNextCampaignRow(campaign_id: string) {
    // TODO - decide best way to handle keeping data fresh
    await this.dataEvaluationService.refreshDBCache();

    if (!this.campaigns[campaign_id]) {
      console.error("no data exists for campaign", campaign_id);
      return null;
    }
    const campaignRows = this.campaigns[campaign_id].rows.sort((a, b) => b.priority - a.priority);
    const satisfiedRows: FlowTypes.Campaign_listRow[] = [];
    // Iterate over campaign rows in order of priority. If row satisfies conditions set as new benchmark priority
    let benchmarkRowPriority = -Infinity;
    for (const row of campaignRows) {
      if (!row.hasOwnProperty("priority")) row.priority = -Infinity;
      if (row.priority >= benchmarkRowPriority) {
        const evaluated = await this.evaluateCampaignRow(row);
        if (evaluated._active) {
          // set current row as new bar for activation processing
          benchmarkRowPriority = row.priority;
          satisfiedRows.push(evaluated);
        }
      }
    }
    // return row at random from list of all rows that matched the final benchmark priority
    const highestPriorityRows = satisfiedRows.filter((row) => row.priority >= benchmarkRowPriority);
    const selectedRow = randomElementFromArray(highestPriorityRows);

    // console.log("[Campaign Next]", campaign_id, { campaignRows, selectedRow, satisfiedRows });
    return selectedRow;
  }

  /**
   * Convert PLH notification schedule data and create local notification
   * @returns list of all currently scheduled notifications
   */
  public async scheduleCampaignNotification(row: FlowTypes.Campaign_listRow, campaign_id: string) {
    // HACK - currently campaign schedules can either be defined within campaign rows or
    // within a notification_schedule data list. Merge together.

    // TODO - cc 2021-09-17 - might be better to refactor so all defined in schedule, although
    // possibly requires revisit of how translations handled also
    const campaignSchedule = this.campaigns[campaign_id]?.schedule || {};
    const rowSchedule = row.notification_schedule || {};
    const notification_schedule = this.evaluateCampaignNotification({
      ...campaignSchedule,
      ...rowSchedule,
    });

    let { _schedule_at, text, title } = notification_schedule;

    title = this.translateService.translateValue(title || APP_STRINGS.NOTIFICATION_DEFAULT_TITLE);
    text = this.translateService.translateValue(text || APP_STRINGS.NOTIFICATION_DEFAULT_TEXT);

    return this.localNotificationService.scheduleNotification({
      schedule: { at: _schedule_at },
      body: text,
      title,
      extra: { ...row, campaign_id },
      id: stringToIntegerHash(row.id),
    });
  }

  /** Deactivate all notifications for a given campaign */
  private async deactiveCampaignNotifications(campaign_id: string) {
    const pendingNotifications = this.localNotificationService.pendingNotifications;
    const deactivatedNotifications = pendingNotifications.filter(
      (n) => n.extra.campaign_id === campaign_id
    );
    for (const notification of deactivatedNotifications) {
      await this.localNotificationService.removeNotification(notification.id);
    }
  }

  /**
   * Get a list of all campaign rows collated by campaign_id, with merged notification schedules
   * TODO - most of this logic could be handled in parser instead
   */
  private loadCampaigns() {
    // get list of notification schedules for merging with rows
    const notificationScheduleRows = DATA_LIST.filter(
      (list) => list.flow_subtype === "notification_schedule"
    ).map((list) => list.rows);
    const allCNotificationSchedules = mergeArrayOfArrays(notificationScheduleRows);
    const notificationSchedulesById = arrayToHashmap(allCNotificationSchedules, "id");

    // merge all campaign_row data lists
    const campaignListRows = DATA_LIST.filter((list) =>
      ["campaign_rows", "campaign_rows_debug"].includes(list.flow_subtype)
    ).map((list) => list.rows);

    const allCampaignRows: FlowTypes.Campaign_listRow[] = mergeArrayOfArrays(campaignListRows);
    const allCampaignRowsByPriority = allCampaignRows.sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );
    const campaignsById: ICampaigns = {};
    allCampaignRowsByPriority.forEach((row) => {
      const campaign_list = row.campaign_list || [];
      campaign_list.forEach((campaign_id) => {
        if (!campaignsById[campaign_id]) {
          campaignsById[campaign_id] = { id: campaign_id, rows: [] };
          // merge notification schedule
          if (notificationSchedulesById[campaign_id]) {
            campaignsById[campaign_id].schedule = notificationSchedulesById[campaign_id];
          }
        }
        campaignsById[campaign_id].rows.push(row);
      });
    });
    this.campaigns = campaignsById;
  }

  public async evaluateCampaignRow(row: FlowTypes.Campaign_listRow) {
    const deactivation_condition_list = row.deactivation_condition_list || [];
    row.deactivation_condition_list = await Promise.all(
      deactivation_condition_list.map(async (condition) => {
        const _satisfied = await this.evaluateCondition(condition);
        return { ...condition, _satisfied };
      })
    );
    const activation_condition_list = row.activation_condition_list || [];
    row.activation_condition_list = await Promise.all(
      activation_condition_list.map(async (condition) => {
        const _satisfied = await this.evaluateCondition(condition);
        return { ...condition, _satisfied };
      })
    );
    row._activated = row.activation_condition_list.every((c) => c._satisfied === true);
    row._deactivated = row.deactivation_condition_list.some((c) => c._satisfied === true);
    // assume active if all activation criteria met and no deactivation criteria satisfied
    row._active = row._activated && !row._deactivated;
    return row;
  }

  private evaluateCampaignNotification(schedule: FlowTypes.NotificationSchedule) {
    const { time, delay } = schedule;
    let d = new Date();
    if (time) {
      d.setHours(Number(time.hour || d.getHours()));
      d.setMinutes(Number(time.minute || d.getMinutes()));
    }
    if (delay) {
      d = addDays(d, Number(delay.days || 0));
      d = addHours(d, Number(delay.hours || 0));
      d = addMinutes(d, Number(delay.minutes || 0));
    }
    schedule._schedule_at = d;
    return schedule;
  }

  private evaluateCondition(condition: FlowTypes.DataEvaluationCondition) {
    return this.dataEvaluationService.evaluateReminderCondition(condition);
  }
}
