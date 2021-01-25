import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabitIdeasPage } from './habit-ideas.page';

describe('HabitIdeasPage', () => {
  let component: HabitIdeasPage;
  let fixture: ComponentFixture<HabitIdeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitIdeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitIdeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
