import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseStep4Component } from './pause-step4.component';

describe('PauseStep4Component', () => {
  let component: PauseStep4Component;
  let fixture: ComponentFixture<PauseStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseStep4Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
