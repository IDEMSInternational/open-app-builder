import { TestBed } from "@angular/core/testing";
import { TemplateTranslateService } from "./template-translate.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";

/** Mock calls for field values from the template field service to return test data */
export class MockTemplateTranslateService implements Partial<TemplateTranslateService> {
  public translateValue(value: string) {
    return value;
  }

  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
}

describe("TemplateTranslateService", () => {
  let service: TemplateTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppDataService, useValue: new MockAppDataService() },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
      ],
    });
    service = TestBed.inject(TemplateTranslateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
