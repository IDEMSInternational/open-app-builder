import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { parseISO } from "date-fns";
import { IReminder, REMINDER_TIMES, REMINDER_TYPES, REPEAT_DURATIONS } from 'src/app/feature/reminders/reminders.model';

@Component({
  selector: "plh-edit-reminder",
  templateUrl: "./edit-reminder.component.html",
  styleUrls: ["./edit-reminder.component.scss"],
})
export class EditReminderComponent {
  /**
   * The required formgroup element is passed from the reminders page
   * It contains all fields specified by the IReminder interface
   */
  @Input() reminderForm: FormGroup;
  reminderTypes = REMINDER_TYPES;
  reminderTimes = REMINDER_TIMES;
  repeatDurations = REPEAT_DURATIONS;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  get reminder() {
    return this.reminderForm.value as IReminder;
  }

  /**
   * Close the editor, providing the current reminder for saving where provided.
   * Additinoally checks for changes if called without reminder, prompting the
   * user to confirm if they want to save any available changes before dismiss
   */
  async dismiss(reminder?: IReminder) {
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
   * When date input changed create a new date object from the picker
   * values and specify a default time of 9am
   * @param value - date-input formatted value, e.g. 2020-11-09
   */
  dueDateChanged(value: any) {
    const parsedDate = parseISO(value);
    parsedDate.setHours(9);
    this.setFormValues({ due: parsedDate.toISOString() });
  }
  /**
   * Manually patch the form when custom label changed
   */
  customReminderChange(label: any) {
    this.setFormValues({ data: { ...this.reminder.data, customLabel: label } });
  }
  async promptReminderDelete(reminder: IReminder) {
    const alert = await this.alertCtrl.create({
      header: "Delete Reminder?",
      message: "Are you sure you would like to delete this reminder?",
      buttons: [
        {
          text: "Cancel",
          cssClass: "alert-cancel-button",
          role: "cancel",
        },
        {
          text: "Delete",
          cssClass: "alert-delete-button",
          role: "delete",
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    // handle deletion in the parent page
    if (role === "delete") {
      await this.modalCtrl.dismiss(reminder, "delete");
    }
  }

  /**
   * Type-safe way to call form patchValue function to update a subset of values
   * and mark form as edited (by default programatic updates are not recorded as form changes)
   */
  private setFormValues(values: Partial<IReminder>) {
    this.reminderForm.markAsTouched();
    this.reminderForm.patchValue(values);
  }
}
