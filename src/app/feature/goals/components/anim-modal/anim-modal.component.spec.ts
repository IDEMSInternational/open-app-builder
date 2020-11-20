import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimModalComponent } from './anim-modal.component';

describe('AnimModalComponent', () => {
  let component: AnimModalComponent;
  let fixture: ComponentFixture<AnimModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimModalComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lottie options for trophy animation', () => {
    component.id = "trophy";
    component.ionViewWillEnter();
    expect(component.lottieOptions).toBeDefined();
    expect(component.lottieOptions.path).toContain("trophy");
  });

  it('should load lottie options for trophy animation', () => {
    component.id = "fireworks";
    component.ionViewWillEnter();
    expect(component.lottieOptions).toBeDefined();
    expect(component.lottieOptions.path).toContain("firework");
  });
});
