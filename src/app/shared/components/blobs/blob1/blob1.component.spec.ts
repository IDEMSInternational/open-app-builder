import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Blob1Component } from './blob1.component';

describe('Blob1Component', () => {
  let component: Blob1Component;
  let fixture: ComponentFixture<Blob1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Blob1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Blob1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
