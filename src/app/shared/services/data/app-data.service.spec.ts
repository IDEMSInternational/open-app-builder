import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AppDataVariableService } from "./app-data-variable.service";
import { AppDataService } from "./app-data.service";
import { FlowTypes } from "../../model";
import { MockAppDataVariableService } from "./app-data-variable.service.spec";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { MockErrorHandlerService } from "../error-handler/error-handler.service.spec";
import { DbService } from "../db/db.service";
import { MockDbService } from "../db/db.service.spec";
import { Injectable } from "@angular/core";

const DATA_MOCK = {
  test_flow: [
    { id: "id1", number: 1, string: "hello", boolean: true },
    { id: "id2", number: 2, string: "goodbye", boolean: false },
  ],
};

/** Mock calls for sheets from the appData service to return test data */
export class MockAppDataService implements Partial<AppDataService> {
  public async getSheet<T extends FlowTypes.FlowTypeWithData>(
    flow_type: FlowTypes.FlowType,
    flow_name: string
  ): Promise<T> {
    const rows = DATA_MOCK[flow_name] || [];
    return { flow_name, flow_type, rows } as any;
  }
}

/** Use an extended service for testing to allow override of protected variables */
@Injectable({ providedIn: "root" })
class AppDataServiceExtended extends AppDataService {
  protected sheetContents = {
    data_list: {},
    data_pipe: {},
    generator: {},
    global: {},
    template: {},
    tour: {},
  };
  protected translationContents = {};
}

describe("AppDataService", () => {
  let service: AppDataServiceExtended;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AppDataVariableService, useValue: new MockAppDataVariableService() },
        { provide: ErrorHandlerService, useValue: new MockErrorHandlerService() },
        { provide: DbService, useValue: new MockDbService() },
        AppDataServiceExtended,
      ],
    });

    service = TestBed.inject(AppDataServiceExtended);
    TestBed.inject(AppDataServiceExtended);
    service.ready();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  // TODO - add public method tests
});
