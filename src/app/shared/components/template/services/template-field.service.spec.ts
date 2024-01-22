import { TestBed } from "@angular/core/testing";
import { TemplateFieldService } from "./template-field.service";
import { PromiseExtended } from "dexie";

/** Mock calls for field values from the template field service to return test data */
export class MockTemplateFieldService implements Partial<TemplateFieldService> {
  mockFields: any;

  // allow additional specs implementing service to provide their own fields
  constructor(mockFields: any = {}) {
    this.mockFields = mockFields;
  }
  public getField(key: string) {
    return this.mockFields[key];
  }
  public setField(key: string, value: string) {
    this.mockFields[key] = value;
    return new Promise(() => {}) as PromiseExtended;
  }
}

describe("TaskService", () => {
  let service: TemplateFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateFieldService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
