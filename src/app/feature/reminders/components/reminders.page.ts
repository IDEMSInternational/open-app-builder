import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonReorderGroup, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AnimationOptions } from "ngx-lottie";
import { Router } from "@angular/router";
import { isToday, isTomorrow, isPast, differenceInDays } from "date-fns";
import {
  IReminder,
  IReminderType,
  IReminderTypeMeta,
  REMINDER_FORM_TEMPLATE,
  REMINDER_TYPES,
} from "src/app/feature/reminders/models/reminders.model";
import { RemindersService } from "src/app/feature/reminders/services/reminders.service";
import REMINDERS_MOCK from "../models/reminders.mock";
import { EditReminderComponent } from "./edit-reminder/edit-reminder.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "plh-reminders",
  templateUrl: "./reminders.page.html",
  styleUrls: ["./reminders.page.scss"],
})
export class RemindersPage implements OnInit, OnDestroy {
  reminders$: Subscription;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  reminderTypes = REMINDER_TYPES;
  remindersByTime = Object.values(REMINDERS_TEMPLATE);

  tickAnimOptions: AnimationOptions = {
    loop: false,
    path: "/assets/lottie-animations/972-done.json",
  };

  constructor(
    private remindersService: RemindersService,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {
    this.reminders$ = this.remindersService.reminders$.subscribe(
      (reminders) => {
        reminders = REMINDERS_MOCK;
        const remindersByTime = REMINDERS_TEMPLATE;
        for (const reminder of reminders) {
          const period = this.getTimePeriod(reminder.due);
          remindersByTime[period].reminders.push({
            ...reminder,
            // populate full type label and meta data
            completeAnimInProgress: false,
            typeMeta: this.getReminderTypeMeta(reminder),
          });
        }
        this.remindersByTime = Object.values(remindersByTime);
        console.log("reminders by time", this.remindersByTime);
      }
    );
  }
  private getReminderTypeMeta(reminder: IReminder): IReminderTypeMeta {
    const { type, data } = reminder;
    if (REMINDER_TYPES.hasOwnProperty(type)) {
      const reminderMeta = REMINDER_TYPES[type];
      if (type === "custom") {
        reminderMeta.label = data.customLabel;
      }
      return reminderMeta;
    } else {
      // TODO - log error
      console.error("no reminderType:", reminder.type);
      return { type: "custom", label: "", group: "" };
    }
  }
  /**
   * Create human-readable time period for a given date, whether is
   * past, today, tomorrow, upcoming (within 5 days), or later
   */
  private getTimePeriod(datestring: string): keyof IRemindersByTime {
    const d = new Date(datestring);
    if (isToday(d)) {
      return "today";
    }
    if (isTomorrow(d)) {
      return "tomorrow";
    }
    if (isPast(d)) {
      return "past";
    }
    if (differenceInDays(d, new Date()) <= 5) {
      return "upcoming";
    }
    console.log(d, differenceInDays(d, new Date()));
    return "later";
  }

  ngOnDestroy() {
    this.reminders$.unsubscribe();
  }

  /**
   * When opening the reminder editor generate an editable formgroup object,
   * based on the new reminder formgroup template and populated with any values
   */
  async openReminderEditor(reminder?: IReminder) {
    const reminderForm = new FormGroup(REMINDER_FORM_TEMPLATE);
    if (reminder) {
      reminderForm.patchValue(reminder);
    }
    const modal = await this.modalCtrl.create({
      component: EditReminderComponent,
      componentProps: { reminderForm },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log("modal data", data);
  }

  onCompleteClicked(reminder: IReminderWithMeta) {
    console.log("On reminder complete", reminder);
    reminder.completeAnimInProgress = true;
  }

  onUncompleteClicked(reminder: IReminderWithMeta) {
    console.log("Uncomplete clicked ", reminder);
    reminder.complete = false;
    this.updateReminder(reminder);
  }

  tickAnimationComplete(reminder: IReminderWithMeta) {
    reminder.completeAnimInProgress = false;
    reminder.complete = true;
    this.updateReminder(reminder);
  }

  updateReminder(reminderWithMeta: IReminderWithMeta) {
    // remove metadata
    delete reminderWithMeta.completeAnimInProgress;
    delete reminderWithMeta.typeMeta;
    const reminder: IReminder = {
      ...reminderWithMeta,
      _modified: new Date().toISOString(),
    };
    this.remindersService.updateReminder(reminder);
  }
}

interface IReminderWithMeta extends IReminder {
  completeAnimInProgress: boolean;
  typeMeta: IReminderTypeMeta;
}
type IReminderTime = "past" | "today" | "tomorrow" | "upcoming" | "later";
type IRemindersByTime = {
  [key in IReminderTime]: {
    label: string;
    reminders: IReminderWithMeta[];
    hide?: boolean;
  };
};
const REMINDERS_TEMPLATE: IRemindersByTime = {
  past: { label: "Past", reminders: [], hide: true },
  today: { label: "Today", reminders: [] },
  tomorrow: { label: "Tomorrow", reminders: [] },
  upcoming: { label: "Upcoming", reminders: [] },
  later: { label: "Later", reminders: [], hide: true },
};
