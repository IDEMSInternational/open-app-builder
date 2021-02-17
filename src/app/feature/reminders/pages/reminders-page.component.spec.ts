import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersPageComponent } from './reminders-page.component';

describe('RemindersPageComponent', () => {
  let component: RemindersPageComponent;
  let fixture: ComponentFixture<RemindersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
