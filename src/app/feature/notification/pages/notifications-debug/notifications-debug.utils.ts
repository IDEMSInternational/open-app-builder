import type { PendingLocalNotificationSchema } from "@capacitor/local-notifications";
import type { FlowTypes } from "data-models";
import { differenceInCalendarDays, format } from "date-fns";
import type { ILocalNotificationInteractionDB } from "src/app/shared/services/notification/local-notification-persist.adapter";
import {
  type ILocalNotification,
  TEST_CAMPAIGN_ID,
} from "src/app/shared/services/notification/local-notification.service";
import type { IDBNotification } from "../../notification.types";
import { TEST_ID_PREFIX } from "./notifications-debug.constants";

/** Which notification system scheduled a notification */
export type INotificationSource = "campaign" | "action" | "other";

/** Notification that a test copy can be sent of, from the system that scheduled it */
export type IDebugNotificationOriginal =
  | { source: "campaign"; notification: ILocalNotification }
  | { source: "action"; notification: IDBNotification };

/** A notification listed on the debug page, from either notification system */
export interface IDebugNotification {
  /** Unique within the page */
  key: string;
  source: INotificationSource;
  title: string;
  text?: string;
  at?: Date;
  /** A test notification or test copy, sent from a debug page */
  isTest: boolean;
  actions: FlowTypes.TemplateRowAction[];
  /** Ids and statuses, for authors who want the technical detail */
  info: { label: string; value: string }[];
  /** Upcoming notifications only: why the notification will not arrive */
  warning?: string;
  /** Upcoming notifications only: past their scheduled time, but still scheduled on the device */
  overdue?: boolean;
  /** Set for notifications found only on the device, so that they can be cancelled there */
  deviceId?: number;
  /** Past notifications only */
  tapped?: boolean;
  tappedAt?: Date;
  /** Not set for notifications from other sources, as there is nothing to copy */
  original?: IDebugNotificationOriginal;
  /** Underlying records, for "Copy details" */
  raw: Record<string, unknown>;
}

/** Everything the page lists notifications from */
export interface IDebugNotificationSources {
  /** Notifications scheduled on the device */
  device: PendingLocalNotificationSchema[];
  /** The campaign notification service's saved notifications, past and future */
  campaignRecords: ILocalNotification[];
  /** Campaign notification history (`local_notifications_interaction`) */
  campaignHistory: ILocalNotificationInteractionDB[];
  /** Notification action records (`_notifications` data list) */
  actionRecords: IDBNotification[];
  /** Current time, in ms */
  now: number;
}

export const NOT_ON_DEVICE_WARNING = "Won't arrive: not scheduled on this device";
export const OVERDUE_NOTICE = "Due, but still waiting on the device. Android can deliver late.";

/**
 * Campaign notifications are saved straight away but only reach the device after the campaign
 * notification service's 2 s debounce, so do not warn about them until this time has passed
 */
const CAMPAIGN_SCHEDULING_GRACE_MS = 5000;

const TRIGGER_LABELS: Partial<Record<FlowTypes.TemplateRowActionTrigger, string>> = {
  click: "When tapped",
  notification_interacted: "When tapped",
  sent: "When it arrives",
  notification_received: "When it arrives (if not tapped)",
};

/**
 * Sort notifications from both systems into upcoming (soonest first) and past (newest first).
 *
 * Upcoming notifications are due in the future or still scheduled on the device, as Android can
 * deliver notifications after their scheduled time. Each one saved by either system is checked
 * against the device, to show any that will not arrive.
 *
 * Past campaign notifications are listed from the campaign service's saved notifications as well
 * as its history, as history only records a notification's arrival when the app next starts
 */
export function buildNotificationLists(sources: IDebugNotificationSources) {
  const { device, campaignRecords, campaignHistory, actionRecords, now } = sources;
  const deviceIds = new Set(device.map((n) => n.id));
  const upcoming: IDebugNotification[] = [];
  const past: IDebugNotification[] = [];

  const historyById = new Map(campaignHistory.map((entry) => [entry.notification_id, entry]));
  for (const record of campaignRecords) {
    const item = fromCampaignRecord(record);
    const onDevice = deviceIds.has(record.id);
    if (onDevice || isFuture(item, now)) {
      const created = record._created ? new Date(record._created).getTime() : 0;
      const scheduling = now - created <= CAMPAIGN_SCHEDULING_GRACE_MS;
      upcoming.push(withDeviceStatus(item, onDevice, now, !scheduling));
      continue;
    }
    const history = historyById.get(record.id);
    item.tapped = !!(history?.action_id || record._action_performed);
    item.tappedAt = toDate(history?.action_recorded_timestamp);
    if (history) {
      item.info.push(...historyInfo(history));
      item.raw.history = history;
    }
    past.push(item);
  }

  const campaignRecordIds = new Set(campaignRecords.map((r) => r.id));
  for (const entry of campaignHistory) {
    // Skip notifications listed from campaign records above, and taps on notification action
    // notifications, which the campaign service also records
    if (campaignRecordIds.has(entry.notification_id)) continue;
    if (entry.notification_meta?.source === "action") continue;
    past.push(fromCampaignHistory(entry));
  }

  for (const record of actionRecords) {
    const item = fromActionRecord(record);
    const onDevice = deviceIds.has(record._internal_id);
    if (onDevice || (record.status === "pending" && isFuture(item, now))) {
      upcoming.push(withDeviceStatus(item, onDevice, now));
      continue;
    }
    item.tapped = record.status === "interacted";
    item.tappedAt = toDate(record.action_performed?.timestamp);
    past.push(item);
  }

  // Anything on the device that neither system has a record of
  const recordIds = new Set([...campaignRecordIds, ...actionRecords.map((r) => r._internal_id)]);
  for (const notification of device) {
    if (!recordIds.has(notification.id)) {
      upcoming.push(withDeviceStatus(fromDeviceOnly(notification), true, now));
    }
  }

  return {
    upcoming: upcoming.sort((a, b) => getTime(a) - getTime(b)),
    past: past.sort((a, b) => getTime(b) - getTime(a)),
  };
}

/** Group notifications by day, keeping their order. Overdue notifications are grouped together */
export function groupByDay<T extends { at?: Date; overdue?: boolean }>(items: T[], now: number) {
  const groups: { label: string; items: T[] }[] = [];
  for (const item of items) {
    const label = item.overdue ? "Overdue" : dayLabel(item.at, now);
    const group = groups[groups.length - 1];
    if (group?.label === label) {
      group.items.push(item);
    } else {
      groups.push({ label, items: [item] });
    }
  }
  return groups;
}

/** Group actions by trigger, written as they are authored, e.g. `go_to: home` */
export function groupActionsByTrigger(actions: FlowTypes.TemplateRowAction[] = []) {
  const groups: { trigger: string; label: string; actions: string[] }[] = [];
  for (const action of actions) {
    let group = groups.find((g) => g.trigger === action.trigger);
    if (!group) {
      const label = TRIGGER_LABELS[action.trigger] ?? `When ${action.trigger}`;
      group = { trigger: action.trigger, label, actions: [] };
      groups.push(group);
    }
    group.actions.push(formatAction(action));
  }
  return groups;
}

/** Write an action as authored, e.g. `pop_up: my_template | fullscreen: true` */
export function formatAction({ action_id, args = [], params = {} }: FlowTypes.TemplateRowAction) {
  const text = [action_id, ...args.map(formatValue)].join(": ");
  const paramText = Object.entries(params)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join(", ");
  return paramText ? `${text} | ${paramText}` : text;
}

export function isTestCampaignNotification(extra?: Record<string, any>) {
  return extra?.campaign_id === TEST_CAMPAIGN_ID || extra?.test_copy === true;
}

export function isTestActionNotification(id?: string) {
  return !!id?.startsWith(TEST_ID_PREFIX);
}

/** Campaign history entry for a test notification, from either notification system */
export function isTestHistoryEntry({ notification_meta: meta }: ILocalNotificationInteractionDB) {
  if (meta?.source === "action") {
    return isTestActionNotification(meta.id);
  }
  return isTestCampaignNotification(meta);
}

function fromCampaignRecord(record: ILocalNotification): IDebugNotification {
  return {
    key: `campaign_${record.id}`,
    source: record.extra?.campaign_id ? "campaign" : "other",
    title: record.title,
    text: record.body,
    at: toDate(record.schedule?.at),
    isTest: isTestCampaignNotification(record.extra),
    actions: record.extra?.action_list ?? [],
    info: [...campaignInfo(record.extra), { label: "Device id", value: String(record.id) }],
    original: { source: "campaign", notification: record },
    raw: { record },
  };
}

function fromCampaignHistory(entry: ILocalNotificationInteractionDB): IDebugNotification {
  const { title, text, ...extra } = entry.notification_meta ?? {};
  const at = toDate(
    entry.schedule_timestamp ??
      entry.sent_recorded_timestamp ??
      entry.action_recorded_timestamp ??
      entry._created
  );
  const isCampaign = !!extra.campaign_id;
  const item: IDebugNotification = {
    key: `campaign_${entry.notification_id}`,
    source: isCampaign ? "campaign" : "other",
    title,
    text,
    at,
    isTest: isTestCampaignNotification(extra),
    actions: extra.action_list ?? [],
    info: [
      ...campaignInfo(extra),
      { label: "Device id", value: String(entry.notification_id) },
      ...historyInfo(entry),
    ],
    tapped: !!entry.action_id,
    tappedAt: toDate(entry.action_recorded_timestamp),
    raw: { history: entry },
  };
  if (isCampaign) {
    const notification = { id: entry.notification_id, title, body: text, schedule: { at }, extra };
    item.original = { source: "campaign", notification };
  }
  return item;
}

function fromActionRecord(record: IDBNotification): IDebugNotification {
  return {
    key: `action_${record.id}`,
    source: "action",
    title: record.title || record.id,
    text: record.text,
    at: toDate(record.schedule_at),
    isTest: isTestActionNotification(record.id),
    actions: record.action_list ?? [],
    info: [
      { label: "Notification id", value: record.id },
      { label: "Status", value: record.status },
      { label: "Device id", value: String(record._internal_id) },
    ],
    original: { source: "action", notification: record },
    raw: { record },
  };
}

/** Notification on the device that neither notification system has a record of */
function fromDeviceOnly(notification: PendingLocalNotificationSchema): IDebugNotification {
  const { id, title, body, schedule, extra } = notification;
  let source: INotificationSource = "other";
  if (extra?.campaign_id) source = "campaign";
  else if (extra?.source === "action") source = "action";
  return {
    key: `device_${id}`,
    source,
    title,
    text: body,
    at: toDate(schedule?.at),
    isTest: isTestCampaignNotification(extra) || isTestActionNotification(extra?.id),
    actions: extra?.action_list ?? [],
    info: [
      { label: "Device id", value: String(id) },
      { label: "App record", value: "none, only found on the device" },
    ],
    deviceId: id,
    raw: { device: notification },
  };
}

/** Record whether an upcoming notification is on the device, and whether it is overdue */
function withDeviceStatus(
  item: IDebugNotification,
  onDevice: boolean,
  now: number,
  warnIfMissing = true
) {
  item.info.push({ label: "Scheduled on device", value: onDevice ? "yes" : "no" });
  if (!onDevice) {
    if (warnIfMissing) item.warning = NOT_ON_DEVICE_WARNING;
  } else if (item.at && item.at.getTime() <= now) {
    item.overdue = true;
  }
  return item;
}

function campaignInfo(extra: Record<string, any> = {}) {
  return infoRows([
    ["Campaign", extra.campaign_id],
    ["Copy of campaign", extra.original_campaign_id],
    ["Row", extra.row_id],
    ["Test copy", extra.test_copy ? "yes" : undefined],
  ]);
}

function historyInfo(entry: ILocalNotificationInteractionDB) {
  return infoRows([
    ["History server sync", entry._sync_status],
    ["Tap action id", entry.action_id],
  ]);
}

/** Info rows with a value */
function infoRows(rows: [label: string, value?: string][]) {
  return rows
    .filter((row): row is [string, string] => row[1] !== undefined)
    .map(([label, value]) => ({ label, value }));
}

function isFuture(item: IDebugNotification, now: number) {
  return !!item.at && item.at.getTime() > now;
}

function getTime(item: IDebugNotification) {
  return item.at?.getTime() ?? 0;
}

function toDate(value?: string | number | Date) {
  if (value === undefined || value === null || value === "") return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

function dayLabel(at: Date | undefined, now: number) {
  if (!at) return "No time set";
  const days = differenceInCalendarDays(at, now);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  const sameYear = at.getFullYear() === new Date(now).getFullYear();
  return format(at, sameYear ? "EEE d MMM" : "EEE d MMM yyyy");
}

function formatValue(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value);
}
