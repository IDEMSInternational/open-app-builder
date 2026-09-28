import Dexie, { Table } from "dexie";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";
import { DB_TABLES } from "data-models";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";
import type { ActionPerformed } from "@capacitor/local-notifications";
import {
  ILocalNotificationInteractionDB,
  LocalNotificationPersistAdapter,
} from "./local-notification-persist.adapter";
import type { ILocalNotification, LocalNotificationService } from "./local-notification.service";

const MOCK_NOTIFICATION: ILocalNotification = {
  id: 123,
  title: "Mock title",
  body: "Mock text",
  schedule: { at: new Date("2025-01-01T09:00:00") },
  extra: { campaign_id: "mock_campaign", row_id: "mock_row", row_name: "Mock row" },
  _row_id: "mock_row",
};

/** Mock notification service exposing only the observables used by the adapter */
class MockLocalNotificationService {
  public sessionNotifications$ = new BehaviorSubject<ILocalNotification[]>([]);
  public interactedNotification$ = new BehaviorSubject<ActionPerformed | null>(null);
}

describe("LocalNotificationPersistAdapter", () => {
  let db: Dexie;
  let table: Table<ILocalNotificationInteractionDB, number>;
  let service: MockLocalNotificationService;
  let adapter: LocalNotificationPersistAdapter;

  /** Resolve once the adapter has loaded db entries that satisfy the given condition */
  function waitForEntries(condition: (entries: ILocalNotificationInteractionDB[]) => boolean) {
    return firstValueFrom(adapter.dbEntries$.pipe(filter(condition)));
  }

  beforeEach(async () => {
    // Use a mock indexeddb with Dexie bindings, unique name to avoid sharing data between tests
    db = new Dexie(`MockNotificationDB_${Math.random()}`, { indexedDB, IDBKeyRange });
    db.version(1).stores({
      local_notifications_interaction: DB_TABLES.local_notifications_interaction,
    });
    await db.open();
    table = db.table("local_notifications_interaction");
    service = new MockLocalNotificationService();
    adapter = new LocalNotificationPersistAdapter();
    adapter.init(service as any as LocalNotificationService, table);
  });

  afterEach(async () => {
    await db.delete();
  });

  it("records sent timestamp and notification meta for session notifications", async () => {
    service.sessionNotifications$.next([MOCK_NOTIFICATION]);
    const [entry] = await waitForEntries((entries) => entries.length > 0);
    expect(entry.notification_id).toEqual(123);
    expect(entry.sent_recorded_timestamp).toBeTruthy();
    expect(entry.schedule_timestamp).toEqual("2025-01-01T09:00:00");
    expect(entry.notification_meta).toEqual({
      campaign_id: "mock_campaign",
      row_id: "mock_row",
      row_name: "Mock row",
      title: "Mock title",
      text: "Mock text",
    });
    expect(entry._sync_status).toEqual("pending");
  });

  it("does not overwrite existing sent timestamp when session notifications are re-emitted", async () => {
    await table.put({
      notification_id: 123,
      sent_recorded_timestamp: "2025-01-01T09:00:00",
      _created: "2025-01-01T09:00:00",
      _sync_status: "synced",
    } as ILocalNotificationInteractionDB);
    service.sessionNotifications$.next([MOCK_NOTIFICATION]);
    const [entry] = await waitForEntries((entries) => entries[0]?._sync_status === "pending");
    expect(entry.sent_recorded_timestamp).toEqual("2025-01-01T09:00:00");
    expect(entry.notification_meta.title).toEqual("Mock title");
  });

  it("records action without changing sent timestamp", async () => {
    service.sessionNotifications$.next([MOCK_NOTIFICATION]);
    const [sessionEntry] = await waitForEntries((entries) => entries.length > 0);
    // notifications passed to action callbacks do not include local db fields such as `_row_id`
    const { _row_id, ...notification } = MOCK_NOTIFICATION;
    service.interactedNotification$.next({ actionId: "tap", notification });
    const [entry] = await waitForEntries((entries) => !!entries[0]?.action_id);
    expect(entry.action_id).toEqual("tap");
    expect(entry.action_recorded_timestamp).toBeTruthy();
    expect(entry.sent_recorded_timestamp).toEqual(sessionEntry.sent_recorded_timestamp);
    expect(entry.notification_meta.row_id).toEqual("mock_row");
  });

  it("records action when no session entry exists yet", async () => {
    const { _row_id, ...notification } = MOCK_NOTIFICATION;
    service.interactedNotification$.next({ actionId: "tap", notification });
    const [entry] = await waitForEntries((entries) => entries.length > 0);
    expect(entry.action_id).toEqual("tap");
    expect(entry.sent_recorded_timestamp).toBeUndefined();
    expect(entry.notification_meta.row_id).toEqual("mock_row");
  });

  it("falls back to local _row_id when not included in notification extra", async () => {
    service.sessionNotifications$.next([{ ...MOCK_NOTIFICATION, extra: {} }]);
    const [entry] = await waitForEntries((entries) => entries.length > 0);
    expect(entry.notification_meta.row_id).toEqual("mock_row");
  });
});
