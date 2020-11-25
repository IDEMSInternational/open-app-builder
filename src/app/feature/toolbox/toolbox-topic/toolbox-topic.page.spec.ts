import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolboxTopicPage } from './toolbox-topic.page';

describe('ToolboxTopicPage', () => {
  let component: ToolboxTopicPage;
  let fixture: ComponentFixture<ToolboxTopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolboxTopicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolboxTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
