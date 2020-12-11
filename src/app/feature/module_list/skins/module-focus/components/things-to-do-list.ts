import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ITask } from 'src/app/feature/goals/models/goals.model';
import { TaskActionsService } from 'src/app/feature/goals/services/task-actions.service';
import { TasksService } from 'src/app/feature/goals/services/tasks.service';

@Component({
  selector: "plh-things-to-do-list",
  template: `
  <div class="scroller">
    <!-- <div *ngFor="let task of tasksService.userJourneyTasks" trackBy:trackById>
      <plh-task-reminder-item [task]="task" (onTaskClick)="onTaskClick.emit($event)"></plh-task-reminder-item>
    </div> -->
  </div>
  `,
  styles: [
    `.scroller {
      overflow-y: auto;
      height: 100%;
    }`
  ]
})
export class ThingsToDoListComponent implements OnInit {
  dataLoaded: boolean = false;
  @Output() onTaskClick: EventEmitter<ITask> = new EventEmitter();
  constructor(public tasksService: TasksService, public taskActionsService: TaskActionsService) { }

  ngOnInit() {
    // this.taskActionsService.loadActions().then(() => (this.dataLoaded = true));
  }

  trackById(index: number, item: { id: string;[key: string]: any }) {
    return item.id;
  }
}
