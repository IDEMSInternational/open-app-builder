import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlobComponent } from './blob.component';

describe('BlobComponent', () => {
  let component: BlobComponent;
  let fixture: ComponentFixture<BlobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
