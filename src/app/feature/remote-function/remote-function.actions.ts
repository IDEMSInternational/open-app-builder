import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { RemoteFunctionService } from "./remote-function.service";

interface IRemoteFunctionActionParams {
  /** Name given to function for tracking response */
  _id?: string;
  /** Payload sent with function */
  [key: string]: string;
}

export class RemoteFunctionActionFactory {
  constructor(private service: RemoteFunctionService) {}

  public remote_function: IActionHandler<IRemoteFunctionActionParams> = async ({
    params,
    args,
  }) => {
    await this.service.ready();
    const [actionId] = args;
    const childActions = {
      run: async () => {
        console.log("create", args, params);
        // TODO
      },
    };
    if (!(actionId in childActions)) {
      console.error(`[REMOTE_FUNCTION] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId]();
  };
}
