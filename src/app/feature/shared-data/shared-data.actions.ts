import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { SharedDataService } from "./shared-data.service";

interface INavStackActionParams {
  template: string;
  title: string;
  show_close_button: boolean;
  header: boolean;
}

export class SharedDataActionFactory {
  constructor(private service: SharedDataService) {}

  public shared_data: IActionHandler<INavStackActionParams> = async ({ params, args }) => {
    await this.service.ready();
    const [actionId] = args;
    const childActions = {
      create: async () => {
        console.log("create", args, params);
        // TODO
      },
      set: async () => {
        // TODO
      },
      invite: async () => {
        // TODO
      },
    };
    if (!(actionId in childActions)) {
      console.error(`[SHARED_DATA] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId]();
  };
}
