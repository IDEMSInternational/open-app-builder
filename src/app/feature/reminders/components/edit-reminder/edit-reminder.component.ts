import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import {
  IReminder,
  REMINDER_TYPES,
  IReminderTypeMeta,
  REMINDER_TIMES,
} from "src/app/feature/reminders/models/reminders.model";
import { RemindersService } from "src/app/feature/reminders/services/reminders.service";

@Component({
  selector: "plh-edit-reminder",
  templateUrl: "./edit-reminder.component.html",
  styleUrls: ["./edit-reminder.component.scss"],
})
export class EditReminderComponent implements OnInit {
  @Input() reminderForm: FormGroup;
  reminderTypes = REMINDER_TYPES;
  reminderTimes = REMINDER_TIMES;

  constructor(
    private remindersService: RemindersService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  get reminder() {
    return this.reminderForm.value;
  }

  ngOnInit() {
    console.log("form", this.reminderForm);
    console.log("reminder", this.reminder);
  }

  async dismiss(reminder?: IReminder) {
    if (reminder) {
      this.modalCtrl.dismiss(reminder);
    } else {
      // close button clicked - TODO check if reminder changed
      // and if user wants to save changes
      if (this.reminderForm.valid && this.reminderForm.touched) {
        const shouldSave = await this.promptSave();
        if (!shouldSave) {
          this.modalCtrl.dismiss();
        }
      }
      this.modalCtrl.dismiss(reminder);
    }
  }
  private async promptSave(): Promise<boolean> {
    const alert = await this.alertCtrl.create({ header: "Save Reminder?" });
    const { data } = await alert.onDidDismiss();
    console.log("shouldSave?");
    return data === "true";
  }

  reminderTypeChanged(meta: IReminderTypeMeta) {
    console.log("reminder type changed", meta);
    if (meta.type === "custom") {
      // TODO - show custom
    }
  }
  reminderTimeChanged(time: typeof REMINDER_TIMES.custom) {
    console.log("reminder time changed", time);
  }
  customReminderChange(label: string | number) {
    console.log("custom reminder change", label);
  }

  onCreateClick() {
    this.remindersService.createReminder(this.reminder as IReminder);
    this.router.navigateByUrl("/reminders");
  }

  onCancelClick() {
    this.router.navigateByUrl("/reminders");
  }

  dateChanged($event: CustomEvent<{ value: string }>) {
    console.log("date changed ", $event);
    const { value } = $event.detail;
    this.reminder.due = new Date(value).toISOString();
  }

  toDateString(epoch: number) {
    return new Date(epoch).toString();
  }
}
