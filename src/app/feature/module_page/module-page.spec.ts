import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModulePage } from './module-page';

describe('ModulePage', () => {
  let component: ModulePage;
  let fixture: ComponentFixture<ModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
