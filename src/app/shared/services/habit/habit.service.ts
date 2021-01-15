import { Injectable } from '@angular/core';
import { arrayToHashmap } from '../../utils';
import { HABIT_LIST } from '../data/data.service';
import { DbService } from '../db/db.service';
import { ITaskEntry } from '../task/task-action.service';

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
}
