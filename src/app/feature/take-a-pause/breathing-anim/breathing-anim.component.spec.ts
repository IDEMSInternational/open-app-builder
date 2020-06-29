import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BreathingAnimComponent } from './breathing-anim.component';

describe('BreathingAnimComponent', () => {
  let component: BreathingAnimComponent;
  let fixture: ComponentFixture<BreathingAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreathingAnimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BreathingAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
