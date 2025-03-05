import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FeedbackToolbarComponent } from "./feedback-toolbar.component";
import { IonicModule, PopoverController } from "@ionic/angular";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.mock.spec";
import { FeedbackService } from "../../feedback.service";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { FormsModule } from "@angular/forms";

// HACK - mock feedback service methods called
class MockFeedbackService implements Partial<FeedbackService> {
  public options = {} as any;
  setContentPageWidth() {}
  async setEnabled() {}
  setNavigationEnabled() {}
}

describe("FeedbackToolbarComponent", () => {
  let component: FeedbackToolbarComponent;
  let fixture: ComponentFixture<FeedbackToolbarComponent>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackToolbarComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: PopoverController, useValue: {} },
        { provide: TemplateService, useValue: {} },
        { provide: UserMetaService, useValue: {} },
        { provide: DBSyncService, useValue: {} },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: DeploymentService, useValue: new MockDeploymentService() },
        { provide: FeedbackService, useValue: new MockFeedbackService() },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
