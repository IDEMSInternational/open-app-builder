import { TestBed } from "@angular/core/testing";

import { ErrorHandlerService } from "./error-handler.service";

/** Mock calls for sheets from the appData service to return test data */
export class MockErrorHandlerService implements Partial<ErrorHandlerService> {
  public logError(error: Error): Promise<void> {
    throw error;
  }
  public handleError(error: Error): Promise<void> {
    throw error;
  }
}

describe("ErrorHandlerService", () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
