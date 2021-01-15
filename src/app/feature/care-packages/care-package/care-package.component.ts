import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FlowTypes } from 'scripts/types';
import { CARE_PACKAGE_LIST, HABIT_LIST } from 'src/app/shared/services/data/data.service';
import { TaskActionService } from 'src/app/shared/services/task/task-action.service';
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

  public carePackage: FlowTypes.CarePackage;
  private habitById: { [habitId: string] : FlowTypes.Habit_listRow } = {};
  public habits: Habit[] = [];

  constructor(route: ActivatedRoute, private taskService: TaskService, private alertCtrl: AlertController) {
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

  async aimClicked(habit: FlowTypes.Habit_listRow) {
    const alert = await this.alertCtrl.create({
      header: habit.aim_button_text,
      inputs: [
        {
          type: "number"
        }
      ]
    });
    alert.present();
  }

  suggestedTaskClicked(habit: FlowTypes.Habit_listRow) {
    console.log("Should be starting task ", habit.task_id);
    this.taskService.startTask(habit.task_id);
  }

}
