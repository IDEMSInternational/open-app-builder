import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeAPauseStep1Component } from './take-a-pause-step1.component';

describe('TakeAPauseStep1Component', () => {
  let component: TakeAPauseStep1Component;
  let fixture: ComponentFixture<TakeAPauseStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeAPauseStep1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeAPauseStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
