import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroTutorialPage } from './intro-tutorial.page';

describe('IntroTutorialPage', () => {
  let component: IntroTutorialPage;
  let fixture: ComponentFixture<IntroTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTutorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
