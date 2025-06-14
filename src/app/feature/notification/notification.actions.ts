import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NotificationService } from "./notification.service";
import { INotification } from "./notification.types";

interface INotificationRemoveParams {
  id: string;
}

export class NotificationActionFactory {
  constructor(private service: NotificationService) {}

  public notification: IActionHandler = async ({ params, args }) => {
    const [actionId] = args;
    const childActions = {
      create: async () => {
        return this.service.scheduleNotification(params as INotification);
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
}
