import { Injectable } from '@angular/core';
import { IndexableType } from 'dexie';
import { arrayToHashmap } from '../../utils';
import { HABIT_LIST } from '../data/data.service';
import { DbService } from '../db/db.service';
import { ITaskEntry } from '../task/task-action.service';
import { IHabit, IHabitActivityIdea } from './habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private dbService: DbService) { }

  public async getHabitWeeklyCount(habitId: string): Promise<number> {
    const oneWeekAgo = new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
    let weeklyCount = 0;
    const habitListByTaskID = arrayToHashmap(HABIT_LIST[0].rows, "task_id");
    const completedTasks = await this.dbService.table<ITaskEntry>("task_actions")
      .toArray();
    completedTasks.forEach((t) => {
      const date = new Date(t._created);
      if (t._completed && date > oneWeekAgo && habitListByTaskID.hasOwnProperty(t.task_id)) {
        const completedHabitId = habitListByTaskID[t.task_id].id;
        if (completedHabitId === habitId) {
          weeklyCount++;
        }
      }
    });
    return weeklyCount;
  }

  public async setHabitWeeklyAim(habitId: string, weeklyAim: number) {
    return this.dbService
      .table<IHabit>("habits")
      .put({
        habitId: habitId,
        weeklyAim: weeklyAim
      }, "habitId");
  }

  public async getHabitWeeklyAim(habitId: string): Promise<number | null> {
    try {
      const dbHabit = await this.dbService
      .table<IHabit>("habits")
      .where("habitId")
      .equals(habitId)
      .first();
      if (dbHabit) {
        return dbHabit.weeklyAim;
      }
    } catch (ex) {
      console.warn("No habit found for id", habitId, ex);
    }
    return null;
  }

  public async getUserHabitActivityIdeas(flowName: string): Promise<string[]> {
    try {
      const dbHabitActivityIdeas = await this.dbService
        .table<IHabitActivityIdea>("habit_activity_ideas")
        .where("flowName")
        .equals(flowName)
        .toArray();
      return dbHabitActivityIdeas.map((idea) => idea.ideaTitle);
    } catch (ex) {
      console.log("No habit ideas for flow name ", flowName, ex);
      return [];
    }
  }

  public async addUserHabitActivityIdea(flowName: string, idea: string): Promise<IndexableType> {
    try {
      return this.dbService
        .table<IHabitActivityIdea>("habit_activity_ideas")
        .add({
          flowName: flowName,
          ideaTitle: idea
        });
    } catch (ex) {
      console.log("Error adding habit activity idea for flow name: ", flowName, ex);
      return;
    }
  }

  public deleteUserHabitActivityIdea(flowName: string, idea: string): Promise<number> {
    try {
      return this.dbService
        .table<IHabitActivityIdea>("habit_activity_ideas")
        .where("flowName")
        .equals(flowName)
        .and((hai) => hai.ideaTitle === idea)
        .delete();
    } catch (ex) {
      console.log(`Could not delete habit activity idea with title ${idea} for flow name ${flowName}`);
      console.log(ex);
    }
  }
}
