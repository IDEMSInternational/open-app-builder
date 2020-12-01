import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StressedMultiHandAnimComponent } from './stressed-multi-hand-anim.component';

describe('StressedMultiHandAnimComponent', () => {
  let component: StressedMultiHandAnimComponent;
  let fixture: ComponentFixture<StressedMultiHandAnimComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StressedMultiHandAnimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StressedMultiHandAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
