import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeIndoorBlobsComponent } from './home-indoor-blobs.component';

describe('HomeIndoorBlobsComponent', () => {
  let component: HomeIndoorBlobsComponent;
  let fixture: ComponentFixture<HomeIndoorBlobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIndoorBlobsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeIndoorBlobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
