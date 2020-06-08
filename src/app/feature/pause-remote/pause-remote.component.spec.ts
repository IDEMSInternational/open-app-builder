import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PauseRemoteComponent } from './pause-remote.component';

describe('PauseRemoteComponent', () => {
  let component: PauseRemoteComponent;
  let fixture: ComponentFixture<PauseRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseRemoteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PauseRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
