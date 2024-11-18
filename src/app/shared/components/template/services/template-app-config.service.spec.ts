import { TestBed } from "@angular/core/testing";

import { TemplateAppConfigService } from "./template-app-config.service";

describe("TemplateAppConfigService", () => {
  let service: TemplateAppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateAppConfigService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
