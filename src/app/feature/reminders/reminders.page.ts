import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { Reminder } from 'src/app/shared/model/reminder.model';
import { RemindersService } from 'src/app/shared/services/reminders/reminders.service';
import { ItemReorderEventDetail } from '@ionic/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

type ReorderEntry = {
  type: "reminder" | "header",
  label?: string,
  reminder?: Reminder
};

@Component({
  selector: 'plh-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  reorderEntries: ReorderEntry[] = [];

  tomorrowHeaderEntry: ReorderEntry = {
    type: "header",
    label: "Tomorrow"
  };

  laterHeaderEntry: ReorderEntry = {
    type: "header",
    label: "Later"
  };

  tickAnimOptions: AnimationOptions = {
    loop: false,
    path: "/assets/lottie-animations/972-done.json",
  };

  constructor(private remindersService: RemindersService, private router: Router) {
    this.remindersService.getReminders().subscribe((reminders) => {
      console.log("Reminders ", reminders);
      let sortedReminders = reminders.sort((a, b) => a.whenEpoch = b.whenEpoch);
      let todayEntries: ReorderEntry[] = sortedReminders
        .filter((r) => this.forToday(r))
        .map((r) => ({ type: "reminder", reminder: r }));
      let tomorrowEntries: ReorderEntry[] = sortedReminders
        .filter((r) => this.forTomorrow(r))
        .map((r) => ({ type: "reminder", reminder: r }));
      let laterEntries: ReorderEntry[] = sortedReminders
        .filter((r) => this.forLater(r))
        .map((r) => ({ type: "reminder", reminder: r }));
      this.reorderEntries = [].concat(todayEntries, this.tomorrowHeaderEntry, tomorrowEntries, this.laterHeaderEntry, laterEntries);
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

    let tomorrowIndex = this.reorderEntries.indexOf(this.tomorrowHeaderEntry);
    let laterIndex = this.reorderEntries.indexOf(this.laterHeaderEntry);

    let entry = this.reorderEntries[ev.detail.from];
    if (entry.type === "reminder") {
      let updatedReminder: Reminder;
      if (ev.detail.to < tomorrowIndex) {
        updatedReminder = this.moveToToday(entry.reminder);
      }
      if (ev.detail.to > tomorrowIndex && ev.detail.to < laterIndex) {
        updatedReminder = this.moveToTomorrow(entry.reminder);
      }
      if (ev.detail.to > laterIndex) {
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
    this.router.navigateByUrl("/reminders/create");
  }

  onCompleteClicked(reminder: Reminder) {
    console.log("On reminder complete", reminder);
    reminder.completeAnimInProgress = true;
  }

  onUncompleteClicked(reminder: Reminder) {
    console.log("Uncomplete clicked ", reminder);
    reminder.complete = false;
    this.remindersService.updateReminder(reminder);
  }

  tickAnimationComplete(reminder: Reminder) {
    reminder.completeAnimInProgress = false;
    reminder.complete = true;
    this.remindersService.updateReminder(reminder);
  }

}
