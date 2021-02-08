import { Component, OnInit } from '@angular/core';
import { FlowTypes } from 'scripts/types';
import { HABIT_LIST } from 'src/app/shared/services/data/data.service';
import { HabitService } from 'src/app/shared/services/habit/habit.service';

@Component({
  selector: 'plh-parent-points',
  templateUrl: './parent-points.page.html',
  styleUrls: ['./parent-points.page.scss'],
})
export class ParentPointsPage implements OnInit {

  habits = HABIT_LIST[0].rows;

  constructor(private habitService: HabitService) { }

  ngOnInit() {
  }

  selectHabit(habit: FlowTypes.Habit_listRow) {
    if (!habit._count) {
      habit._count = 0;
    }
    habit._count++;
    habit._animating_on_add = true;
    if (habit._animate_timeout_ref) {
      clearTimeout(habit._animate_timeout_ref);
    }
    habit._animate_timeout_ref = setTimeout(() => {
      habit._animating_on_add = false;
    }, 1000);

  }

}
