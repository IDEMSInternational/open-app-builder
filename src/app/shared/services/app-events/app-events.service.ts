import { Injectable } from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { BehaviorSubject } from "scripts/node_modules/rxjs";
import { generateTimestamp } from "../../utils";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
/**
 * The app event service is designed to make it easier to record general events that happen
 * in the app, such as app opening. It also performs the calculation steps to generate
 * summary information from events, such as the total number of days the app has been used.
 *
 * Events are stored in the main database, and summary calculations persisted in localstorage
 * for immediate retrieval on app start
 */
export class AppEventService {
  /** Some computed values are stored in a cache for instant retrieval */
  summary: IAppEventSummary;
  /** Keep a copy of all app events saved in the database in memoery also, by event_id */
  appEventsById: { [key in IEventId]: IAppEvent[] };
  /** Track locally whether initiallisation has been completed, in case required by other services */
  private ready$ = new BehaviorSubject<boolean>(false);

  constructor(private db: DbService, private localStorageService: LocalStorageService) {
    this.setAppEventsById([]);
    this.loadSummary();
  }

  /** Provide a promise that can be used to notify components when initialisation has been completed */
  async ready() {
    return this.ready$.pipe(takeWhile((isReady) => isReady === false)).toPromise();
  }

  /** Initialise the app events service by recording an app_launch instance */
  async init() {
    await this.loadAppEvents();
    await this.recordAppEvent("app_launch");
    this.calculateEventSummaries();
    this.ready$.next(true);
    return;
  }

  /** Write app event to db and local variable, recalculating summaries that might depend on the data */
  public async recordAppEvent(event_id: IAppEvent["event_id"], data: Partial<IAppEvent> = {}) {
    const event: IAppEvent = { ...{ _created: generateTimestamp(), event_id }, ...data };
    await this.db.table("app_events").add(event);
    this.appEventsById[event_id].push(event);
    // recalculate any summary data that might have changed due ot this
    this.calculateEventSummaries();
  }

  private getDBAppEvents(event_id?: IAppEvent["event_id"]) {
    const table = this.db.table<IAppEvent>("app_events");
    const events = event_id
      ? table.where("event_id").equals(event_id).sortBy("_created")
      : table.toArray();
    return events as Promise<IAppEvent[]>;
  }

  /** Load all app events from the database into memory for faster retrieval */
  private async loadAppEvents() {
    const allEvents = await this.getDBAppEvents();
    this.setAppEventsById(allEvents);
  }

  private setAppEventsById(events: IAppEvent[]) {
    const eventsById: any = {};
    APP_EVENT_IDs.forEach((id) => (eventsById[id] = []));
    events.forEach((e) => eventsById[e.event_id].push(e));
    this.appEventsById = eventsById;
  }

  private calculateEventSummaries() {
    const appOpenEvents = this.appEventsById.app_launch;
    console.log("app days", [...new Set(appOpenEvents.map((e) => e._created.substring(0, 10)))]);
    const app_day = [...new Set(appOpenEvents.map((e) => e._created.substring(0, 10)))].length;
    const first_app_launch = this.appEventsById.app_launch?.[0]?._created || generateTimestamp();
    return this.setSummaryValues({ app_day, first_app_launch });
  }

  /**
   * Some data that could be generated from events is stored in localstorage for
   * immediate retrieval
   */
  private loadSummary() {
    const cache = this.localStorageService.getJSON("app_events_summary") || {};
    return this.setSummaryValues(cache);
  }

  /** Update cached valuese and save to localstorage */
  private setSummaryValues(values: Partial<IAppEventSummary>) {
    this.summary = { ...DEFAULT_SUMMARY, ...this.summary, ...values };
    return this.localStorageService.setJSON("app_events_summary", this.summary);
  }

  /** The app might be left running in the background for multiple days
   *  Ensure information such as the current app day are kept updated in this case
   *  TODO
   */
  private _scheduleUpdate() {}
}

const APP_EVENT_IDs = ["app_launch"] as const;
type IEventId = typeof APP_EVENT_IDs[number];

export interface IAppEvent {
  _created: string;
  event_id: IEventId;
}
interface IAppEventSummary {
  first_app_launch: string;
  app_day: number;
}

const DEFAULT_SUMMARY: IAppEventSummary = {
  first_app_launch: generateTimestamp(),
  app_day: 1,
};
