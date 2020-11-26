import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolboxPage } from './toolbox.page';

describe('ToolboxPage', () => {
  let component: ToolboxPage;
  let fixture: ComponentFixture<ToolboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
