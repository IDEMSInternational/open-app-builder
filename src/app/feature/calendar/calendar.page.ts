import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DbService, IDBEvent } from "src/app/shared/services/db/db.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  selector: "plh-calendar",
  templateUrl: "./calendar.page.html",
  styleUrls: ["./calendar.page.scss"],
})
export class CalendarPage implements OnInit, OnDestroy {
  listeners$: Subscription;
  constructor(
    private localNotificationService: LocalNotificationService,
    private eventService: EventService,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this._addEventListeners();
    this.loadCalendar();
  }
  ngOnDestroy() {
    this._removeEventListeners();
  }
  async loadCalendar() {
    console.log("loading calendar");
    const rows = await this.dbService.db.table("calendar").toArray();
    console.log("rows", rows);
  }

  /**
   * Set up and tear down event listeners (currently unused)
   */
  private _addEventListeners() {}

  private _removeEventListeners() {
    if (this.listeners$) {
      this.listeners$.unsubscribe();
    }
  }

  /**
   * Add scheduled notification and update database records
   */
  async scheduleNotification() {
    await this.localNotificationService.scheduleNotification();
    const event: IDBEvent = {
      topic: "DB",
      payload: {
        data: { name: "test_event" },
        operation: "CREATE",
        tableId: "calendar",
      },
    };
    this.eventService.publish(event).subscribe(() => this.loadCalendar());
  }
}
