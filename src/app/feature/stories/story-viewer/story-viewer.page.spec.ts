import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoryViewerPage } from './story-viewer.page';

describe('StoryViewerPage', () => {
  let component: StoryViewerPage;
  let fixture: ComponentFixture<StoryViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoryViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
