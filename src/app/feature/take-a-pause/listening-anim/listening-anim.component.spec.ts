import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeningAnimComponent } from './listening-anim.component';

describe('ListeningAnimComponent', () => {
  let component: ListeningAnimComponent;
  let fixture: ComponentFixture<ListeningAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningAnimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
