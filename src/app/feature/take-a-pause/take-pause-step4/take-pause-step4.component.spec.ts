import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakePauseStep4Component } from './take-pause-step4.component';

describe('TakePauseStep4Component', () => {
  let component: TakePauseStep4Component;
  let fixture: ComponentFixture<TakePauseStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakePauseStep4Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakePauseStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
