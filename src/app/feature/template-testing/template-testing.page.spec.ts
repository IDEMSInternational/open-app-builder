import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemplateTestingPage } from './template-testing.page';

describe('TemplateTestingPage', () => {
  let component: TemplateTestingPage;
  let fixture: ComponentFixture<TemplateTestingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTestingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
