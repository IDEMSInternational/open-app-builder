import { Injectable } from "@angular/core";
import { generateTimestamp } from "../../utils";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AsyncServiceBase } from "../asyncService.base";
import { TemplateFieldService } from "../../components/template/services/template-field.service";

@Injectable({ providedIn: "root" })
/**
 * The app event service is designed to make it easier to record general events that happen
 * in the app, such as app opening. It also performs the calculation steps to generate
 * summary information from events, such as the total number of days the app has been used.
 *
 * Events are stored in the main database, and summary calculations persisted in localstorage
 * for immediate retrieval on app start
 */
export class AppEventService extends AsyncServiceBase {
  /** Some computed values are stored in a cache for instant retrieval */
  summary: IAppEventSummary;
  /** Keep a copy of all app events saved in the database in memoery also, by event_id */
  appEventsById: { [key in IEventId]: IAppEvent[] };

  constructor(
    private db: DbService,
    private localStorageService: LocalStorageService,
    private templateFieldService: TemplateFieldService
  ) {
    super("App Events");
    this.registerInitFunction(this.intialise);
  }

  /** Initialise the app events service by recording an app_launch instance */
  private async intialise() {
    await this.ensureAsyncServicesReady([this.db, this.templateFieldService]);
    this.ensureSyncServicesReady([this.localStorageService]);
    this.setAppEventsById([]);
    this.loadSummary();

    await this.loadAppEvents();
    await this.recordAppEvent("app_launch");
    this.calculateEventSummaries();
  }

  /** Write app event to db and local variable, recalculating summaries that might depend on the data */
  public async recordAppEvent(event_id: IAppEvent["event_id"], data: Partial<IAppEvent> = {}) {
    const event: IAppEvent = { ...{ _created: generateTimestamp(), event_id }, ...data };
    await this.db.table("app_events").add(event);
    this.appEventsById[event_id].push(event);
    // recalculate any summary data that might have changed due ot this
    this.calculateEventSummaries();
  }

  public async deleteAppEvents(event_id: string) {
    const events = this.db.table("app_events").where("event_id").equals(event_id);
    await events.delete();
    await this.loadAppEvents();
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
    // current app day calculated by finding length of array of subset of all unique app open event dates
    const app_day = [...new Set(appOpenEvents.map((e) => e._created.substring(0, 10)))].length;
    const first_app_launch = this.appEventsById.app_launch?.[0]?._created || generateTimestamp();
    this.templateFieldService.setField("_app_first_launch", first_app_launch);
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
}

const APP_EVENT_IDs = ["app_launch"] as const;
type IEventId = (typeof APP_EVENT_IDs)[number];

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
