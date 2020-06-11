import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseStep2Component } from './pause-step2.component';

describe('PauseStep2Component', () => {
  let component: PauseStep2Component;
  let fixture: ComponentFixture<PauseStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseStep2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
