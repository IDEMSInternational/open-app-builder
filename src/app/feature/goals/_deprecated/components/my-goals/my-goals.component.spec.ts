import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGoalsComponent } from './my-goals.component';

describe('MyGoalsComponent', () => {
  let component: MyGoalsComponent;
  let fixture: ComponentFixture<MyGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
