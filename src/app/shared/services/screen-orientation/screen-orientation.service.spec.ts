import { TestBed } from "@angular/core/testing";

import { ScreenOrientationService } from "./screen-orientation.service";
import { TemplateMetadataService } from "../../components/template/services/template-metadata.service";

describe("ScreenOrientationService", () => {
  let service: ScreenOrientationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TemplateMetadataService, useValue: {} }],
    });
    service = TestBed.inject(ScreenOrientationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
