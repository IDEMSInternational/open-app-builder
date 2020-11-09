import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonReorderGroup, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AnimationOptions } from "ngx-lottie";
import { isToday, isTomorrow, isPast, differenceInDays } from "date-fns";
import {
  IReminder,
  IReminderTypeMeta,
  REMINDER_FORM_TEMPLATE,
  REMINDER_TYPES,
} from "src/app/feature/reminders/models/reminders.model";
import { RemindersService } from "src/app/feature/reminders/services/reminders.service";
import { EditReminderComponent } from "./edit-reminder/edit-reminder.component";
import { FormGroup } from "@angular/forms";
import { IDBDoc } from "src/app/shared/services/db/db.service";

@Component({
  selector: "plh-reminders",
  templateUrl: "./reminders.page.html",
  styleUrls: ["./reminders.page.scss"],
})
export class RemindersPage implements OnInit, OnDestroy {
  reminders$: Subscription;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  reminderTypes = REMINDER_TYPES;
  remindersByTime = Object.values(REMINDERS_TEMPLATE());
  activeAnimations: { [reminderId: number]: boolean } = {};
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
        const remindersByTime = REMINDERS_TEMPLATE();
        for (const reminder of reminders) {
          const period = this.getTimePeriod(reminder.due);
          remindersByTime[period].reminders.push({
            ...reminder,
            // populate full type label and meta data
            typeMeta: this.getReminderTypeMeta(reminder),
          });
        }
        this.remindersByTime = Object.values(remindersByTime);
      }
    );
  }
  public trackById(index: number, reminder: IReminder & IDBDoc) {
    return reminder.id;
  }
  private getReminderTypeMeta(reminder: IReminder): IReminderTypeMeta {
    const { type, data } = reminder;
    if (this.reminderTypes.hasOwnProperty(type)) {
      const reminderMeta = { ...this.reminderTypes[type] };
      if (type === "custom") {
        reminderMeta.label = data.customLabel;
      }
      return reminderMeta;
    } else {
      // TODO - log error
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
    return "later";
  }

  ngOnDestroy() {
    this.reminders$.unsubscribe();
  }

  /**
   * When opening the reminder editor generate an editable formgroup object,
   * based on the new reminder formgroup template and populated with any values
   */
  async openReminderEditor(e: Event, reminder?: IReminder) {
    e.stopImmediatePropagation();
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
    if (data) {
      this.setReminder(data as IReminderWithMeta);
    }
  }

  /**
   * When a reminder complete status is toggled update the database and trigger any animations
   * NOTE - the update triggers a full db fetch/re-render so any other in-progress animations
   * will be restarted if a new reminder checked (minor bug/limitation)
   */
  async toggleReminderComplete(e: Event, reminder: IReminderWithMeta & IDBDoc) {
    e.stopImmediatePropagation();
    await this.setReminder({ ...reminder, complete: !reminder.complete });
    if (!reminder.complete) {
      this.activeAnimations[reminder.id] = true;
    }
  }

  tickAnimationComplete(reminder: IReminderWithMeta & IDBDoc) {
    this.activeAnimations[reminder.id] = false;
  }

  setReminder(reminderWithMeta: IReminderWithMeta) {
    console.log("update reminder", reminderWithMeta);
    // remove metadata
    delete reminderWithMeta.typeMeta;
    const reminder: IReminder = {
      ...reminderWithMeta,
      _modified: new Date().toISOString(),
    };
    return this.remindersService.setReminder(reminder);
  }
}

interface IReminderWithMeta extends IReminder {
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
/**
 * Use a function to generate a blank template for storing reminders
 * (regular consts keep references and so would constantly update instead of starting new.
 * This usually can be fixed with object assign or spread operators but unhappy when used here)
 */
const REMINDERS_TEMPLATE = (): IRemindersByTime => ({
  past: { label: "Past", reminders: [], hide: true },
  today: { label: "Today", reminders: [] },
  tomorrow: { label: "Tomorrow", reminders: [] },
  upcoming: { label: "Upcoming", reminders: [] },
  later: { label: "Later", reminders: [], hide: true },
});
