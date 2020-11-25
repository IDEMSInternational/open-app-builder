import { Injectable } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { DbService } from "src/app/shared/services/db/db.service";
import { ChatPage } from "../../chat/components/chat.page";
import { ITaskAction, ITaskActionStatus } from "../models/goals.model";

@Injectable({
  providedIn: "root",
})
export class TaskActionsService {
  taskActions: ITaskAction[] = [];
  constructor(
    private dbService: DbService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.loadActions();
  }

  public async loadActions() {
    this.taskActions = await this.dbService.table<ITaskAction>("taskActions").toArray();
  }

  public async addTaskAction(action: ITaskAction) {
    await this.dbService.table<ITaskAction>("taskActions").put(action as ITaskAction);
    await this.loadActions();
  }
  public async removeTaskAction(id: string) {
    await this.dbService.table("taskActions").delete(id);
    await this.loadActions();
  }
  public async runAction(actionId: string, actionArgs: string = ""): Promise<ITaskActionStatus> {
    switch (actionId) {
      case "start_new_flow":
        return this.handleStartNewFlowAction(actionArgs);
      case "give_award":
        return this.handleGiveAwardAction(actionArgs);
      default:
        console.log("no handler", actionId);
        return this.handleActionDefault(actionId, actionArgs);
    }
  }

  /*******************************************************************************
   * Specific action handlers
   *******************************************************************************/

  /** Display modal with name of action (development use only) */
  private async handleActionDefault(actionId: string, actionArgs: string) {
    console.warn("No action handler for", actionId);
    const header = actionId;
    const message = actionArgs;
    const alert = await this.alertCtrl.create({ header, message });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role as ITaskActionStatus;
  }

  /** Launch a flow using the chat page interface, passing the flow id for starting */
  private async handleStartNewFlowAction(actionArgs: string) {
    const flowName = actionArgs;
    if (!flowName) {
      throw new Error("no flow id arg specified");
    }
    const modal = await this.modalCtrl.create({
      component: ChatPage,
      componentProps: { flowName },
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    console.log("modal dismissed", role);
    return role as ITaskActionStatus;
  }

  private async handleGiveAwardAction(actionArgs: string) {
    // TODO
    return this.handleStartNewFlowAction(actionArgs);
  }
}
