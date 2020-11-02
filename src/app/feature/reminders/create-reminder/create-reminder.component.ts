import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reminder } from 'src/app/shared/model/reminder.model';
import { RemindersService } from 'src/app/shared/services/reminders/reminders.service';

@Component({
  selector: 'plh-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.scss'],
})
export class CreateReminderComponent implements OnInit {

  newReminder: Reminder = {
    id: null,
    what: "Praise my child",
    complete: false,
    whenEpoch: new Date().getTime()
  };

  whatOptions = [
    "Praise my child",
    "Spend one on one time with my child",
    "Eat donut",
    "Revisit one on one core tips"
  ];

  constructor(private remindersService: RemindersService, private router: Router) { }

  ngOnInit() {
  }

  onCreateClick() {
    console.log("Creating reminder ", this.newReminder);
    this.remindersService.createReminder(this.newReminder);
    this.router.navigateByUrl("/reminders");
  }

  onCancelClick() {
    this.router.navigateByUrl("/reminders");
  }

  dateChanged($event: CustomEvent) {
    console.log("date changed ", $event);
    let value = $event.detail.value;
    this.newReminder.whenEpoch = new Date(value).getTime();
  }

  toDateString(epoch: number) {
    return new Date(epoch).toString();
  }

}
