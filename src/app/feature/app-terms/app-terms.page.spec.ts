import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppTermsPage } from './app-terms.page';

describe('AppTermsPage', () => {
  let component: AppTermsPage;
  let fixture: ComponentFixture<AppTermsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTermsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
