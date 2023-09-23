import { setupActions } from "actions";
import { ActiveDeployment } from "../../models";

class ActionsProvider {
  async setup() {
    const activeDeployment = await ActiveDeployment.load();
    setupActions(activeDeployment);
  }
}

export default new ActionsProvider();
