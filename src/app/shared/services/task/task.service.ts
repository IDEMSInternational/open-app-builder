import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { filter, takeWhile } from "rxjs/operators";
import { FlowTypes } from "../../model";
import { TASK_LIST } from "../data/data.service";
import { TaskActionService } from "./task-action.service";

@Injectable({ providedIn: "root" })
export class TaskService {
  allTasksById: Hashmap<FlowTypes.Task_listRow> = {};

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private taskActions: TaskActionService
  ) {
    console.log("task service", this.modalCtrl);
    this.processTaskList();
    this.processTaskActionHistory();
  }

  /*******************************************************************************
   * Public methods
   *******************************************************************************/

  /**
   * When running a task we want to trigger any required actions,
   * and add listeners to handle any completion events
   */
  async startTask(task_id: string) {
    const task = this.allTasksById[task_id];
    if (!task) {
      throw new Error(`task not found: ${task_id}`);
    }
    const { start_action, flow_type, flow_name } = task;
    if (start_action) {
      // Make sure evaluation listeners are ready ahead of starting action in case
      // they instantly resolve on start
      if (flow_type && flow_name) {
        this.addFlowActionListeners(task_id, flow_name);
      }
      await this.taskActions.recordTaskAction({ task_id, type: "task_started" });
      this.runAction(task);
    }
  }

  async evaluateTaskCompleted(task_id: string) {
    const completionCount = await this.getTaskCompletions(task_id).count();
    return completionCount > 0;
  }

  getTaskCompletions(task_id: string) {
    return this.taskActions.table
      .where("task_id")
      .equals(task_id)
      .filter((t) => t._completed);
  }

  async evaluateTasklocked(task_id: string) {
    const task = this.allTasksById[task_id];
    if (task) {
      if (task.requires_list) {
        const evaluations = await Promise.all(
          task.requires_list.map(
            async (condition) => await this.evaluateTaskRequireCondition(condition)
          )
        );
        console.table(
          task.requires_list.map((t, i) => ({ condition: t, evaluation: evaluations[i] }))
        );
        return !evaluations.every((evaluation) => evaluation === true);
      } else {
        return false;
      }
    } else {
      console.error("could not find task_id", task_id);
    }
    return false;
  }
  private async evaluateTaskRequireCondition(condition: string): Promise<boolean> {
    // e.g. first_app_launch | delay_7_day |other_condition
    const [task_id, ...conditions] = condition.split("|").map((str) => str.trim());
    const completions = await this.getTaskCompletions(task_id).toArray();
    if (completions.length > 0) {
      // TODO - handle conditions
      console.log("TODO - evaluate conditions", completions, conditions);
      return true;
    }
    // TODO - provide informative reason for failure (?)

    return false;
  }

  /**
   * Listen to the action stream for actions related to the current task
   * If the flow is marked as completed also mark the overall task as completed
   */
  private addFlowActionListeners(task_id: string, flow_name: string) {
    this.taskActions.action$
      .pipe(
        filter((action) => action.flow_name === flow_name),
        takeWhile((action) => action.type !== "flow_completed")
        // TODO - add handler to break subscription if flow abandoned or similar
      )
      .subscribe(
        () => null,
        (err) => console.error(err),
        () => this.taskActions.recordTaskAction({ task_id, type: "task_completed" })
      );
  }

  /** Provide specific handlers for actions, such as starting a flow */
  public async runAction(task: FlowTypes.Task_listRow) {
    const handlers: {
      [key in FlowTypes.Task_listRow["start_action"]]: (
        task: FlowTypes.Task_listRow
      ) => Promise<any>;
    } = {
      give_award: () => this.handleGiveAwardAction(task),
      start_new_flow: () => this.handleStartNewFlowAction(task),
      open_app: null,
    };
    return handlers[task.start_action](task);
  }

  /*******************************************************************************
   * Initialisation
   *******************************************************************************/

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
  private async processTaskActionHistory() {
    // this.taskActions = await this.dbService.table<ITaskAction>("taskActions").toArray();
  }

  /*******************************************************************************
   * Specific action handlers
   *******************************************************************************/

  // private async addTaskAction(action: ITaskAction) {
  //   // await this.dbService.table<ITaskAction>("taskActions").put(action as ITaskAction);
  //   // await this.loadActions();
  // }
  // private async removeTaskAction(id: string) {
  //   // await this.dbService.table("taskActions").delete(id);
  //   // await this.loadActions();
  // }

  /** Launch a flow using the chat page interface, passing the flow id for starting */
  private async handleStartNewFlowAction(task: FlowTypes.Task_listRow) {
    const { flow_name, flow_type } = task;
    if (!flow_name || !flow_type) {
      throw new Error("flow type or name not specified");
    }
    this.router.navigate([flow_type, flow_name]);
  }

  private async handleGiveAwardAction(task: FlowTypes.Task_listRow) {
    const { start_action_args } = task;
    console.log("handle give award", start_action_args);
    // TODO
  }
}

interface Hashmap<T> {
  [key: string]: T;
}
