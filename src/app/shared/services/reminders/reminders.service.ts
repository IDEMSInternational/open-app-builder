import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Reminder } from '../../model/reminder.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  static LIST_LS_KEY = "reminders_list";

  private reminders$: BehaviorSubject<Reminder[]>;

  constructor(private localStorageService: LocalStorageService) {
    if (!this.localStorageService.getJSON(RemindersService.LIST_LS_KEY)) {
      let mockReminders: Reminder[] = [
        {
          id: "1",
          what: "Praise my child",
          whenEpoch: new Date().getTime() - 1000 * 60 * 5,
          recurranceTimeMs: (1000 * 60 * 24),
          complete: false
        },
        {
          id: "2",
          what: "Spend one on one time with my child",
          whenEpoch: new Date().getTime() + (1000 * 3600 * 24),
          recurranceTimeMs: (1000 * 60 * 24),
          complete: false
        },
        {
          id: "3",
          what: "Eat donuts",
          whenEpoch: new Date().getTime() + (1000 * 3600 * 36),
          recurranceTimeMs: (1000 * 60 * 24),
          complete: false
        },
        {
          id: "4",
          what: "Have heart attack",
          whenEpoch: new Date().getTime() + (1000 * 3600 * 48),
          recurranceTimeMs: (1000 * 60 * 24),
          complete: false
        }
      ];
      this.localStorageService.setJSON(RemindersService.LIST_LS_KEY, mockReminders);
    }
    this.initaliseSubject();
  }

  createReminder(reminder: Reminder): Observable<any> {
    let reminders: Reminder[] = this.reminders$.getValue();
    if (!reminder.id) {
      reminder.id = "" + Math.round(100000 * Math.random());
    }
    reminders.push(reminder);
    this.reminders$.next(reminders);
    return of();
  }

  getReminders(): Observable<Reminder[]> {
    return this.reminders$.asObservable();
  }

  updateReminder(reminder: Reminder): Observable<any> {
    let reminders: Reminder[] = this.reminders$.getValue().map((r) => {
      if (r.id === reminder.id) {
        return reminder;
      }
      return r;
    });
    this.reminders$.next(reminders);
    return of();
  }

  deleteReminder(reminder: Reminder): Observable<any> {
    let reminders: Reminder[] = this.reminders$.getValue()
      .filter((r) => r.id !== reminder.id);
    this.reminders$.next(reminders);
    return of();
  }

  private initaliseSubject() {
    if (!this.reminders$) {
      let reminders = this.localStorageService.getJSON(RemindersService.LIST_LS_KEY);
      reminders = reminders && reminders.length > 0 ? reminders : [];
      this.reminders$ = new BehaviorSubject(reminders);
      this.reminders$.subscribe((reminders) => {
        this.localStorageService.setJSON(RemindersService.LIST_LS_KEY, reminders);
      });
    }
  }
}
