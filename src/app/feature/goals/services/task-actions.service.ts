import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DbService } from "src/app/shared/services/db/db.service";
import { ITaskAction } from "../models/goals.model";

@Injectable({
  providedIn: "root",
})
export class TaskActionsService {
  constructor(private dbService: DbService, private alertCtrl: AlertController) {}

  public async addTaskAction(action: ITaskAction) {
    await this.dbService.table<ITaskAction>("taskActions").put(action as ITaskAction);
  }
  public async removeTaskAction(id: string) {
    await this.dbService.table("taskActions").delete(id);
  }
  public async runAction(actionId: string, actionArgs: string = "") {
    switch (actionId) {
      case "example_case":
        // TODO
        break;

      default:
        const header = actionId;
        const message = actionArgs;
        const alert = await this.alertCtrl.create({ header, message });
        await alert.present();
        const { role } = await alert.onDidDismiss();
        return role;
    }
  }
}
