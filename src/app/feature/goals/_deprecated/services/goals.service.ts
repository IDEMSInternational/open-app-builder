import { Injectable } from "@angular/core";
import { IGoalWithMeta } from "../../models/goals.model";
// type IData = typeof DATA;

@Injectable({
  providedIn: "root",
})
/**
 * The goals service handles loading hardcoded goals, tasks, completion criteria and reminders,
 * tidying up various data structures and making accessible to display components
 */
export class GoalsService {
  public userGoals: IGoalWithMeta[] = [];
  public allGoals: IGoalWithMeta[] = [];
  public taskReminders: any[] = [];

  // private taskListHash: Hashmap<ITask> = {};
  // private completionListHash: Hashmap<ITaskCompletionCriteria> = {};
  // private actionHistory: ITaskAction[];

  // constructor(private dbService: DbService) {}

  /*************************************************************************
   *  Public Methods
   ************************************************************************/

  /**
   * When initialising the service load all hardcoded data, merge and refactor
   * data structures as required, and bind to local variables for use in display
   * components
   */
  public async loadGoals() {
    // const { CompletionsList, GoalsList, RemindersList, TasksList } = DATA;
    // this.completionListHash = arrayToHashmap(CompletionsList, "id");
    // this.taskListHash = this.processTasksList(TasksList);
    // this.actionHistory = await this.dbService.table<any>("task_actions").toArray();
    // const userGoals = await this.dbService.table<IUserGoal>("goals").toArray();
    // this.allGoals = this.processGoalsList(GoalsList, userGoals);
    // this.userGoals = this.processUserGoals(userGoals, this.allGoals);
    // this.taskReminders = this.processUserTaskReminders(this.userGoals);
  }

  /**
   * Mark a goal as active for the current user by adding to their local goals table
   */
  public async addGoal(id: string) {
    // await this.dbService.table<IUserGoal>("goals").put(
    //   {
    //     id,
    //     _created: new Date().toISOString(),
    //     _modified: new Date().toISOString(),
    //   },
    //   id
    // );
  }

  /**
   * Remove a goal from the current user's active goals list by removing from the database
   */
  public async deleteGoal(id: string) {
    // await this.dbService.table("goals").delete(id);
  }

  /*************************************************************************
   *  Private Methods
   ************************************************************************/

  /**
   * Read raw task data, refactor as required for use in components
   */
  // private processTasksList(taskList: IData["TasksList"]) {
  //   const tasks = taskList.map((t) => {
  //     const task: ITask = {
  //       id: t.id,
  //       label: t.label || "",
  //       trigger_on: this._strToArray(t.trigger_on),
  //       start_action: t.start_action,
  //       start_action_args: t.start_action_args,
  //       // TODO - decide how to foramt/handle evaluation functions
  //       evaluation: null,
  //     };
  //     return task;
  //   });
  //   return arrayToHashmap(tasks, "id");
  // }

  /**
   * Take list of user-tracked goals from database, merge full task metadata
   * and evaulate progress
   */
  // private processUserGoals(userGoals: IUserGoal[], allGoals: IGoalWithMeta[]) {
  //   const allGoalsHash = arrayToHashmap<IGoalWithMeta>(allGoals, "id");
  //   const userGoalsWithMeta = userGoals.map((userGoal) => {
  //     const goalMeta = allGoalsHash[userGoal.id];
  //     // goalMeta.tasks = goalMeta.tasks.map((t) => this.processUserTask(t, allActions));
  //     // const progress = this._calcAverage(goalMeta.tasks.map((t) => t.progress));
  //     return {
  //       ...goalMeta,
  //       ...userGoal,
  //       // progress,
  //     };
  //   });

  //   return userGoalsWithMeta.sort((a, b) => (b.id > a.id ? 1 : -1));
  // }

  /**
   * Read raw goal data, refactor fields as required and evaulate calculated fields
   */
  // private processGoalsList(allGoals: IData["GoalsList"], userGoals: IUserGoal[]) {
  //   const userGoalsHash = arrayToHashmap(userGoals, "id");

  //   const allGoalsWithMeta = allGoals.map((g) => {
  //     const tasks = this.getTasksFromCompletionCriteria(g.completion_id);
  //     const goal: IGoalWithMeta = {
  //       id: g.id,
  //       label: g.label,
  //       groups: this._strToArray(g.groups),
  //       tasks,
  //       requires: [],
  //       progress: this.evaluateGoalProgress(tasks),
  //       unlocked: this.evaluateGoalUnlocked(this._strToArray(g.requires)),
  //       active: userGoalsHash.hasOwnProperty(g.id),
  //     };
  //     return goal;
  //   });
  //   console.log("all goals with meta", allGoalsWithMeta);
  //   return allGoalsWithMeta;
  // }

  /**
   * Lookup completion criteria for a goal, and merge into full task metadata
   * where available. Return as an array of task objects with completion field meta
   */
  // private getTasksFromCompletionCriteria(completionIdList: string) {
  //   const completionMeta = this.getCompletionMeta(completionIdList);
  //   const tasks: ITaskWithMeta[] = [];
  //   completionMeta.forEach((criteria) => {
  //     if (this.taskListHash[criteria.task_id]) {
  //       const actionHistory = this.actionHistory.filter((a) => a.task_id === criteria.task_id);
  //       criteria.progress = this.evaluateTaskCriteriaProgress(criteria, actionHistory);
  //       tasks.push({
  //         ...this.taskListHash[criteria.task_id],
  //         goalCompletionCriteria: criteria,
  //         actionHistory,
  //       });
  //     }
  //   });
  //   return tasks;
  // }

  // private evaluateTaskCriteriaProgress(
  //   criteria: ITaskCompletionCriteria,
  //   actionHistory: ITaskAction[]
  // ) {
  //   const { repeat_count, repeat_interval, reset_interval } = criteria;
  //   const completeCount = actionHistory.filter((a) => a.status === "COMPLETED").length;
  //   if (repeat_interval) {
  //     console.warn("Repeat interval not currently supported");
  //   }
  //   if (reset_interval) {
  //     console.warn("Reset interval not currently supported");
  //   }
  //   if (repeat_count) {
  //     return (completeCount / repeat_count) * 100;
  //   } else {
  //     return (completeCount / 1) * 100;
  //   }
  // }

  /**
   * Merge goal completion id list with completion data
   */
  // private getCompletionMeta(idList: string) {
  //   const criteria: ITaskCompletionCriteria[] = [];
  //   const ids = this._strToArray(idList);
  //   ids.forEach((id) => {
  //     if (this.completionListHash.hasOwnProperty(id)) {
  //       criteria.push(this.completionListHash[id]);
  //     } else {
  //       console.warn("no completion criteria found", id);
  //     }
  //   });
  //   return criteria;
  // }

  // private processUserTaskReminders(userGoals: IGoalWithMeta[]) {
  //   const userTasks: ITask[] = [];
  //   for (const goal of userGoals) {
  //     for (const task of goal.tasks) {
  //       userTasks.push(task);
  //     }
  //   }
  //   return userTasks.sort((a, b) => (b.id > a.id ? 1 : -1));
  // }

  // private evaluateGoalProgress(tasks: ITaskWithMeta[]) {
  //   // limit progress to 100% for average calculation (some tasks could be exceeded if triggered elswhere)
  //   const tasksProgress = tasks.map((t) => Math.min(t.goalCompletionCriteria.progress, 100));
  //   return this._calcAverage(tasksProgress);
  // }

  // private evaluateGoalUnlocked(requires: IGoal["requires"]) {
  //   return requires.every((condition) => this.evaluateRequireCondition(condition));
  // }
  // private evaluateRequireCondition(condition: string) {
  //   // TODO
  //   return true;
  // }

  // private evaluateUnlockCondition(condition: ITaskCompletionCriteria) {}

  // private _calcAverage(arr: number[]) {
  //   return arr.reduce((a, b) => a + b, 0) / arr.length;
  // }
  /**
   * Take a string and split into an array based on character separator.
   * Removes additional whitespace and linebreak characters and empty values
   */
  // private _strToArray(str: string = "", separator = ";") {
  //   return (
  //     str
  //       .replace(/\r\n/, "")
  //       .split(separator)
  //       .map((s) => s.trim())
  //       // remove empty strings, undefined or null values
  //       .filter((el) => (el ? true : false))
  //   );
  // }
}


