import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
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
  /**
   * The required formgroup element is passed from the reminders page
   * It contains all fields specified by the IReminder interface
   */
  @Input() reminderForm: FormGroup;
  reminderTypes = REMINDER_TYPES;
  reminderTimes = REMINDER_TIMES;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  get reminder() {
    return this.reminderForm.value as IReminder;
  }

  ngOnInit() {
    console.log("form", this.reminderForm);
    console.log("reminder", this.reminder);
    console.log("reminderTypes", this.reminderTypes);
  }

  /**
   * Close the editor, providing the current reminder for saving where provided.
   * Additinoally checks for changes if called without reminder, prompting the
   * user to confirm if they want to save any available changes before dismiss
   */
  async dismiss(reminder?: IReminder) {
    console.log("dismiss", reminder, this.reminderForm);
    if (!reminder && this.reminderForm.valid && this.reminderForm.touched) {
      // close button clicked, reminder edited and valid - check if user wants to save
      const shouldSave = await this.promptShouldSave();
      if (!shouldSave) {
        this.modalCtrl.dismiss();
      }
    }
    this.modalCtrl.dismiss(reminder);
  }
  private async promptShouldSave(): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: "Save Reminder?",
      message:
        "Would you like to save the changes you have made to this reminder?",
      buttons: [
        {
          text: "Do not save",
          cssClass: "alert-cancel-button",
          role: "cancel",
        },
        {
          text: "Save Changes",
          cssClass: "alert-save-button",
          role: "save",
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === "save";
  }

  /**
   * Generate a fixed timestamp from textual representation
   * (e.g. 'today', 'tomorrow' etc.)
   */
  reminderTimeChanged(time: typeof REMINDER_TIMES.custom) {
    console.log("reminder time changed", time);
  }
  /**
   * Manually patch the form when custom label changed
   */
  customReminderChange(label: string) {
    const patch: Partial<IReminder> = {
      data: { ...this.reminder.data, customLabel: label },
    };
    this.reminderForm.patchValue(patch);
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
