import { Injectable } from "@angular/core";
import { format } from "date-fns";
import { DbService } from "src/app/shared/services/db/db.service";
import { GOALS_MOCK } from "../models/goals.mock";
import { arrayToHashmap } from "src/app/shared/utils";
import {
  IGoalTask,
  ITaskAction,
  IGoalWithMeta,
  IUserGoal,
} from "../models/goals.model";
import { REMINDER_TYPES } from "../models/reminders.model";

@Injectable({
  providedIn: "root",
})
export class GoalsService {
  public userGoals: IGoalWithMeta[] = [];
  public allGoals: IGoalWithMeta[] = [];
  public taskReminders: any[] = [];

  constructor(private dbService: DbService) {}

  public async loadGoals() {
    const allGoals = GOALS_MOCK();
    const userGoals = await this.dbService.table<IUserGoal>("goals").toArray();
    const allActions = await this.dbService.table<any>("taskActions").toArray();
    this.userGoals = this.processUserGoals(userGoals, allGoals, allActions);
    this.allGoals = this.processAllGoals(allGoals, userGoals);
    this.taskReminders = this.processUserTaskReminders(this.userGoals);
  }

  public async addGoal(id: string) {
    await this.dbService.table<IUserGoal>("goals").put(
      {
        id,
        _created: new Date().toISOString(),
        _modified: new Date().toISOString(),
      },
      id
    );
  }
  public async addTaskAction(taskId: string, taskDayString: string) {
    const id = `${taskId}__${taskDayString}`;
    const timestamp = new Date().toISOString();
    const action: ITaskAction = { taskId, id, timestamp };
    await this.dbService.table<ITaskAction>("taskActions").put(action, id);
  }
  public async removeTaskAction(taskId: string, taskDayString: string) {
    const id = `${taskId}__${taskDayString}`;
    await this.dbService.table("taskActions").delete(id);
  }

  public async deleteGoal(id: string) {
    await this.dbService.table("goals").delete(id);
  }

  /**
   * track goal metadata with user goal
   */
  private processUserGoals(userGoals: IUserGoal[], allGoals, allActions) {
    const allGoalsHash = arrayToHashmap<IGoalWithMeta>(allGoals, "id");
    const userGoalsWithMeta = userGoals.map((userGoal) => {
      const goalMeta = allGoalsHash[userGoal.id];
      goalMeta.tasks = goalMeta.tasks.map((t) =>
        this.processUserTask(t, allActions)
      );
      const progress = this._calcAverage(goalMeta.tasks.map((t) => t.progress));
      return {
        ...goalMeta,
        ...userGoal,
        progress,
      };
    });

    return userGoalsWithMeta.sort((a, b) => (b.id > a.id ? 1 : -1));
  }

  /**
   * track in all goals whether use has selected
   */
  private processAllGoals(allGoals: IGoalWithMeta[], userGoals: IUserGoal[]) {
    const userGoalsHash = arrayToHashmap(userGoals, "id");
    const allGoalsWithMeta = allGoals.map((g) => {
      let selected = false;
      const unlocked = this.checkGoalUnlocked(g, userGoalsHash);
      if (userGoalsHash.hasOwnProperty(g.id)) {
        selected = true;
      }
      return { ...g, selected, unlocked };
    });
    return allGoalsWithMeta;
  }

  private processUserTaskReminders(userGoals: IGoalWithMeta[]) {
    const userTasks: IGoalTask[] = [];
    for (const goal of userGoals) {
      for (const task of goal.tasks) {
        if (task.progress !== 100) {
          userTasks.push(task);
        }
      }
    }
    return userTasks.sort((a, b) => (b.id > a.id ? 1 : -1));
  }

  private processUserTask(task: IGoalTask, allActions: ITaskAction[]) {
    const { id, count } = task;
    const actions = allActions.filter((a) => a.taskId === id);
    const taskMeta = REMINDER_TYPES[id];
    task.completionByDay = {};
    for (const action of actions) {
      const dayCompleted = format(new Date(action.timestamp), "yyyy-MM-dd");
      task.completionByDay[dayCompleted] = true;
    }
    task.progress = Math.round((actions.length / count) * 100);
    return { ...taskMeta, ...task };
  }

  private checkGoalUnlocked(goal: IGoalWithMeta, userGoalsHash) {
    return goal.preRequisites.every(
      (preReqId) => userGoalsHash[preReqId]?.complete === true
    );
  }

  private _calcAverage(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}
