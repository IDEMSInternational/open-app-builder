import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoalsPage } from './goals.page';

describe('GoalsPage', () => {
  let component: GoalsPage;
  let fixture: ComponentFixture<GoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
