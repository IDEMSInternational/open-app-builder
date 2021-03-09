import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SliderNewComponent } from './slider-new.component';

describe('SliderNewComponent', () => {
  let component: SliderNewComponent;
  let fixture: ComponentFixture<SliderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderNewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
