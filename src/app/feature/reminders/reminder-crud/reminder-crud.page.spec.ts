import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReminderCrudPage } from './reminder-crud.page';

describe('ReminderCrudPage', () => {
  let component: ReminderCrudPage;
  let fixture: ComponentFixture<ReminderCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderCrudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
