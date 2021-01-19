import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarePackageComponent } from './care-package.component';

describe('CarePackageComponent', () => {
  let component: CarePackageComponent;
  let fixture: ComponentFixture<CarePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePackageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
