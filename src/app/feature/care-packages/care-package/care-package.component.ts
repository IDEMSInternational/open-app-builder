import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { FlowTypes } from 'scripts/types';
import { CARE_PACKAGE_LIST, HABIT_LIST } from 'src/app/shared/services/data/data.service';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { TaskService } from 'src/app/shared/services/task/task.service';

type Habit = FlowTypes.Habit_listRow & {
  timesDone?: number;
  goalNumber?: number;
}

@Component({
  selector: 'plh-care-package',
  templateUrl: './care-package.component.html',
  styleUrls: ['./care-package.component.scss'],
})
export class CarePackageComponent implements OnInit {

  @ViewChild("numSelect") numSelect: IonSelect;

  public carePackage: FlowTypes.CarePackage;
  private habitById: { [habitId: string]: FlowTypes.Habit_listRow } = {};
  public habits: Habit[] = [];
  selectedHabit: Habit;

  constructor(route: ActivatedRoute, private taskService: TaskService,
    private habitService: HabitService, private cd: ChangeDetectorRef) {
    for (let habit of HABIT_LIST[0].rows) {
      this.habitById[habit.id] = habit;
    }
    this.habitService
    route.params.subscribe((params) => {
      const id = params["carePackageId"];
      if (id && CARE_PACKAGE_LIST && CARE_PACKAGE_LIST.length > 0) {
        const carePackages = CARE_PACKAGE_LIST[0].rows;
        this.carePackage = carePackages.find((cp) => cp.id === id);
        Promise.all(this.carePackage.habit_list
          .map(async (id) => {
            const count = await this.habitService.getHabitWeeklyCount(id);
            return {
              ...this.habitById[id],
              goalNumber: 5,
              timesDone: count
            };
          })).then((habits) => {
            this.selectedHabit = habits[0];
            this.habits = habits;
          });
      }
    });
  }

  ngOnInit() { }

  async aimClicked(habit: Habit) {
    this.selectedHabit = habit;
    this.numSelect.open();
  }

  suggestedTaskClicked(habit: FlowTypes.Habit_listRow) {
    console.log("Should be starting task ", habit.task_id);
    this.taskService.startTask(habit.task_id);
  }

  range(min: number, max: number) {
    let nums = [];
    for (var i = min; i <= max; i++) {
      nums.push(i);
    }
    return nums;
  }

}
