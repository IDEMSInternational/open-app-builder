import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StressedAnimComponent } from './stressed-anim.component';

describe('StressedAnimComponent', () => {
  let component: StressedAnimComponent;
  let fixture: ComponentFixture<StressedAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressedAnimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StressedAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
