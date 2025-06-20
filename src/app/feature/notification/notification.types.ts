import { LocalNotificationSchema } from "@capacitor/local-notifications";
import { FlowTypes } from "packages/data-models";

export interface INotification {
  id: string;
  // NOTE - when passing from authored date object will be serialized to isoString
  // this will likely be in local timezone format, e.g. "2025-06013T19:20:00"
  schedule_at: string;
  title?: string;
  text?: string;
  /** Action to be triggered if user taps notification */
  action?: FlowTypes.TemplateRowAction[];
  // TODO - Future proposed syntax for multiple action buttons
  //        would need to author as `{actions.0: some_action, actions.1: another_actions}
  // actions?: { id: string; button_text?: string; action_list: FlowTypes.TemplateRowAction[] }[];
}

export interface IDBNotification extends INotification {
  /** Track integer id provided to internal notification */
  _internal_id: number;
}

/** When writing notification to capacitor include db notification id in extra */
export type INotificationInternal = Omit<LocalNotificationSchema, "extra"> & {
  extra: { id: string };
};
