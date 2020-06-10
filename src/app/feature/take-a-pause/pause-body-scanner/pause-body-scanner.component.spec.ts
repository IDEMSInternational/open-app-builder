import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseBodyScannerComponent } from './pause-body-scanner.component';

describe('PauseBodyScannerComponent', () => {
  let component: PauseBodyScannerComponent;
  let fixture: ComponentFixture<PauseBodyScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseBodyScannerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseBodyScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
