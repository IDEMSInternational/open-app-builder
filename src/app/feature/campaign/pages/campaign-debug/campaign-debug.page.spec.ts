import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CampaignDebugPage } from "./campaign-debug.page";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IonicModule, ModalController } from "@ionic/angular";
import { ObjectValuesPipe } from "src/app/shared/pipes/objectValues.pipe";
import { ArraySortPipe } from "src/app/shared/pipes/arraySort.pipe";
import { ObjectKeysPipe } from "src/app/shared/pipes/objectKeys.pipe";

describe("CampaignDebugPage", () => {
  let component: CampaignDebugPage;
  let fixture: ComponentFixture<CampaignDebugPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignDebugPage, ObjectValuesPipe, ArraySortPipe, ObjectKeysPipe],
      imports: [IonicModule, RouterModule],
      providers: [
        // TODO - use mocked constructor services instead when implementing tests
        {
          provide: DeploymentService,
          useValue: new MockDeploymentService({}),
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService({}),
        },
        // TODO - update values when implementing tests
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: new Map([]) } },
        },
        { provide: ModalController, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
