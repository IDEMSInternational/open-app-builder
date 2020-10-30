import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { Reminder } from 'src/app/shared/model/reminder.model';
import { RemindersService } from 'src/app/shared/services/reminders/reminders.service';
import { ItemReorderEventDetail } from '@ionic/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'plh-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  reorderEntries: {
    type: "reminder" | "header",
    label?: string,
    reminder?: Reminder
  }[] = [];

  tomorrowIndex: number;
  laterIndex: number;

  tickAnimOptions: AnimationOptions = {
    loop: false,
    path: "/assets/lottie-animations/972-done.json",
  };

  constructor(private remindersService: RemindersService) {
    this.remindersService.getReminders().subscribe((reminders) => {
      console.log("Reminders ", reminders);
      reminders.forEach((r) => console.log("r", r, new Date(r.whenEpoch)));
      let reorderEntries = [];
      let hadTomorrow = false;
      let hadLater = false;
      this.tomorrowIndex = reminders.length + 3;
      this.laterIndex = reminders.length + 4;
      for (let i = 0; i < reminders.length; i++) {
        let reminder = reminders[i];
        if (this.forTomorrow(reminder) && !hadTomorrow) {
          hadTomorrow = true;
          reorderEntries.push({
            type: "header",
            label: "Tomorrow"
          });
          this.tomorrowIndex = i;
        }
        if (this.forLater(reminder) && !hadLater) {
          hadLater = true;
          reorderEntries.push({
            type: "header",
            label: "Later"
          });
          this.laterIndex = i;
        }
        reorderEntries.push({
          type: "reminder",
          reminder: reminder
        });
      }
      this.reorderEntries = [].concat(reorderEntries);
    });
  }

  private forToday(reminder: Reminder): boolean {
    var todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    return reminder.whenEpoch < todayEnd.getTime();
  }

  private getTodayEnd(): number {
    var todayEndDate = new Date();
    todayEndDate.setHours(23, 59, 59, 999);
    return todayEndDate.getTime();
  }

  private getTomorrowEnd(): number {
    var tomorrowEndDate = new Date(this.getTodayEnd() + 24 * 3600 * 1000);
    return tomorrowEndDate.getTime();
  }

  private forTomorrow(reminder: Reminder): boolean {
    return reminder.whenEpoch > this.getTodayEnd() && reminder.whenEpoch < this.getTomorrowEnd();
  }

  private forLater(reminder: Reminder): boolean {
    var todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    var tomorrowEnd = new Date(todayEnd.getTime() + 24 * 3600 * 1000);
    return reminder.whenEpoch > tomorrowEnd.getTime();
  }

  private moveToTomorrow(reminder: Reminder): Reminder {
    reminder.whenEpoch = this.getTomorrowEnd() - 12 * 3600 * 1000;
    return reminder;
  }

  private moveToToday(reminder: Reminder): Reminder {
    reminder.whenEpoch = this.getTodayEnd() - 12 * 3600 * 1000;
    return reminder;
  }

  private moveToLater(reminder: Reminder): Reminder {
    reminder.whenEpoch = this.getTomorrowEnd() + 12 * 3600 * 1000;
    return reminder;
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    let entry = this.reorderEntries[ev.detail.from];
    if (entry.type === "reminder") {
      let updatedReminder: Reminder;
      if (ev.detail.to < this.tomorrowIndex) {
        updatedReminder = this.moveToToday(entry.reminder);
      }
      if (ev.detail.to > this.tomorrowIndex && ev.detail.to < this.laterIndex) {
        updatedReminder = this.moveToTomorrow(entry.reminder);
      }
      if (ev.detail.to > this.laterIndex) {
        updatedReminder = this.moveToLater(entry.reminder);
      }
      if (updatedReminder) {
        this.remindersService.updateReminder(updatedReminder);
      }
    }

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  ngOnInit() {
  }

  onAddClicked() {
    this.remindersService.createReminder({
      id: null,
      what: "Bubbles " + Math.round(Math.random()),
      whenEpoch: new Date().getTime(),
      complete: true
    });
  }

  onCompleteClicked(reminder: Reminder) {
    console.log("On reminder complete", reminder);
    reminder.completeAnimInProgress = true;
  }

  tickAnimationComplete(reminder: Reminder) {
    reminder.completeAnimInProgress = false;
    reminder.complete = true;
    this.remindersService.updateReminder(reminder);
  }

}
