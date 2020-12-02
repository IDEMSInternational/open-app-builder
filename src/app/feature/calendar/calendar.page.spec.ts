import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular';
import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';

describe('CalendarPage', () => {
  let component: CalendarPage;
  let fixture: ComponentFixture<CalendarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPage ],
      imports: [IonicModule.forRoot(), FullCalendarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
