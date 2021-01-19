import { Injectable } from '@angular/core';
import { arrayToHashmap } from '../../utils';
import { HABIT_LIST } from '../data/data.service';
import { DbService } from '../db/db.service';
import { ITaskEntry } from '../task/task-action.service';
import { IHabit } from './habit.model';

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
}
