import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmplNumberComponent } from './number-selector.component';

describe('NumberSelectorComponent', () => {
  let component: TmplNumberComponent;
  let fixture: ComponentFixture<TmplNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmplNumberComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmplNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
