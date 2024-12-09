import { TemplateFieldService } from "./template-field.service";
import type { PromiseExtended } from "dexie";
import { booleanStringToBoolean } from "src/app/shared/utils";

/** Mock calls for field values from the template field service to return test data */
export class MockTemplateFieldService implements Partial<TemplateFieldService> {
  mockFields: any;

  // allow additional specs implementing service to provide their own fields
  constructor(mockFields: any = {}) {
    this.mockFields = mockFields;
  }
  public getField(key: string) {
    return booleanStringToBoolean(this.mockFields[key]);
  }
  public setField(key: string, value: string) {
    this.mockFields[key] = value;
    return Promise.resolve("_") as PromiseExtended;
  }
  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
}

// TODO - split from mock and add tests

// describe("TemplateFieldService", () => {
// let service: TemplateFieldService;
// beforeEach(async () => {
//   TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [{ provide: ErrorHandlerService, useValue: new MockErrorHandlerService() }],
//   });
//   service = TestBed.inject(TemplateFieldService);
//   await service.ready();
// });
// it("should be created", () => {
//   expect(service).toBeTruthy();
// });
// });
