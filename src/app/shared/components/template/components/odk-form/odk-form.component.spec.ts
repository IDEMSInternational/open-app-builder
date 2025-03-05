import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplOdkFormComponent } from "./odk-form.component";
import { TemplateAssetService } from "../../services/template-asset.service";
import { TemplateTranslateService } from "../../services/template-translate.service";

describe("OdkFormComponent", () => {
  let component: TmplOdkFormComponent;
  let fixture: ComponentFixture<TmplOdkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplOdkFormComponent],
      providers:[{provide:TemplateAssetService, useValue:{}},{provide:TemplateTranslateService, useValue:{}}]
    }).compileComponents();

    fixture = TestBed.createComponent(TmplOdkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
