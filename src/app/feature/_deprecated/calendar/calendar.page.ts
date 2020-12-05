import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Subscription } from "rxjs";
import { DbService, IDBEvent } from "src/app/shared/services/db/db.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";

@Component({
  selector: "plh-calendar",
  templateUrl: "./calendar.page.html",
  styleUrls: ["./calendar.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarPage implements OnInit, OnDestroy, AfterViewInit {
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    expandRows: true,
    height: "100%",
    contentHeight: "100%",
    viewHeight: "100%",
    headerToolbar: { start: "title", center: "", end: "prev,next" },
    events: [
      {
        id: "a",
        title: "Example Calendar Event",
        allDay: true,
        start: new Date(),
      },
    ],
  };
  listeners$: Subscription;
  @ViewChild("calendar", { static: true }) calendar: FullCalendarComponent;
  constructor(
    private localNotificationService: LocalNotificationService,
    private eventService: EventService,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this._addEventListeners();
    this.loadCalendar();
  }
  ngAfterViewInit() {
    // initial render seems buggy on angular (8), so workaround
    setTimeout(() => {
      const calendar = this.calendar.getApi();
      calendar.render();
    }, 50);
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
    await this.localNotificationService.scheduleNotification({
      id: 1,
      schedule: { at: new Date(Date.now() + 1000) },
      actionTypeId: "action_1",
      extra: {
        message: "Here is some additional information",
      },
    });
    await this.localNotificationService.scheduleNotification({
      id: 2,
      schedule: { count: 1 },
      actionTypeId: "action_2",
    });
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
