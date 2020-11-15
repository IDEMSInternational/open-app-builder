import { Injectable } from "@angular/core";
import { DbService } from "src/app/shared/services/db/db.service";
import { ITaskAction } from "../models/goals.model";

@Injectable({
  providedIn: "root",
})
export class TaskActionsService {
  constructor(private dbService: DbService) {}

  public async addTaskAction(action: ITaskAction) {
    await this.dbService.table<ITaskAction>("taskActions").put(action as ITaskAction);
  }
  public async removeTaskAction(id: string) {
    await this.dbService.table("taskActions").delete(id);
  }
  public async runAction(actionId: string, actionArgs: string = "") {
    switch (actionId) {
      case "":
        // TODO
        break;

      default:
        alert(`This will launch [${actionId}]:[${actionArgs}]`);
    }
  }
}
