import { TestBed } from "@angular/core/testing";
import { TemplateTranslateService } from "./template-translate.service";

/** Mock calls for field values from the template field service to return test data */
export class MockTemplateTranslateService implements Partial<TemplateTranslateService> {
  public translateValue(value: string) {
    return value;
  }
}

describe("TaskService", () => {
  let service: TemplateTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTranslateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
