import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParentPointsPage } from './parent-points.page';

describe('ParentPointsPage', () => {
  let component: ParentPointsPage;
  let fixture: ComponentFixture<ParentPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentPointsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParentPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
