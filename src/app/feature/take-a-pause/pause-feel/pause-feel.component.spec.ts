import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseFeelComponent } from './pause-feel.component';

describe('PauseFeelComponent', () => {
  let component: PauseFeelComponent;
  let fixture: ComponentFixture<PauseFeelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseFeelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseFeelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
