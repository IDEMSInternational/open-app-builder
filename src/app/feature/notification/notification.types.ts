import type { LocalNotificationSchema } from "@capacitor/local-notifications";
import type { FlowTypes } from "packages/data-models";

export interface INotification {
  id: string;
  // NOTE - when passing from authored date object will be serialized to isoString
  // this will likely be in local timezone format, e.g. "2025-06013T19:20:00"
  schedule_at: string;
  title?: string;
  text?: string;
  /** Actions to be triggered if user taps notification */
  action_list?: FlowTypes.TemplateRowAction[];
  // TODO - Future proposed syntax for multiple action buttons (native only)
}

export interface IDBNotification extends INotification {
  /** Track integer id provided to internal notification */
  _internal_id: number;
  status: "pending" | "interacted" | "ignored";
  action_performed?: {
    timestamp: string;
    id?: string; // ID of action button interactions
  };
}

/** When writing notification to capacitor include db notification id in extra */
export type INotificationInternal = Omit<LocalNotificationSchema, "extra"> & {
  extra: {
    /** reference to db notification id */
    id: string;
    /** source of notification, e.g. action, campaign */
    source: string;
  };
};
