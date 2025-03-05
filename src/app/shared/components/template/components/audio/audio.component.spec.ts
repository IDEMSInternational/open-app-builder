import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplAudioComponent } from "./audio.component";
import { TemplateAssetService } from "../../services/template-asset.service";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "audio" };

describe("TmplAudioComponent", () => {
  let component: TmplAudioComponent;
  let fixture: ComponentFixture<TmplAudioComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplAudioComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: TemplateAssetService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplAudioComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
