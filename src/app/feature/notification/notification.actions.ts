import { Schedule } from "@capacitor/local-notifications";
import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { stringToIntegerHash } from "src/app/shared/utils";

interface INotificationCreateParams {
  id: string;
  title: string;
  body: string;
  /** Timestamp to schedule at */
  at: string;
}
interface INotificationRemoveParams {
  id: string;
}

/**
 * TODO
 * - [ ] Support conditional schedule (e.g. if not already)
 * - [ ] Map pending notifications to data_list
 * - [ ] Track field for permission granted
 * - [ ] Input param validation
 * - [ ] Tests
 */
export class NotificationActionFactory {
  constructor(private service: LocalNotificationService) {}

  public notification: IActionHandler = async ({ params, args }) => {
    const [actionId] = args;
    const childActions = {
      create: async () => {
        const { body, id, title, at } = params as INotificationCreateParams;
        const schedule: Schedule = { at: new Date(at) };
        return this.service.scheduleNotification({
          id: stringToIntegerHash(id),
          schedule,
          body,
          title,
          extra: {},
        });
      },
      remove: async () => {
        const { id } = params as INotificationRemoveParams;
        return this.service.removeNotifications([stringToIntegerHash(id)]);
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
