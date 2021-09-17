import { Injectable } from "@angular/core";
import { addDays } from "@fullcalendar/angular";
import { addHours, addMinutes } from "date-fns";
import { FlowTypes } from "src/app/shared/model";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DATA_LIST } from "src/app/shared/services/data/data.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { arrayToHashmap, mergeArrayOfArrays, stringToIntegerHash } from "src/app/shared/utils";
type ICampaigns = {
  [campaign_id: string]: { id: string; schedule?: any; rows: FlowTypes.Campaign_listRow[] };
};

@Injectable({ providedIn: "root" })
export class CampaignService {
  campaigns: ICampaigns;

  constructor(
    private dataEvaluationService: DataEvaluationService,
    private localNotificationService: LocalNotificationService
  ) {
    this.loadCampaigns();
  }

  public async init() {
    this.loadCampaigns();
    // Note - not currently awaiting to allow faster initial load
    this.scheduleCampaignNotifications();
  }

  get scheduledCampaigns() {
    return Object.values(this.campaigns).filter((campaign) => campaign.schedule);
  }

  /**
   * Check all campaigns for those with notification schedules and evaluate
   * any notifications requiring scheduling
   */
  private async scheduleCampaignNotifications() {
    const scheduledCampaigns = this.scheduledCampaigns;
    for (const campaign of scheduledCampaigns) {
      const nextRow = await this.getNextCampaignRow(campaign.id);
      if (nextRow) {
        // remove any previous notification
        await this.deactiveCampaignNotifications(campaign.id);
        // add new notification
        await this.scheduleCampaignNotification(nextRow, campaign.id);
      }
    }
  }

  public async getNextCampaignRow(campaign_id: string) {
    // TODO - decide best way to handle keeping data fresh
    await this.dataEvaluationService.refreshDBCache();

    if (!this.campaigns[campaign_id]) {
      console.error("no data exists for campaign", campaign_id);
      return null;
    }
    const campaignRows = this.campaigns[campaign_id].rows;
    const evaluatedRows = [];
    for (const row of campaignRows) {
      const evaluatedRow = await this.evaluateCampaignRow(row);
      evaluatedRows.push(evaluatedRow);
      if (evaluatedRow._active) {
        console.log("[Campaign Next]", campaign_id, { evaluatedRow, evaluatedRows });
        return evaluatedRow;
      }
    }
    console.log("[Campaign Inactive]", campaign_id, { campaign_id, evaluatedRows });
    return null;
  }

  /**
   * Convert PLH notification schedule data and create local notification
   * @returns list of all currently scheduled notifications
   */
  public async scheduleCampaignNotification(row: FlowTypes.Campaign_listRow, campaign_id: string) {
    const { id, notification_schedule } = row;
    const { _schedule_at, text, title } = notification_schedule;
    return this.localNotificationService.scheduleNotification({
      schedule: { at: _schedule_at },
      body: text || "You have a new message from PLH",
      title: title || "Notification",
      extra: { ...row, campaign_id },
      id: stringToIntegerHash(id),
    });
  }

  /** Deactivate all notifications for a given campaign */
  private async deactiveCampaignNotifications(campaign_id: string) {
    const pendingNotifications = await this.localNotificationService.loadNotifications();
    const deactivatedNotifications = Object.values(pendingNotifications).filter(
      (n) => n.extra.campaign_id === campaign_id
    );
    for (const notification of deactivatedNotifications) {
      await this.localNotificationService.removeNotification(notification);
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
    if (row.notification_schedule) {
      row.notification_schedule = this.evaluateCampaignNotification(row.notification_schedule);
    }
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
