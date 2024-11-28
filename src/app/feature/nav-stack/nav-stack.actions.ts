import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NavStackService } from "./nav-stack.service";

interface INavStackActionParams {
  template: string;
  title: string;
  show_close_button: boolean;
  use_template_header: boolean;
}

export class NavStackActionFactory {
  constructor(private service: NavStackService) {}

  public nav_stack: IActionHandler<INavStackActionParams> = async ({ params, args }) => {
    const [actionId] = args;
    const childActions = {
      open: async () => {
        const { template, title, show_close_button = true, use_template_header } = params;
        const navStackConfig = {
          templateName: template,
          title,
          showCloseButton: show_close_button,
          useTemplateHeader: use_template_header,
        };
        this.service.pushNavStack(navStackConfig);
      },
      close_top: async () => {
        await this.service.closeTopNavStack();
      },
      close_all: async () => {
        await this.service.closeAllNavStacks();
      },
    };
    if (!(actionId in childActions)) {
      console.error(`[NAV_STACK] No action, ${actionId}`);
      return;
    }
    return childActions[actionId]();
  };
}
