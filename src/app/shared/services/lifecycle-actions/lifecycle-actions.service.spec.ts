import { TestBed } from "@angular/core/testing";

import { LifecycleActionsService } from "./lifecycle-actions.service";
import { AppDataService } from "../data/app-data.service";
import { MockAppDataService } from "../data/app-data.service.mock.spec";
import { TemplateVariablesService } from "../../components/template/services/template-variables.service";

describe("LifecycleActionsService", () => {
  let service: LifecycleActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppDataService, useValue: new MockAppDataService() },
        { provide: TemplateVariablesService, useValue: {} },
      ],
    });
    service = TestBed.inject(LifecycleActionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
