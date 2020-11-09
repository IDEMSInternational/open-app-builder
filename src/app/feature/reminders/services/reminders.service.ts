import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IReminder } from "../models/reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";

@Injectable({
  providedIn: "root",
})
export class RemindersService {
  public reminders$ = new BehaviorSubject<IReminder[]>([]);

  constructor(private dbService: DbService) {
    this.loadDBReminders();
  }
  private async loadDBReminders() {
    const reminders = await this.dbService
      .table<IReminder>("reminders")
      .toArray();
    this.reminders$.next(reminders);
  }

  async setReminder(reminder: IReminder) {
    // reminder form populates an empty placeholder id, which has to be removed
    // to allow the db to populate
    if (reminder.id === null) {
      delete reminder.id;
    }
    await this.dbService.table("reminders").put(reminder);
    this.loadDBReminders();
  }

  deleteReminder(reminder: IReminder) {}
}
