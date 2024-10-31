import { TestBed } from "@angular/core/testing";

import { TemplateMetadataService } from "./template-metadata.service";

describe("TemplateMetadataService", () => {
  let service: TemplateMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateMetadataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
