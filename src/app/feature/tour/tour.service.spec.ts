import { TestBed } from "@angular/core/testing";

import { TourService } from "./tour.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { MockTemplateFieldService } from "src/app/shared/components/template/services/template-field.service.spec";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { MockTemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";

describe("TourService", () => {
  let service: TourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateFieldService, useValue: new MockTemplateFieldService() },
        { provide: TemplateTranslateService, useValue: new MockTemplateTranslateService() },
        { provide: AppDataService, useValue: new MockAppDataService() },
      ],
    });
    service = TestBed.inject(TourService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
