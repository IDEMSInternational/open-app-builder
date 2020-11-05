import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IReminder } from "../models/reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";

@Injectable({
  providedIn: "root",
})
export class RemindersService {
  static LIST_LS_KEY = "reminders_list";

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

  async createReminder(reminder: IReminder) {
    await this.dbService.table("reminders").put(reminder);
    return this.loadDBReminders();
  }

  getReminders(): Observable<IReminder[]> {
    return this.reminders$.asObservable();
  }

  updateReminder(reminder: IReminder) {
    // let reminders: IReminder[] = this.reminders$.getValue().map((r) => {
    //   if (r.id === reminder.id) {
    //     return reminder;
    //   }
    //   return r;
    // });
    // this.reminders$.next(reminders);
    // return of();
    return;
  }

  deleteReminder(reminder: IReminder) {}
}
