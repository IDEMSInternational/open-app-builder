import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarePackagesPage } from './care-packages.page';

describe('CarePackagesPage', () => {
  let component: CarePackagesPage;
  let fixture: ComponentFixture<CarePackagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePackagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarePackagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
