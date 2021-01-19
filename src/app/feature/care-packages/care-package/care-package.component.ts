import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { FlowTypes } from 'scripts/types';
import { CARE_PACKAGE_LIST, HABIT_LIST } from 'src/app/shared/services/data/data.service';
import { HabitService } from 'src/app/shared/services/habit/habit.service';

type Habit = FlowTypes.Habit_listRow & {
  timesDoneThisWeek?: number;
  weeklyAim?: number;
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

  constructor(route: ActivatedRoute, private router: Router,
    private habitService: HabitService) {
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
            const aim = await this.habitService.getHabitWeeklyAim(id);
            const habit: Habit = {
              ...this.habitById[id],
              weeklyAim: aim,
              timesDoneThisWeek: count
            };
            return habit;
          })).then((habits) => {
            this.selectedHabit = habits[0];
            this.habits = habits;
          });
      }
    });
  }

  ngOnInit() { }

  onAimChange() {
    this.habitService.setHabitWeeklyAim(this.selectedHabit.id, this.selectedHabit.weeklyAim);
  }

  async aimClicked(habit: Habit) {
    this.selectedHabit = habit;
    this.numSelect.open();
  }

  suggestedTaskClicked(habit: FlowTypes.Habit_listRow) {
    this.router.navigate([habit.suggestion_flow_type, habit.suggestion_flow_name]);
  }

  range(min: number, max: number) {
    let nums = [];
    for (var i = min; i <= max; i++) {
      nums.push(i);
    }
    return nums;
  }

}
