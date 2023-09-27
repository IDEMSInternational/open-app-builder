import { Injectable } from "@angular/core";
import type { Table } from "dexie";
import { IDBMeta } from "data-models";
import { BehaviorSubject } from "rxjs";
import { interval } from "rxjs";
import { debounce, filter } from "rxjs/operators";
import { generateTimestamp } from "../../utils";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";
import { LocalNotificationService } from "./local-notification.service";

export interface ILocalNotificationInteraction {
  sent_recorded_timestamp: string;
  schedule_timestamp: string;
  notification_id: number;
  notification_meta: any;
  action_recorded_timestamp?: string;
  action_id?: string;
  action_meta?: any;
  _created: string;
}
export type ILocalNotificationInteractionDB = ILocalNotificationInteraction & IDBMeta;

@Injectable({
  providedIn: "root",
})
/**
 * Small service that handles tracking local notification interaction history and saving to db
 *
 */
export class LocalNotificationInteractionService extends AsyncServiceBase {
  /** Typed wrapper around database table used to store local notifications */
  private db: Table<ILocalNotificationInteractionDB, number>;
  /**  */
  public interactedNotifications$ = new BehaviorSubject<ILocalNotificationInteractionDB[]>([]);

  constructor(
    private dbService: DbService,
    private localNotificationService: LocalNotificationService
  ) {
    super("LocalNotificationInteraction");
    this.registerInitFunction(this.initialise);
  }
  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.localNotificationService]);
    this.db = this.dbService.table<ILocalNotificationInteraction>(
      "local_notifications_interaction"
    );
    this.subscribeToNotifications();
    await this.loadInteractedNotifications();
  }
  public async loadInteractedNotifications() {
    const interactedNotifications = await this.db.reverse().toArray();
    this.interactedNotifications$.next(interactedNotifications);
  }

  private subscribeToNotifications() {
    this.localNotificationService.interactedNotification$
      .pipe(
        debounce(() => interval(1000)), // generally try to ensure action update happen after session update
        filter((v) => !!v)
      )
      .subscribe(async (action) => {
        const { actionId, notification, inputValue } = action;
        const { id, text, title, campaign_id } = notification.extra;
        const update: Partial<ILocalNotificationInteraction> = {
          action_id: actionId,
          action_recorded_timestamp: generateTimestamp(),
          notification_meta: { id, text, title, campaign_id },
        };
        if (inputValue) {
          update.action_meta = { inputValue };
        }
        await this.recordNotificationInteraction(notification.id, update);
        this.loadInteractedNotifications();
      });
    this.localNotificationService.sessionNotifications$
      .pipe(
        debounce(() => interval(500)), // local notifications can re-evalute in quick succession so debounce
        filter((v) => v.length > 0)
      )
      .subscribe(async (notifications) => {
        const timestamp = generateTimestamp();
        for (const notification of notifications) {
          const { id, text, title, campaign_id } = notification.extra;
          await this.recordNotificationInteraction(notification.id, {
            notification_meta: { id, text, title, campaign_id },
            schedule_timestamp: generateTimestamp(notification.schedule.at),
            sent_recorded_timestamp: timestamp,
          });
        }
        this.loadInteractedNotifications();
      });
  }

  private async recordNotificationInteraction(
    notification_id: number,
    update: Partial<ILocalNotificationInteraction>
  ) {
    let entry: ILocalNotificationInteractionDB = await this.db.where({ notification_id }).first();

    if (!entry) {
      entry = {
        ...this.dbService.generateDBMeta(),
        notification_id,
      } as any;
    }
    await this.db.put({ ...entry, ...update, _sync_status: "pending" });
  }
}
