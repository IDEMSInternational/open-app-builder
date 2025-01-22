import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplAudioComponent } from "./audio.component";
import { TemplateAssetService } from "../../services/template-asset.service";

describe("TmplAudioComponent", () => {
  let component: TmplAudioComponent;
  let fixture: ComponentFixture<TmplAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplAudioComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: TemplateAssetService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
