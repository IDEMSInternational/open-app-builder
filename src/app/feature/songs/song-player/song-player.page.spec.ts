import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongPlayerPage } from './song-player.page';

describe('SongPlayerPage', () => {
  let component: SongPlayerPage;
  let fixture: ComponentFixture<SongPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
