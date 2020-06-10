import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseThinkComponent } from './pause-think.component';

describe('PauseThinkComponent', () => {
  let component: PauseThinkComponent;
  let fixture: ComponentFixture<PauseThinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseThinkComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseThinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
