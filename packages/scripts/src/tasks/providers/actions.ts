import { setupActions } from "actions/lib";
import { ActiveDeployment } from "../../commands/deployment/get";

class ActionsProvider {
  async setup() {
    const activeDeployment = ActiveDeployment.get();
    setupActions(activeDeployment);
  }
}

export default new ActionsProvider();
