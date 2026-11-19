import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NavStackService } from "./nav-stack.service";
import { INavStackConfig } from "./components/nav-stack/nav-stack.component";

interface INavStackActionParams {
  template: string;
  title: string;
  show_close_button: boolean;
  header: boolean;
}

export class NavStackActionFactory {
  constructor(private service: NavStackService) {}

  public nav_stack: IActionHandler<INavStackActionParams> = async ({ params, args }, host) => {
    const [actionId] = args;
    const childActions = {
      open: async () => {
        const { template, title, show_close_button = true, header = true } = params;
        const navStackConfig = {
          templateName: template,
          title,
          showCloseButton: show_close_button,
          header,
        } as INavStackConfig;
        this.service.pushNavStack(navStackConfig);
      },
      // the template underneath resumes after the rest of the action list, e.g. a following pop_up
      close_top: async () => {
        await this.service.closeTopNavStack(host?.whenQueueIdle());
      },
      close_all: async () => {
        await this.service.closeAllNavStacks(host?.whenQueueIdle());
      },
    };
    if (!(actionId in childActions)) {
      console.error(`[NAV_STACK] No action, ${actionId}`);
      return;
    }
    return childActions[actionId]();
  };
}
