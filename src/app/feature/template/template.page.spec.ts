import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TemplatePage } from "./template.page";
import { ActivatedRoute } from "@angular/router";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { Component, input } from "@angular/core";

// HACK - mock child `<plh-template-container>` component to bypass imports
@Component({ selector: "plh-template-container", template: "<div></div>" })
class MockTemplateContainerComponent {
  templatename = input<string>();
}

describe("TemplatePage", () => {
  let component: TemplatePage;
  let fixture: ComponentFixture<TemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatePage, MockTemplateContainerComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { templateName: "mock_template_name" } } },
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(),
        },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
