import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TemplatePage } from "./template.page";
import { ActivatedRoute } from "@angular/router";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { Component, input } from "@angular/core";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS } from "packages/data-models";

// HACK - mock child `<plh-template-container>` component to bypass imports
@Component({
  selector: "plh-template-container",
  template: "<div></div>",
  standalone: false,
})
class MockTemplateContainerComponent {
  templatename = input<string>();
}

describe("TemplatePage", () => {
  let component: TemplatePage;
  let fixture: ComponentFixture<TemplatePage>;

  beforeEach(waitForAsync(() => {
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
        {
          provide: DeploymentService,
          useValue: new DeploymentService(DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS),
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
