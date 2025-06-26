import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NotificationService } from "./notification.service";
import { INotification } from "./notification.types";
import { FlowTypes } from "packages/data-models";

interface INotificationRemoveParams {
  id: string;
}
type INotificationSetParams = Omit<INotification, "action"> & {
  /** authored action param from data_list row that includes `action_list` column */
  action: { id: string; action_list: FlowTypes.TemplateRowAction[] };
};

export class NotificationActionFactory {
  constructor(private service: NotificationService) {}

  public notification: IActionHandler = async ({ params, args }) => {
    const [actionId] = args;
    const childActions = {
      create: async () => {
        const notification = this.parseNotificationCreateParams(params as INotificationSetParams);
        return this.service.scheduleNotification(notification);
      },
      cancel: async () => {
        const { id } = params as INotificationRemoveParams;
        return this.service.cancelNotification(id);
      },
      cancel_all: async () => {
        return this.service.cancelAll();
      },
      request_permission: async () => {
        return this.service.requestPermission();
      },
    };
    if (!(actionId in childActions)) {
      console.error(`[NOTIFICATION] No action, ${actionId}`);
      return;
    }
    return childActions[actionId]();
  };

  private parseNotificationCreateParams(params: INotificationSetParams) {
    const { action, ...rest } = params;
    const notification: INotification = rest;
    if (action) {
      const { action_list } = action;
      notification.action = action_list;
    }
    return notification;
  }
}
