import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FlowTypes } from 'scripts/types';
import { TIPS } from 'src/app/shared/services/data/data.service';
import { HabitService } from 'src/app/shared/services/habit/habit.service';

@Component({
  selector: 'plh-habit-ideas',
  templateUrl: './habit-ideas.page.html',
  styleUrls: ['./habit-ideas.page.scss'],
})
export class HabitIdeasPage implements OnInit {

  public flowName: string;
  public title: string;
  public suggestedIdeas: string[] = [];
  public userIdeas: string[] = [];

  constructor(protected route: ActivatedRoute, protected habitService: HabitService,
    protected alertCtrl: AlertController) {
    this.processRouteParams();
  }

  private processRouteParams() {
    const { params } = this.route.snapshot;
    if (params.flowName) {
      this.flowName = params.flowName;
      this.populateFromTips(params.flowName);
      this.populateUserIdeas(params.flowName);
    }
  }

  populateFromTips(flowName: string) {
    const tipsFlow = TIPS.find((t) => t.flow_name === flowName);
    const titleRow = tipsFlow.rows.find((row) => row.type === "title");
    this.title = titleRow && titleRow.message_text ? titleRow.message_text : flowName;
    const listGroup = tipsFlow.rows.find((row) => row.type === "list_group");
    if (listGroup && listGroup.rows) {
      this.suggestedIdeas = listGroup.rows
        .filter((row) => row.type === "list_item")
        .map((row) => row.message_text);
    }
  }

  populateUserIdeas(flowName: string) {
    this.habitService.getUserHabitActivityIdeas(flowName).then((ideas) => {
      this.userIdeas = ideas;
    });
  }

  async promptForIdea() {
    let alert = await this.alertCtrl.create({
      header: "Enter your own idea",
      inputs: [
        {
          name: 'idea',
          placeholder: 'Enter your idea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async data => {
            if (data.idea && data.idea.length > 0) {
              await this.habitService.addUserHabitActivityIdea(this.flowName, data.idea);
              this.populateUserIdeas(this.flowName);
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
