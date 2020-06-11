import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeAPausePage } from './take-a-pause.page';

describe('TakeAPausePage', () => {
  let component: TakeAPausePage;
  let fixture: ComponentFixture<TakeAPausePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeAPausePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeAPausePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
