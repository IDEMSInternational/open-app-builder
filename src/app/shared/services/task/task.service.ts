import { Injectable } from "@angular/core";
import { FlowTypes } from "../../model";
import { PLHDataService, TASK_LIST } from "../data/data.service";

@Injectable({ providedIn: "root" })
export class TaskService {
  allTasksById: Hashmap<FlowTypes.Task_listRow> = {};

  constructor(private plhDataService: PLHDataService) {
    this.processTaskList();
    this.processTaskActionHistory();
  }

  /*******************************************************************************
   * Public methods
   *******************************************************************************/

  /**
   * When running a task we want to trigger any required actions,
   * and add listeners to handle any completion events
   **/
  runTask(task_id: string) {
    const task = this.allTasksById[task_id];
    if (!task) {
      throw new Error(`task not found: ${task_id}`);
    }
    const { start_action, start_action_args, evaluation } = task;
    if (evaluation) {
      // TODO - add listeners/methods to know when task has been complete
    }
    if (start_action) {
      console.log("starting action", start_action);
      this.runAction(start_action, start_action_args);
    }
  }

  /** Generate a hashmap of all tasks sorted by id */
  private processTaskList() {
    const allTasksById: Hashmap<FlowTypes.Task_listRow> = {};
    TASK_LIST.forEach((taskFlow) => {
      taskFlow.rows.forEach((taskRow) => {
        allTasksById[taskRow.id] = taskRow;
      });
    });
    this.allTasksById = allTasksById;
  }

  /** Provide specific handlers for actions, such as starting a flow */
  public async runAction(
    actionId: FlowTypes.Task_listRow["start_action"],
    actionArgs: string = ""
  ) {
    const handlers: {
      [key in FlowTypes.Task_listRow["start_action"]]: (actionArgs: string) => Promise<any>;
    } = {
      give_award: this.handleGiveAwardAction,
      start_new_flow: this.handleStartNewFlowAction,
    };
    return handlers[actionId](actionArgs);
  }

  /*******************************************************************************
   * Specific action handlers
   *******************************************************************************/

  private async processTaskActionHistory() {
    // this.taskActions = await this.dbService.table<ITaskAction>("taskActions").toArray();
  }

  // private async addTaskAction(action: ITaskAction) {
  //   // await this.dbService.table<ITaskAction>("taskActions").put(action as ITaskAction);
  //   // await this.loadActions();
  // }
  // private async removeTaskAction(id: string) {
  //   // await this.dbService.table("taskActions").delete(id);
  //   // await this.loadActions();
  // }

  /** Launch a flow using the chat page interface, passing the flow id for starting */
  private async handleStartNewFlowAction(actionArgs: string) {
    console.log("handle start new flow action", actionArgs);
    const flowName = actionArgs;
    if (!flowName) {
      throw new Error("no flow id arg specified");
    }
    const flow = this.plhDataService.getFlowByName(flowName);
    if (!flow) {
      throw new Error(`could not find flow: ${flowName}`);
    }
    
    // const modal = await this.modalCtrl.create({
    //   component: ChatPage,
    //   componentProps: { flowName },
    // });
    // await modal.present();
    // const { role } = await modal.onDidDismiss();
    // console.log("modal dismissed", role);
    // return role as ITaskActionStatus;
  }

  private async handleGiveAwardAction(actionArgs: string) {
    // TODO
    return this.handleStartNewFlowAction(actionArgs);
  }
}

interface Hashmap<T> {
  [key: string]: T;
}
