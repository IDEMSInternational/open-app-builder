import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FlowTypes } from 'scripts/types';
import { HABIT_IDEAS, TIPS } from 'src/app/shared/services/data/data.service';
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
  public suggestedDragging = false;
  public console = console;
  public habitIdea: FlowTypes.Habit_ideas;

  constructor(protected route: ActivatedRoute, protected habitService: HabitService,
    protected alertCtrl: AlertController) {
    this.processRouteParams();
  }

  private processRouteParams() {
    const { params } = this.route.snapshot;
    if (params.flowName) {
      this.flowName = params.flowName;
      this.populateUserIdeas(params.flowName).finally(() => {
        this.populateSuggestedIdeas(params.flowName);
      });
    }
  }

  populateSuggestedIdeas(flowName: string) {
    this.habitIdea = HABIT_IDEAS.find((hi) => hi.flow_name === flowName);
    const userIdeasMap = {};
    this.userIdeas.forEach((i) => userIdeasMap[i] = true);
    this.suggestedIdeas = this.habitIdea.rows
    .filter((row) => !userIdeasMap[row.message_text])
    .map((row) => row.message_text);
  }


  populateUserIdeas(flowName: string) {
    return this.habitService.getUserHabitActivityIdeas(flowName).then((ideas) => {
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

  deleteUserIdea(idea: string) {
    this.userIdeas = this.userIdeas.filter((i) => i !== idea);
    this.habitService.deleteUserHabitActivityIdea(this.flowName, idea).then(() => {
      this.populateSuggestedIdeas(this.flowName);
    });
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const idea = event.previousContainer.data[event.previousIndex];
      this.userIdeas.push(idea);
      this.populateSuggestedIdeas(this.flowName);
      this.habitService.addUserHabitActivityIdea(this.flowName, idea);
    }
  }

}
