import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CalendarPageRoutingModule } from "./calendar-routing.module";

import { CalendarPage } from "./calendar.page";

import { FullCalendarModule } from "@fullcalendar/angular"; // the main connector. must go first
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'

// https://fullcalendar.io/docs
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
  // register FullCalendar plugins
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    FullCalendarModule,
  ],
  declarations: [CalendarPage],
})
export class CalendarPageModule {}
