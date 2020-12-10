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
  // constructor(
  //   private dbService: DbService,
  //   private alertCtrl: AlertController,
  //   private modalCtrl: ModalController
  // ) {
  //   this.loadActions();
  // }
}
