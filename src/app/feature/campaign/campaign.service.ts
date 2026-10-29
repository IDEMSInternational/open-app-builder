import { inject, Injectable, Injector } from "@angular/core";
import { addDays, addSeconds } from "date-fns";
import { addHours, addMinutes, addWeeks, endOfDay, isAfter, isBefore, setISODay } from "date-fns";
import { extractDynamicFields, IAppConfig } from "data-models";
import { Subscription } from "rxjs";
import { debounceTime, filter, skip } from "rxjs/operators";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { TemplateActionService } from "src/app/shared/components/template/services/instance/template-action.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplateVariablesService } from "src/app/shared/components/template/services/template-variables.service";
import { FlowTypes } from "src/app/shared/model";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { AppStartupService } from "src/app/shared/services/app-startup/app-startup.service";
import { CapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import {
  ILocalNotification,
  LocalNotificationService,
} from "src/app/shared/services/notification/local-notification.service";
import {
  arrayToHashmap,
  mergeArrayOfArrays,
  shuffleArray,
  stringToIntegerHash,
} from "src/app/shared/utils";

type ICampaignHashmap = {
  [campaign_id: string]: FlowTypes.Campaign_listRow[];
};
type IScheduledCampaignsHashmap = {
  [schedule_id: string]: FlowTypes.Campaign_Schedule;
};
type IScheduledNotificationsHashmap = {
  [campaign_id: string]: { [row_id: string]: ILocalNotification };
};

/** Wait after a referenced field changes before re-checking campaigns, so a burst triggers one */
const FIELD_CHANGE_DEBOUNCE_MS = 2000;

/** A notification in a repeating schedule: when it is sent, and its number in the series */
interface ICampaignRepeat {
  at: Date;
  number: number;
}

interface ICampaignNotificationExtra {
  campaign_id: string;
  /** Authored campaign row id */
  row_id: string;
  /** Authored campaign row name, when provided */
  row_name?: string;
  action_list?: FlowTypes.TemplateRowAction[];
}

@Injectable({ providedIn: "root" })
export class CampaignService extends AsyncServiceBase {
  allCampaigns: ICampaignHashmap = {};
  scheduledCampaigns: IScheduledCampaignsHashmap = {};
  scheduledNotifications: IScheduledNotificationsHashmap = {};
  notificationDefaults: { title: string; text: string; time: { hour: number; minute: number } };

  private _handledNotifications = {};
  private _notificationUpdates$: Subscription;

  private localStorageService = inject(LocalStorageService);
  private actionRegistry = inject(TemplateActionRegistry);
  /** Fields referenced by campaign schedules and rows, which re-check campaigns when they change */
  private referencedFields = new Set<string>();
  private _fieldChanges$?: Subscription;

  constructor(
    private dataEvaluationService: DataEvaluationService,
    private templateTranslateService: TemplateTranslateService,
    private appDataService: AppDataService,
    private appConfigService: AppConfigService,
    private deploymentService: DeploymentService,
    private capacitorEventService: CapacitorEventService,
    private appStartupService: AppStartupService,
    private injector: Injector
  ) {
    super("Campaigns");
    this.registerInitFunction(this.initialise);
    this.subscribeToNotificationTaps();
    this.registerActionHandlers();
  }

  /** `campaign: recalculate` re-checks campaigns, e.g. after changes they can't detect themselves */
  private registerActionHandlers() {
    this.actionRegistry.register({
      campaign: async ({ args }) => {
        const [subAction] = args;
        if (subAction === "recalculate") {
          return this.recalculate();
        }
        console.error("[Campaigns] Unknown campaign action:", subAction);
      },
    });
  }

  /**
   * make a dynamic call to TemplateVariablesService as it also has handling
   * for @campaigns which would otherwise result in cyclic dependency in constructor
   */
  get templateVariablesService() {
    return this.injector.get(TemplateVariablesService);
  }

  // Call via injector to avoid accidental service init (unclear exact reason why it still inits when not called)
  // TODO - can hopefully tidy up pending follow-ups to https://github.com/IDEMSInternational/open-app-builder/pull/2859
  get localNotificationService() {
    return this.injector.get(LocalNotificationService);
  }

  private async initialise() {
    // Skip init if disabled by deployment. Include here and not in constructor to also handle re-init
    if (!this.deploymentService.config.campaigns.enabled) {
      return;
    }
    await this.ensureAsyncServicesReady([
      this.templateTranslateService,
      this.templateVariablesService,
      this.localNotificationService,
      this.dataEvaluationService,
    ]);
    this.ensureSyncServicesReady([this.appConfigService]);
    this.subscribeToAppConfigChanges();
    await this.loadCampaigns();
    this.subscribeToFieldChanges();

    // Only schedule (and clear old notifications) once notifications can reach the device.
    // Subscribe before checking, so a change in between isn't missed
    this.subscribeToSchedulingAvailability();
    if (this.localNotificationService.canSchedule$.value) {
      await this.replaceAllNotifications();
    }

    this._subscribeToNotificationUpdates();
  }
  public reInitialise() {
    return this.initialise();
  }

  /**
   * Re-check campaigns: evaluate their conditions and dates again, then schedule their notifications.
   * Runs when a field they reference changes, and from a `campaign: recalculate` action
   */
  public async recalculate() {
    if (!this.deploymentService.config.campaigns.enabled) return;
    await this.ready();
    await this.loadCampaigns();
    await this.scheduleCampaignNotifications();
  }

  /** Load campaign schedules and rows, evaluating their conditions and dates */
  private async loadCampaigns() {
    const schedules = await this.loadCampaignSchedules();
    const { allCampaigns, scheduledCampaigns } = await this.loadCampaignRows(schedules);
    this.scheduledCampaigns = scheduledCampaigns;
    this.allCampaigns = allCampaigns;
    this.referencedFields = await this.getReferencedFields();
  }

  /** Re-check campaigns when a field they reference changes, e.g. the date a schedule counts from */
  private subscribeToFieldChanges() {
    this._fieldChanges$?.unsubscribe();
    this._fieldChanges$ = this.localStorageService.changes$
      .pipe(
        filter((field) => this.referencedFields.has(field)),
        debounceTime(FIELD_CHANGE_DEBOUNCE_MS)
      )
      .subscribe(() => {
        this.recalculate().catch((error) =>
          console.error("[Campaigns] Could not re-check campaigns", error)
        );
      });
  }

  /**
   * Names of fields referenced by campaign schedules and rows: `@fields.name` (or `@field.name`)
   * anywhere in their data, and the fields of `field_evaluation` conditions
   */
  private async getReferencedFields() {
    const dataLists = await this.appDataService.getSheetsWithData("data_list", (list) =>
      ["campaign_schedule", "campaign_rows", "campaign_rows_debug"].includes(list.flow_subtype)
    );
    const rows: FlowTypes.RowWithActivationConditions[] = mergeArrayOfArrays(
      dataLists.map((list) => list.rows)
    );
    const fields = new Set<string>();
    for (const [, field] of JSON.stringify(rows).matchAll(/@fields?\.(\w+)/g)) {
      fields.add(field);
    }
    for (const row of rows) {
      const conditions = [
        ...(row.activation_condition_list || []),
        ...(row.deactivation_condition_list || []),
      ];
      for (const condition of conditions) {
        const field = condition.condition_args?.field_evaluation?.field;
        if (field) fields.add(field);
      }
    }
    return fields;
  }

  /**
   * remove any old subscriptions, subscribe to updates from sent notifications,
   * and handle actions lists accordingly
   * (tapped notifications are handled separately, see `subscribeToNotificationTaps`)
   */
  private _subscribeToNotificationUpdates() {
    if (this._notificationUpdates$) {
      this._notificationUpdates$.unsubscribe();
    }
    this._notificationUpdates$ = this.localNotificationService.sessionNotifications$.subscribe(
      async (notifications) => {
        if (notifications?.length > 0) {
          await this.handledTriggeredNotifications(notifications, "sent");
        }
      }
    );
  }

  /**
   * Run the `click` actions of a tapped campaign notification.
   * Subscribed once when the service is created, rather than on each (re)initialisation, which would
   * replay the last tap and run its actions again. The actions are read from the notification itself,
   * and run once app startup has finished rather than part-way through it.
   */
  private subscribeToNotificationTaps() {
    this.capacitorEventService.localNotificationActionPerformed.subscribe(async (action) => {
      const extra = action?.notification?.extra as ICampaignNotificationExtra | undefined;
      if (!extra?.campaign_id) return;
      const clickActions = (extra.action_list || []).filter((a) => a.trigger === "click");
      if (clickActions.length === 0) return;
      await this.appStartupService.whenComplete();
      await this.triggerRowActions(clickActions);
      // reschedule, as actions may change fields that campaign conditions depend on
      await this.ready();
      await this.scheduleCampaignNotifications();
    });
  }

  // TODO: Should this also be unsubscribing from existing subscriptions?
  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.notificationDefaults = appConfig.NOTIFICATION_DEFAULTS;
    });
  }

  private async handledTriggeredNotifications(
    notifications: ILocalNotification[] = [],
    trigger: FlowTypes.TemplateRowActionTrigger
  ) {
    let actionsTriggered = false;
    for (const notification of notifications) {
      // avoid reprocessing sent notification
      let shouldProcess = true;
      if (trigger === "sent") {
        if (this._handledNotifications[notification.id]) shouldProcess = false;
        else this._handledNotifications[notification.id] = true;
      }
      // process notification actions if scheduled by campaign
      if (notification.extra) {
        const { action_list, campaign_id } = notification.extra as ICampaignNotificationExtra;
        if (campaign_id && shouldProcess && action_list) {
          const actionsForTrigger = action_list.filter((action) => action.trigger === trigger);
          if (actionsForTrigger.length > 0) {
            actionsTriggered = true;
            await this.triggerRowActions(actionsForTrigger);
          }
        }
      }
    }
    // reschedule if actions handled, allow time for notifications to be loaded
    if (actionsTriggered) {
      setTimeout(async () => {
        await this.scheduleCampaignNotifications();
      }, 200);
    }
  }

  /**
   * Utilise template services to process campaign actions
   */
  public async triggerRowActions(actions: FlowTypes.TemplateRowAction[] = []) {
    // Process any dynamic variables that might be present in args
    const parsedActions = [];
    for (const action of actions) {
      action.args = await Promise.all(
        action.args.map(
          async (arg) => await this.templateVariablesService.evaluateConditionString(arg)
        )
      );
      parsedActions.push(action);
    }

    // create a standalone service that can process actions in the same way as templates
    // provides support all action types that do not require a container
    // e.g. nav actions, setting fields etc. supported, (do not require rendered template container)
    // e.g. set_local, force_reprocess etc. not supported (require rendered template container)
    const templateActionService = new TemplateActionService(this.injector);

    // Process via template action service
    return templateActionService.handleActions(parsedActions);
  }

  /**
   * Check all campaigns for those with notification schedules and evaluate
   * any notifications requiring scheduling.
   * Runs one at a time, as overlapping runs could each schedule the same notification
   */
  public scheduleCampaignNotifications() {
    const run = this.schedulingQueue.then(() => this.scheduleAllCampaigns());
    // a failed run shouldn't block later ones (its caller still gets the error)
    this.schedulingQueue = run.catch(() => undefined);
    return run;
  }
  private schedulingQueue: Promise<void> = Promise.resolve();

  private async scheduleAllCampaigns() {
    // Until notifications can reach the device, keep existing ones: they couldn't be replaced
    if (!this.localNotificationService.canSchedule$.value) return;
    const scheduled: IScheduledNotificationsHashmap = {};
    for (const campaign of Object.values(this.scheduledCampaigns)) {
      scheduled[campaign.id] = {};
      // remove any previous notification for the campaign
      await this.deactiveCampaignNotifications(campaign.id);
      if (campaign._active) {
        const nextRows = await this.getNextCampaignRows(campaign.id, campaign.schedule?.batch_size);
        if (nextRows?.length > 0 && this.isRepeating(campaign)) {
          // every repeat sends the first eligible row
          const [row] = nextRows;
          for (const repeat of this.getRepeatDates(campaign)) {
            const notification = await this.scheduleNotification(
              row,
              campaign.id,
              undefined,
              repeat
            );
            scheduled[campaign.id][`${row.id}:${repeat.number}`] = notification;
          }
        } else if (nextRows) {
          // add new notifications
          let earliestStart = new Date();
          for (const nextRow of nextRows) {
            const schedule = await this.scheduleNotification(nextRow, campaign.id, earliestStart);
            scheduled[campaign.id][nextRow.id] = schedule;
            // if scheduling in batch ensure next notification at least 60s after previous
            earliestStart = addSeconds(schedule.schedule.at, 60);
          }
        }
      } else {
        // a due notification may not be shown yet (Android can be up to an hour late): cancel it
        await this.localNotificationService.cancelLateNotifications(
          (n) => n.extra?.campaign_id === campaign.id
        );
      }
    }
    this.scheduledNotifications = scheduled;
    console.log("[Scheduled Notifications]", this.scheduledNotifications);
  }

  private _canSchedule$?: Subscription;

  /** Schedule again whenever notifications can reach the device, e.g. permission granted later */
  private subscribeToSchedulingAvailability() {
    this._canSchedule$?.unsubscribe();
    this._canSchedule$ = this.localNotificationService.canSchedule$
      .pipe(
        // current value is handled on load
        skip(1),
        filter((canSchedule) => canSchedule)
      )
      .subscribe(() => {
        this.replaceAllNotifications().catch((error) =>
          console.error("[Campaigns] Could not schedule notifications", error)
        );
      });
  }

  /** Clear old notifications (incl. from removed campaigns) and schedule campaigns again */
  private async replaceAllNotifications() {
    await this.hackDeactivateAllNotifications();
    await this.scheduleCampaignNotifications();
  }

  /**
   * Select the highest priority rows for a given campaign that satisfies all activation/deactivation
   * criteria. In the case of multiple equal priority rows, return at random
   * @param batchSize - maximum number of rows to return for scheduling in batch
   */
  public async getNextCampaignRows(campaign_id: string, batchSize = 1) {
    // TODO - decide best way to handle keeping data fresh
    await this.dataEvaluationService.refreshDBCache();

    if (!this.allCampaigns[campaign_id]) {
      console.error("no data exists for campaign", campaign_id);
      return null;
    }
    const rowsByPrioirity = this.shuffleSortCampaignRowsByPriority(this.allCampaigns[campaign_id]);
    const returnedRows: FlowTypes.Campaign_listRow[] = [];
    for (const row of rowsByPrioirity) {
      if (returnedRows.length < batchSize) {
        // evaluate before parsing so dynamic expression can be used
        const evaluation = await this.evaluateRowActivationConditions(row);
        if (evaluation._active) {
          const parsedRow = await this.hackParseDynamicRow(row);
          returnedRows.push({ ...parsedRow, ...evaluation });
        }
      }
    }
    return returnedRows;
  }

  /**
   * Convert PLH notification schedule data and create local notification
   * @returns list of all currently scheduled notifications
   * @param earliestStart override default campaign start date if scheduling notifications in batch
   * @param repeat for repeating schedules, when to send and the repeat's number in the series
   */
  public async scheduleNotification(
    row: FlowTypes.Campaign_listRow,
    campaign_id: string,
    earliestStart?: Date,
    repeat?: ICampaignRepeat
  ) {
    const schedule = this.scheduledCampaigns[campaign_id];
    if (!schedule) {
      console.error("No notification schedule provided for campaign", campaign_id);
      return;
    }
    let _schedule_at = repeat?.at;
    if (!repeat) {
      const notification_schedule = this.evaluateSchedule(schedule, earliestStart);
      // may return null if schedule would be outside permitted timeframe, in which case do not schedule
      if (!notification_schedule) return;
      _schedule_at = notification_schedule._schedule_at;
    }

    // HACK - remove markdown form title and text as not currently supported in capacitor notifications
    row.text = this.hackStripNotificationMarkdown(row.text);
    row.title = this.hackStripNotificationMarkdown(row.title);
    const extra: ICampaignNotificationExtra = {
      campaign_id,
      row_id: row.id,
      row_name: row.name,
      action_list: row.action_list,
    };

    const notificationSchedule: ILocalNotification = {
      schedule: { at: _schedule_at },
      body: row.text || this.notificationDefaults.text,
      largeBody: row.text || this.notificationDefaults.text,
      summaryText: "",
      title: row.title || this.notificationDefaults.title,
      extra,
      id: stringToIntegerHash(row.id),
    };
    // notifications with the same key replace each other, so each repeat of a row needs its own
    const key = repeat ? `${row.id}:${repeat.number}` : row.id;
    await this.localNotificationService.scheduleNotification(notificationSchedule, key);
    return notificationSchedule;
  }

  /**
   * Campaign rows are read from datalists which are currently not evaluated for dynamic content
   * This workaround forces the manual check for any dynamic content,
   */
  public async hackParseDynamicRow(row: FlowTypes.Campaign_listRow | FlowTypes.Campaign_Schedule) {
    // process translations first as these are made with dynamic content in place (e.g. "hello @name")
    const translatedRow = this.templateTranslateService.translateRow(row as any);
    // Continue processing full row
    translatedRow._dynamicFields = extractDynamicFields(translatedRow);
    const parsedRow = await this.templateVariablesService.evaluatePLHData(translatedRow, {
      row: translatedRow,
    });
    return parsedRow as FlowTypes.Campaign_listRow;
  }

  /** Deactivate all notifications for a given campaign */
  private async deactiveCampaignNotifications(campaign_id: string) {
    const pendingNotifications = this.localNotificationService.pendingNotifications$.value;
    const deactivatedNotifications = pendingNotifications.filter(
      (n) => n.extra.campaign_id === campaign_id
    );
    await this.localNotificationService.removeNotifications(
      deactivatedNotifications.map((n) => n.id)
    );
  }

  /**
   * HACK 2021-11-25 - not sure if there might be notificaitons hanging from previous
   * implementation so to stay safe just remove all old notifications when scheduling new
   * TODO - we may want to keep in case campaign names changed, but probably only called
   * as part of new version load (TBC)
   */
  private async hackDeactivateAllNotifications() {
    const pendingNotifications = this.localNotificationService.pendingNotifications$.value;
    await this.localNotificationService.removeNotifications(pendingNotifications.map((n) => n.id));
  }

  /**
   * Retreive all notification_schedule datalists, filter for satisfied activation conditions
   * and schedule start/end
   */
  private async loadCampaignSchedules() {
    const dataLists = await this.appDataService.getSheetsWithData(
      "data_list",
      (list) => list.flow_subtype === "campaign_schedule"
    );
    const scheduleRows = dataLists.map((d) => d.rows);
    const allCampaignSchedules: FlowTypes.Campaign_Schedule[] = mergeArrayOfArrays(scheduleRows);
    const evaluatedCampaignSchedules = await Promise.all(
      allCampaignSchedules.map(async (scheduleRow) => {
        const parsedRow = await this.hackParseDynamicRow(scheduleRow);
        const activationEvaluation = await this.evaluateRowActivationConditions(parsedRow);
        const scheduleEvaluation = this.evaluateRowSchedule(parsedRow);
        scheduleRow._active = activationEvaluation._active && scheduleEvaluation;
        scheduleRow._campaign_rows = [];
        return scheduleRow;
      })
    );
    const campaignSchedulesById = arrayToHashmap(evaluatedCampaignSchedules, "id");
    return campaignSchedulesById;
  }

  /**
   * Get a list of all campaign rows collated by campaign_id, and merge with campaign schedules
   * TODO - most of this logic could be handled in parser instead
   */
  private async loadCampaignRows(scheduledCampaigns: IScheduledCampaignsHashmap) {
    // Retrieve and merge list of all campaign rows
    const dataLists = await this.appDataService.getSheetsWithData("data_list", (list) =>
      ["campaign_rows", "campaign_rows_debug"].includes(list.flow_subtype)
    );
    const campaignListRows = dataLists.map((list) => list.rows);

    const allCampaignRows: FlowTypes.Campaign_listRow[] = mergeArrayOfArrays(campaignListRows);
    const allCampaignRowsByPriority = allCampaignRows.sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    );

    // Merge rows with lists of scheduled and all campaigns
    const allCampaigns: ICampaignHashmap = {};

    allCampaignRowsByPriority.forEach((campaignRow) => {
      // add row to relevant campaign list
      const campaign_list = campaignRow.campaign_list || [];
      campaign_list.forEach((campaign_id) => {
        // store scheduled campaign row if relevant
        // TODO - handle campaigns with inline notification schedule
        if (scheduledCampaigns.hasOwnProperty(campaign_id)) {
          scheduledCampaigns[campaign_id]._campaign_rows.push(campaignRow);
        }
        // also store row to all campaign list
        else {
          allCampaigns[campaign_id] = allCampaigns[campaign_id] || [];
          allCampaigns[campaign_id].push(campaignRow);
        }
      });
    });

    // merge any scheduled campaigns to all campaigns list
    Object.values(scheduledCampaigns).forEach(
      (schedule) => (allCampaigns[schedule.id] = schedule._campaign_rows)
    );

    return { allCampaigns, scheduledCampaigns };
  }

  /**
   * Evaluate all statements within row activation_condition_list and deactivation_condition_list
   * Return a summary of whether all activations satisifed, whether any deactivation satisfied,
   * and overall active state based on all activations satisfied and not any deactivations satisfied
   * */
  public async evaluateRowActivationConditions(row: FlowTypes.RowWithActivationConditions) {
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
    const _activated = row.activation_condition_list.every((c) => c._satisfied === true);
    const _deactivated = row.deactivation_condition_list.some((c) => c._satisfied === true);
    const _active = _activated && !_deactivated;
    return { _activated, _deactivated, _active };
  }

  /**
   * Take a schedule row and calculate what time to schedule next nofication at, based on any start/end dates,
   * or hour/minute/day-of-week conditions
   * @param earliestStart - used when evaluating notifications in batch. Compare notification schedule to future date instead of current
   */
  private evaluateSchedule(scheduleRow: FlowTypes.Campaign_Schedule, earliestStart?: Date) {
    // apply default settings
    scheduleRow.time = scheduleRow.time || this.notificationDefaults.time;
    const { time, delay } = scheduleRow;
    const schedule: FlowTypes.Campaign_Schedule["schedule"] = scheduleRow.schedule || {};
    let d = earliestStart ? new Date(earliestStart) : new Date();
    // Set notification start date if after earliest start
    if (schedule.start_date && isAfter(new Date(schedule.start_date), earliestStart)) {
      d = new Date(schedule.start_date);
    }
    // Set notification time, add 1 day if time already passed
    d.setHours(Number(time.hour));
    d.setMinutes(Number(time.minute));
    if (isBefore(d, earliestStart)) {
      d = addDays(d, 1);
    }
    // Schedule notification day of week, add 1 week if time already passed
    if (schedule.day_of_week) {
      d = setISODay(d, schedule.day_of_week);
      if (isBefore(d, earliestStart)) {
        d = addWeeks(d, 1);
      }
    }
    // Check schedule time not after provided end date, avoid scheduling if after
    if (schedule.end_date) {
      if (isAfter(d, endOfDay(new Date(schedule.end_date)))) {
        return null;
      }
    }
    d = this.addDelay(d, delay);
    scheduleRow._schedule_at = d;
    return scheduleRow;
  }

  private addDelay(d: Date, delay: FlowTypes.Campaign_Schedule["delay"]) {
    if (delay) {
      d = addDays(d, Number(delay.days || 0));
      d = addHours(d, Number(delay.hours || 0));
      d = addMinutes(d, Number(delay.minutes || 0));
    }
    return d;
  }

  /** Whether a schedule sends a series of notifications (`repeat_every_days` and `repeat_count`) */
  private isRepeating(scheduleRow: FlowTypes.Campaign_Schedule) {
    const { repeat_every_days, repeat_count } = scheduleRow.schedule || {};
    return Number(repeat_every_days) > 0 && Number(repeat_count) > 0;
  }

  /**
   * Dates of a repeating schedule: `repeat_count` notifications, `repeat_every_days` apart, from
   * `start_date` (or the next time of day the schedule sends at), plus any `delay`.
   * Repeats after `end_date` (checked before `delay`, as for single notifications) or in the past
   * are skipped; each keeps its number in the series
   */
  public getRepeatDates(scheduleRow: FlowTypes.Campaign_Schedule) {
    const { start_date, end_date, repeat_every_days, repeat_count } = scheduleRow.schedule || {};
    const time = scheduleRow.time || this.notificationDefaults.time;
    const now = new Date();
    let first = start_date ? new Date(start_date) : new Date(now);
    first.setHours(Number(time.hour), Number(time.minute), 0, 0);
    if (!start_date && isBefore(first, now)) {
      first = addDays(first, 1);
    }
    const repeats: ICampaignRepeat[] = [];
    for (let i = 0; i < Number(repeat_count); i++) {
      const due = addDays(first, i * Number(repeat_every_days));
      if (end_date && isAfter(due, endOfDay(new Date(end_date)))) break;
      const at = this.addDelay(due, scheduleRow.delay);
      if (isAfter(at, now)) {
        repeats.push({ at, number: i + 1 });
      }
    }
    return repeats;
  }

  private async evaluateCondition(condition: FlowTypes.DataEvaluationCondition) {
    return this.dataEvaluationService.evaluateReminderCondition(condition);
  }

  /**
   * Schedules can have `start_date` and `end_date` fields.
   * A schedule will be deemed as active so long as the end_date has not already passed
   * (even if not start date scheduling can happen in advance)
   */
  private evaluateRowSchedule(scheduleRow: FlowTypes.Campaign_Schedule) {
    if (scheduleRow.schedule) {
      const { end_date } = scheduleRow.schedule;
      // the end date is included until the end of that day, as when scheduling notifications
      if (end_date && isBefore(endOfDay(new Date(end_date)), new Date())) return false;
    }
    return true;
  }

  /**
   * Sort campaign rows by priority. If multiple rows with same priority exist randomise the order
   * so that the first priority item is not always returned
   */
  private shuffleSortCampaignRowsByPriority(rows: FlowTypes.Campaign_listRow[]) {
    const groupsByPriority = {};
    for (const row of rows) {
      if (!row.hasOwnProperty("priority")) row.priority = -Infinity;
      if (!groupsByPriority[row.priority]) groupsByPriority[row.priority] = [];
      groupsByPriority[row.priority].push(row);
    }
    const shuffleSortedGroups = Object.entries<FlowTypes.Campaign_listRow[][]>(groupsByPriority)
      .sort(([key_a], [key_b]) => Number(key_b) - Number(key_a))
      .map(([_, value]) => shuffleArray(value));
    const shuffleSortedRows: FlowTypes.Campaign_listRow[] = [].concat(...shuffleSortedGroups);
    return shuffleSortedRows;
  }

  /**
   * Rough function to strip some commonly used markdown from strings, specifically
   * `**` - bold text
   * NOTE - comprehensive extraction could be carried out using something like strip-markdown or mdast
   */
  private hackStripNotificationMarkdown(str = "") {
    return str.replace(/\*\*/g, "");
  }
}
