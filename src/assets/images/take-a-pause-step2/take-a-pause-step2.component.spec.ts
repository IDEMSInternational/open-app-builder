import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeAPauseStep2Component } from './take-a-pause-step2.component';

describe('TakeAPauseStep2Component', () => {
  let component: TakeAPauseStep2Component;
  let fixture: ComponentFixture<TakeAPauseStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeAPauseStep2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeAPauseStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
