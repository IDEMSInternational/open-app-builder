import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowTypes } from 'scripts/types';
import { CARE_PACKAGE_LIST, HABIT_LIST } from 'src/app/shared/services/data/data.service';
import { TaskActionService } from 'src/app/shared/services/task/task-action.service';
import { TasksService } from '../../goals/services/tasks.service';

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

  public carePackage: FlowTypes.CarePackage;
  private habitById: { [habitId: string] : FlowTypes.Habit_listRow } = {};
  public habits: Habit[] = [];

  constructor(route: ActivatedRoute, private taskActionService: TaskActionService) {
    for (let habit of HABIT_LIST[0].rows) {
      this.habitById[habit.id] = habit;
    }
    route.params.subscribe((params) => {
      const id = params["carePackageId"];
      if (id && CARE_PACKAGE_LIST && CARE_PACKAGE_LIST.length > 0) {
        const carePackages = CARE_PACKAGE_LIST[0].rows;
        this.carePackage = carePackages.find((cp) => cp.id === id);
        this.habits = this.carePackage.habit_list
          .map((id) => ({
            ...this.habitById[id],
            goalNumber: 5,
            timesDone: 0
          }));
      }
    });
  }

  ngOnInit() {}

  aimClicked() {

  }

}
