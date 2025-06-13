import { LocalNotificationSchema } from "@capacitor/local-notifications";

export interface INotification {
  title: string;
  text: string;
  id: string;
  // NOTE - when passing from authored date object will be serialized to isoString
  // this will likely be in local timezone format, e.g. "2025-06013T19:20:00"
  schedule_at: string;
}

export interface IDBNotification extends INotification {
  /** Track integer id provided to internal notification */
  _internal_id: number;
}

/** When writing notification to capacitor include db notification id in extra */
export type INotificationInternal = Omit<LocalNotificationSchema, "extra"> & {
  extra: { id: string };
};
