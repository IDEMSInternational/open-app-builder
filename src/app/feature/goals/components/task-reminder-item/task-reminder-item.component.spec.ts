import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReminderItemComponent } from './task-reminder-item.component';

describe('TaskReminderItemComponent', () => {
  let component: TaskReminderItemComponent;
  let fixture: ComponentFixture<TaskReminderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskReminderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReminderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
