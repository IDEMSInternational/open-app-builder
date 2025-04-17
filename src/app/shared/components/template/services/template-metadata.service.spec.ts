import { TestBed } from "@angular/core/testing";

import { TemplateMetadataService } from "./template-metadata.service";
import { TemplateService } from "./template.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";

describe("TemplateMetadataService", () => {
  let service: TemplateMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateService, useValue: {} },
        { provide: AppConfigService, useValue: new MockAppConfigService() },
      ],
    });
    service = TestBed.inject(TemplateMetadataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
