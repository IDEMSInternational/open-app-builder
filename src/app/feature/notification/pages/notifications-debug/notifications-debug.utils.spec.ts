import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import type { ILocalNotificationInteractionDB } from "src/app/shared/services/notification/local-notification-persist.adapter";
import type { ILocalNotification } from "src/app/shared/services/notification/local-notification.service";
import type { IDBNotification } from "../../notification.types";
import {
  buildNotificationLists,
  formatAction,
  groupActionsByTrigger,
  groupByDay,
  IDebugNotificationSources,
  NOT_ON_DEVICE_WARNING,
} from "./notifications-debug.utils";

const NOW = new Date("2026-10-27T12:00:00").getTime();
const HOUR = 60 * 60 * 1000;

/** Local timestamp string, as written by `generateTimestamp` */
const timestamp = (offsetMs: number) => {
  const date = new Date(NOW + offsetMs);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 19);
};

function campaignRecord(id: number, offsetMs: number, extra: Record<string, any> = {}) {
  return {
    id,
    title: `Campaign ${id}`,
    body: "Campaign text",
    schedule: { at: new Date(NOW + offsetMs) },
    extra: { campaign_id: "campaign_1", row_id: `row_${id}`, action_list: [], ...extra },
    _created: timestamp(-HOUR),
  } as ILocalNotification;
}

function actionRecord(
  id: string,
  offsetMs: number,
  status: IDBNotification["status"] = "pending"
): IDBNotification {
  return {
    id,
    title: `Action ${id}`,
    schedule_at: timestamp(offsetMs),
    _internal_id: id.length * 100,
    status,
  };
}

function deviceNotification(id: number, offsetMs: number, extra = {}) {
  return {
    id,
    title: `Device ${id}`,
    body: "",
    schedule: { at: new Date(NOW + offsetMs) },
    extra,
  } as PendingLocalNotificationSchema;
}

function historyEntry(notification_id: number, meta: Record<string, any>, actionId?: string) {
  return {
    notification_id,
    notification_meta: meta,
    schedule_timestamp: timestamp(-2 * HOUR),
    action_id: actionId,
    action_recorded_timestamp: actionId ? timestamp(-HOUR) : undefined,
    _sync_status: "pending",
  } as ILocalNotificationInteractionDB;
}

const upcomingFrom = (s: IDebugNotificationSources) => buildNotificationLists(s).upcoming;
const pastFrom = (s: IDebugNotificationSources) => buildNotificationLists(s).past;

function sources(partial: Partial<IDebugNotificationSources>): IDebugNotificationSources {
  return {
    device: [],
    campaignRecords: [],
    campaignHistory: [],
    actionRecords: [],
    now: NOW,
    ...partial,
  };
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/notification/pages/notifications-debug/notifications-debug.utils.spec.ts
 */
describe("Notifications debug utils", () => {
  describe("upcoming notifications", () => {
    it("lists upcoming notifications from both systems and the device, soonest first", () => {
      const campaign = campaignRecord(1, 2 * HOUR);
      const action = actionRecord("action_1", HOUR);
      const upcoming = upcomingFrom(
        sources({
          campaignRecords: [campaign],
          actionRecords: [action],
          device: [
            deviceNotification(1, 2 * HOUR),
            deviceNotification(action._internal_id, HOUR),
            deviceNotification(3, 3 * HOUR),
          ],
        })
      );
      expect(upcoming.map((n) => [n.key, n.source])).toEqual([
        ["action_action_1", "action"],
        ["campaign_1", "campaign"],
        ["device_3", "other"],
      ]);
      expect(upcoming.every((n) => !n.warning)).toBeTrue();
    });

    it("leaves out notifications that are due, and action notifications no longer pending", () => {
      const upcoming = upcomingFrom(
        sources({
          campaignRecords: [campaignRecord(1, -HOUR)],
          actionRecords: [actionRecord("past", -HOUR), actionRecord("ignored", HOUR, "ignored")],
        })
      );
      expect(upcoming).toEqual([]);
    });

    it("warns about notifications that are not scheduled on the device", () => {
      const upcoming = upcomingFrom(
        sources({
          campaignRecords: [campaignRecord(1, HOUR)],
          actionRecords: [actionRecord("action_1", HOUR)],
        })
      );
      expect(upcoming.map((n) => n.warning)).toEqual([
        NOT_ON_DEVICE_WARNING,
        NOT_ON_DEVICE_WARNING,
      ]);
    });

    it("does not warn about campaign notifications that are still being scheduled", () => {
      const record = { ...campaignRecord(1, HOUR), _created: timestamp(-1000) };
      const [notification] = upcomingFrom(sources({ campaignRecords: [record] }));
      expect(notification.warning).toBeUndefined();
    });

    it("labels test notifications", () => {
      const upcoming = upcomingFrom(
        sources({
          campaignRecords: [
            campaignRecord(1, HOUR, { campaign_id: "debug_test" }),
            campaignRecord(2, HOUR, { test_copy: true }),
            campaignRecord(3, HOUR),
          ],
          actionRecords: [
            actionRecord("debug_test_copy_action_1_123", HOUR),
            actionRecord("action_1", HOUR),
          ],
        })
      );
      const isTest = Object.fromEntries(upcoming.map((n) => [n.key, n.isTest]));
      expect(isTest).toEqual({
        campaign_1: true,
        campaign_2: true,
        campaign_3: false,
        action_debug_test_copy_action_1_123: true,
        action_action_1: false,
      });
    });
  });

  describe("notifications still on the device after their time", () => {
    it("keeps them in upcoming, marked overdue, and out of past", () => {
      const campaign = campaignRecord(1, -HOUR);
      const action = actionRecord("action_1", -HOUR);
      const lists = buildNotificationLists(
        sources({
          campaignRecords: [campaign],
          actionRecords: [action],
          device: [
            deviceNotification(1, -HOUR),
            deviceNotification(action._internal_id, -HOUR),
            deviceNotification(3, -24 * HOUR),
          ],
        })
      );
      expect(lists.upcoming.map((n) => [n.key, n.overdue, n.warning])).toEqual([
        ["device_3", true, undefined],
        ["campaign_1", true, undefined],
        ["action_action_1", true, undefined],
      ]);
      expect(lists.past).toEqual([]);
    });

    it("groups them as overdue rather than by day", () => {
      const upcoming = upcomingFrom(
        sources({ device: [deviceNotification(3, -24 * HOUR), deviceNotification(4, HOUR)] })
      );
      expect(groupByDay(upcoming, NOW).map((g) => g.label)).toEqual(["Overdue", "Today"]);
    });
  });

  describe("past notifications", () => {
    it("lists action notifications as tapped or not tapped, newest first", () => {
      const interacted = {
        ...actionRecord("tapped", -3 * HOUR, "interacted"),
        action_performed: { timestamp: timestamp(-2 * HOUR) },
      };
      const past = pastFrom(
        sources({
          actionRecords: [
            interacted,
            actionRecord("ignored", -2 * HOUR, "ignored"),
            actionRecord("pending", -HOUR),
            actionRecord("upcoming", HOUR),
          ],
        })
      );
      expect(past.map((n) => [n.key, n.tapped])).toEqual([
        ["action_pending", false],
        ["action_ignored", false],
        ["action_tapped", true],
      ]);
      expect(past[2].tappedAt).toEqual(new Date(NOW - 2 * HOUR));
    });

    it("lists due campaign notifications once, with their history", () => {
      const past = pastFrom(
        sources({
          campaignRecords: [campaignRecord(1, -2 * HOUR), campaignRecord(2, HOUR)],
          campaignHistory: [historyEntry(1, { campaign_id: "campaign_1" }, "tap")],
        })
      );
      expect(past.length).toEqual(1);
      expect(past[0]).toEqual(
        jasmine.objectContaining({
          key: "campaign_1",
          tapped: true,
          tappedAt: new Date(NOW - HOUR),
        })
      );
      expect(past[0].raw.history).toBeDefined();
    });

    it("lists campaign history without a saved notification, so it can be sent again", () => {
      const meta = {
        campaign_id: "campaign_1",
        row_id: "row_1",
        title: "History title",
        text: "History text",
        action_list: [{ trigger: "click", action_id: "go_to", args: ["home"] }],
      };
      const [notification] = pastFrom(sources({ campaignHistory: [historyEntry(5, meta)] }));
      expect(notification).toEqual(
        jasmine.objectContaining({ source: "campaign", title: "History title", tapped: false })
      );
      expect(notification.original).toEqual({
        source: "campaign",
        notification: jasmine.objectContaining({
          body: "History text",
          extra: jasmine.objectContaining({ campaign_id: "campaign_1", row_id: "row_1" }),
        }),
      });
    });

    it("leaves out campaign history entries for taps on action notifications", () => {
      const past = pastFrom(
        sources({
          campaignHistory: [historyEntry(5, { source: "action", id: "action_1" }, "tap")],
        })
      );
      expect(past).toEqual([]);
    });
  });

  describe("groupByDay", () => {
    it("labels today, tomorrow and yesterday, and other days by date", () => {
      const at = (days: number) => ({ at: new Date(NOW + days * 24 * HOUR) });
      const groups = groupByDay([at(-1), at(0), at(0), at(1), at(3), {}], NOW);
      expect(groups.map((g) => [g.label, g.items.length])).toEqual([
        ["Yesterday", 1],
        ["Today", 2],
        ["Tomorrow", 1],
        ["Fri 30 Oct", 1],
        ["No time set", 1],
      ]);
    });
  });

  describe("actions", () => {
    it("writes actions as authored", () => {
      expect(formatAction({ trigger: "click", action_id: "go_to", args: ["home"] })).toEqual(
        "go_to: home"
      );
      expect(
        formatAction({
          trigger: "click",
          action_id: "pop_up",
          args: ["my_template"],
          params: { fullscreen: true, title: "Hi" },
        })
      ).toEqual("pop_up: my_template | fullscreen: true, title: Hi");
    });

    it("groups actions by trigger, in plain words", () => {
      const groups = groupActionsByTrigger([
        { trigger: "click", action_id: "go_to", args: ["home"] },
        { trigger: "sent", action_id: "set_field", args: ["sent", true] },
        { trigger: "click", action_id: "emit", args: ["force_reload"] },
      ]);
      expect(groups).toEqual([
        { trigger: "click", label: "When tapped", actions: ["go_to: home", "emit: force_reload"] },
        { trigger: "sent", label: "When it arrives", actions: ["set_field: sent: true"] },
      ]);
    });
  });
});
